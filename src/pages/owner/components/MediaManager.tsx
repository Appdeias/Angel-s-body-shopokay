import { useState, useEffect, useRef, useCallback } from 'react';
import { useSiteData } from '@/hooks/useSiteData';
import { supabase } from '@/lib/supabase';

const EDGE_FUNCTION_UPLOAD_URL = 'https://xyonfkdrlvydtkrvxofc.supabase.co/functions/v1/upload-media';

interface SlotDef {
  slot: string;
  label: string;
  type: 'image' | 'video';
}

interface SectionDef {
  id: string;
  name: string;
  icon: string;
  slots: SlotDef[];
}

const SECTIONS: SectionDef[] = [
  {
    id: 'brand',
    name: 'Brand',
    icon: 'ri-shopping-bag-3-line',
    slots: [
      { slot: 'logo', label: 'Company Logo', type: 'image' },
    ],
  },
  {
    id: 'hero',
    name: 'Hero Section',
    icon: 'ri-home-4-line',
    slots: [
      { slot: 'video', label: 'Background Video', type: 'video' },
      { slot: 'image_1', label: 'Hero Image #1', type: 'image' },
      { slot: 'image_2', label: 'Hero Image #2', type: 'image' },
      { slot: 'image_3', label: 'Hero Image #3', type: 'image' },
    ],
  },
  {
    id: 'home',
    name: 'Home Page',
    icon: 'ri-pages-line',
    slots: [
      { slot: 'performance_video', label: 'Performance Section Video', type: 'video' },
      { slot: 'consultation_banner', label: 'Free Consultation Banner', type: 'image' },
      { slot: 'cta_banner', label: 'CTA Section Banner', type: 'image' },
    ],
  },
  {
    id: 'about',
    name: 'About Section',
    icon: 'ri-information-line',
    slots: [
      { slot: 'main_image', label: 'About Us Main Image', type: 'image' },
    ],
  },
  {
    id: 'about_page',
    name: 'About Page',
    icon: 'ri-file-info-line',
    slots: [
      { slot: 'hero_video', label: 'About Page Hero Video', type: 'video' },
      { slot: 'story_video', label: 'Our Story Video', type: 'video' },
      { slot: 'estimate_banner', label: 'Estimate Banner', type: 'image' },
      { slot: 'faq_image', label: 'FAQ Sidebar Image', type: 'image' },
      { slot: 'values_image', label: 'Values Sidebar Image', type: 'image' },
    ],
  },
  {
    id: 'services',
    name: 'Services Section',
    icon: 'ri-car-line',
    slots: [
      { slot: 'banner_image', label: 'Services Banner Image', type: 'image' },
      { slot: 'card_1', label: 'Service Card #1', type: 'image' },
      { slot: 'card_2', label: 'Service Card #2', type: 'image' },
      { slot: 'card_3', label: 'Service Card #3', type: 'image' },
    ],
  },
  {
    id: 'services_page',
    name: 'Services Page',
    icon: 'ri-service-line',
    slots: [
      { slot: 'hero_video', label: 'Services Page Hero Video', type: 'video' },
      { slot: 'mid_banner', label: 'Mid-Page CTA Banner', type: 'image' },
      { slot: 'bottom_banner', label: 'Bottom CTA Banner', type: 'image' },
    ],
  },
  {
    id: 'contact',
    name: 'Contact Page',
    icon: 'ri-contacts-line',
    slots: [
      { slot: 'hero_video', label: 'Contact Page Hero Video', type: 'video' },
    ],
  },
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const EDGE_FUNCTION_DOWNLOAD_URL = 'https://xyonfkdrlvydtkrvxofc.supabase.co/functions/v1/download-media';

const handleDownload = async (url: string, filename: string) => {
  try {
    const res = await fetch(EDGE_FUNCTION_DOWNLOAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, filename }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  } catch {
    // Fallback: open in new tab if everything fails
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

export default function MediaManager() {
  const { media, refresh, loading } = useSiteData();
  const [activeSection, setActiveSection] = useState('hero');
  const [values, setValues] = useState<Record<string, string>>();
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successKey, setSuccessKey] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<{
    file: File;
    key: string;
    section: string;
    slot: string;
    label: string;
    type: 'image' | 'video';
  } | null>(null);
  const [lightbox, setLightbox] = useState<{ url: string; type: 'image' | 'video'; label: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ section: string; slot: string; label: string } | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>();

  useEffect(() => {
    try {
      const obj: Record<string, string> = {};
      SECTIONS.forEach((sec) => {
        sec.slots.forEach((s) => {
          const found = media.find((m) => m.section === sec.id && m.slot === s.slot);
          obj[`${sec.id}:${s.slot}`] = found?.url || '';
        });
      });
      setValues(obj);
    } catch {
      setValues({});
    }
  }, [media]);

  // Lightbox ESC key handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
        setDeleteConfirm(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const currentSection = SECTIONS.find((s) => s.id === activeSection)!;

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, sectionId: string, slotDef: SlotDef) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const key = `${sectionId}:${slotDef.slot}`;
      setPendingFile({
        file,
        key,
        section: sectionId,
        slot: slotDef.slot,
        label: slotDef.label,
        type: slotDef.type,
      });
      setSuccessKey(null);
    },
    []
  );

  const confirmUpload = async () => {
    if (!pendingFile) return;
    const { file, key, section, slot, label } = pendingFile;
    setUploadingKey(key);
    setError('');
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch(EDGE_FUNCTION_UPLOAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64,
          fileName: file.name,
          contentType: file.type,
          section,
          slot,
          label,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Upload failed');
      }
      setValues((prev) => ({ ...prev, [key]: data.url }));
      setSuccessKey(key);
      refresh();
      setPendingFile(null);
      setTimeout(() => setSuccessKey(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setError(msg);
    } finally {
      setUploadingKey(null);
    }
  };

  const cancelUpload = () => {
    setPendingFile(null);
    setSuccessKey(null);
  };

  const openFilePicker = (key: string) => {
    setPendingFile(null);
    setSuccessKey(null);
    const input = inputRefs.current?.[key];
    if (input) {
      input.value = '';
      input.click();
    }
  };

  const handleDelete = async (section: string, slot: string, key: string) => {
    setDeletingKey(key);
    setError('');
    try {
      // First delete from DB via Supabase client
      const { error: dbError } = await supabase
        .from('site_media')
        .delete()
        .eq('section', section)
        .eq('slot', slot);

      if (dbError) {
        throw new Error(dbError.message);
      }

      setValues((prev) => ({ ...prev, [key]: '' }));
      refresh();
      setDeleteConfirm(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed. Please try again.';
      setError(msg);
    } finally {
      setDeletingKey(null);
    }
  };

  if (!currentSection) {
    return (
      <div className="text-gray-400 text-sm">
        <i className="ri-error-warning-line mr-1"></i>
        Section not found.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
          <i className="ri-image-line text-[#2db84b] text-lg"></i>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">Media Manager</h2>
          <p className="text-gray-500 text-xs">Hover and click Change to upload a new file</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => {
              setActiveSection(sec.id);
              setPendingFile(null);
              setError('');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === sec.id
                ? 'bg-[#2db84b]/15 text-[#2db84b] border border-[#2db84b]/30'
                : 'bg-[#111111] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <i className={sec.icon}></i>
            {sec.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <i className="ri-loader-4-line animate-spin"></i>
          Loading media...
        </div>
      )}

      <div className="space-y-6">
        {currentSection.slots.map((slot) => {
          const key = `${currentSection.id}:${slot.slot}`;
          const url = values?.[key] || '';
          const isUploading = uploadingKey === key;
          const pending = pendingFile?.key === key;
          const success = successKey === key;
          const isDeleting = deletingKey === key;

          return (
            <div key={slot.slot} className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">{slot.label}</h3>
                <span className="text-gray-500 text-xs uppercase tracking-wider">{slot.type}</span>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-[#0d0d0d] border border-white/5 min-h-[200px] flex items-center justify-center mb-4">
                {url && !pending ? (
                  slot.type === 'video' ? (
                    <video
                      src={url}
                      className="w-full max-h-[300px] object-contain"
                      muted
                      loop
                      playsInline
                      onError={(e) => {
                        (e.currentTarget as HTMLVideoElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <img
                      src={url}
                      alt={slot.label}
                      className="w-full max-h-[300px] object-contain object-center"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )
                ) : pending ? (
                  <div className="text-center py-8">
                    <i className="ri-file-upload-line text-[#2db84b] text-3xl mb-2"></i>
                    <p className="text-white text-sm font-medium">{pendingFile?.file.name}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {((pendingFile?.file.size ?? 0) / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <i
                      className={`${
                        slot.type === 'video' ? 'ri-video-line' : 'ri-image-line'
                      } text-gray-600 text-4xl mb-2`}
                    ></i>
                    <p className="text-gray-500 text-sm">No {slot.type} uploaded</p>
                  </div>
                )}

                {!pending && !isUploading && !success && !isDeleting && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 gap-3 p-4">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => openFilePicker(key)}
                        className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <i
                          className={
                            slot.type === 'video' ? 'ri-film-line' : 'ri-camera-line'
                          }
                        ></i>
                        {slot.type === 'video' ? 'Change Video' : 'Change Photo'}
                      </button>
                      {url && (
                        <button
                          onClick={() => handleDownload(url, `${slot.label.replace(/\s+/g, '_')}.${slot.type === 'video' ? 'mp4' : 'jpg'}`)}
                          className="bg-white/15 hover:bg-white/25 backdrop-blur text-white font-bold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors border border-white/20"
                        >
                          <i className="ri-download-line"></i>
                          Download
                        </button>
                      )}
                    </div>
                    {url && (
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={() => setLightbox({ url, type: slot.type, label: slot.label })}
                          className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors border border-white/20"
                        >
                          <i className="ri-eye-line"></i>
                          View Full Size
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ section: currentSection.id, slot: slot.slot, label: slot.label })}
                          className="bg-[#c0392b]/20 hover:bg-[#c0392b]/30 backdrop-blur text-red-400 hover:text-red-300 font-bold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors border border-[#c0392b]/30"
                        >
                          <i className="ri-delete-bin-line"></i>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="flex flex-col items-center gap-2">
                      <i className="ri-loader-4-line animate-spin text-[#2db84b] text-2xl"></i>
                      <span className="text-white text-sm font-medium">Uploading...</span>
                    </div>
                  </div>
                )}

                {isDeleting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="flex flex-col items-center gap-2">
                      <i className="ri-loader-4-line animate-spin text-[#c0392b] text-2xl"></i>
                      <span className="text-white text-sm font-medium">Deleting...</span>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center gap-2">
                      <i className="ri-checkbox-circle-line text-[#2db84b] text-3xl"></i>
                      <span className="text-white text-sm font-medium">Uploaded!</span>
                    </div>
                  </div>
                )}
              </div>

              {pending && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={confirmUpload}
                    disabled={isUploading}
                    className="bg-[#2db84b] hover:bg-[#25a040] disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <i className="ri-check-line"></i>
                    Confirm Upload
                  </button>
                  <button
                    onClick={cancelUpload}
                    disabled={isUploading}
                    className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-5 py-2.5 rounded-full text-sm cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <input
                type="file"
                accept={slot.type === 'video' ? 'video/*' : 'image/*'}
                className="hidden"
                ref={(el) => {
                  if (inputRefs.current) inputRefs.current[key] = el;
                }}
                onChange={(e) => handleFileSelect(e, currentSection.id, slot)}
              />
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mt-6 bg-[#c0392b]/10 border border-[#c0392b]/30 rounded-lg px-4 py-3 flex items-center gap-3">
          <i className="ri-error-warning-line text-[#c0392b]"></i>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-6 bg-[#111111] border border-white/10 rounded-xl p-4">
        <p className="text-gray-400 text-xs leading-relaxed">
          <i className="ri-lightbulb-line text-[#e8b84b] mr-1"></i>
          <strong className="text-white">Tip:</strong> Hover over any image or video and click
          &quot;Change&quot; to upload a new file. You will see a preview before confirming.
        </p>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === 'video' ? (
              <video
                src={lightbox.url}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
                controls
                autoPlay
              />
            ) : (
              <img
                src={lightbox.url}
                alt={lightbox.label}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            )}
            <p className="text-white text-sm font-medium">{lightbox.label}</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-[#c0392b]/15 rounded-full">
                <i className="ri-delete-bin-line text-[#c0392b] text-2xl"></i>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Delete {deleteConfirm.label}?</h3>
                <p className="text-gray-400 text-sm mt-2">
                  This will permanently remove the file from the site. You can always upload a new one later.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full mt-2">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-[#111111] hover:bg-[#222222] text-gray-300 hover:text-white font-semibold px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-colors border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.section, deleteConfirm.slot, `${deleteConfirm.section}:${deleteConfirm.slot}`)}
                  disabled={deletingKey === `${deleteConfirm.section}:${deleteConfirm.slot}`}
                  className="flex-1 bg-[#c0392b]/20 hover:bg-[#c0392b]/35 text-red-400 hover:text-red-300 font-bold px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-colors border border-[#c0392b]/30"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}