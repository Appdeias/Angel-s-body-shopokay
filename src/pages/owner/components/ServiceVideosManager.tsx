import { useState, useCallback, useRef } from 'react';
import { useSiteData, type Service } from '@/hooks/useSiteData';
import { supabase } from '@/lib/supabase';

const EDGE_FUNCTION_UPLOAD_URL = 'https://xyonfkdrlvydtkrvxofc.supabase.co/functions/v1/upload-media';

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
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

interface PendingFile {
  file: File;
  serviceId: string;
}

export default function ServiceVideosManager() {
  const { services, refresh, loading } = useSiteData();
  const activeServices = services.filter((s) => s.is_active !== false);

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingFile | null>(null);
  const [lightbox, setLightbox] = useState<{ url: string; label: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Service | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, serviceId: string) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setPending({ file, serviceId });
      setSuccessId(null);
      setError('');
    },
    []
  );

  const confirmUpload = async () => {
    if (!pending) return;
    const { file, serviceId } = pending;
    setUploadingId(serviceId);
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
          section: 'service_video',
          slot: serviceId,
          label: `Service Video - ${serviceId}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Upload failed');
      }

      // Update services table with new video_url
      const { error: updateError } = await supabase
        .from('services')
        .update({ video_url: data.url })
        .eq('id', serviceId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccessId(serviceId);
      refresh();
      setPending(null);
      setTimeout(() => setSuccessId(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setError(msg);
    } finally {
      setUploadingId(null);
    }
  };

  const cancelUpload = () => {
    setPending(null);
    setSuccessId(null);
  };

  const openFilePicker = (serviceId: string) => {
    setPending(null);
    setSuccessId(null);
    const input = inputRefs.current[serviceId];
    if (input) {
      input.value = '';
      input.click();
    }
  };

  const handleDelete = async (serviceId: string) => {
    setDeletingId(serviceId);
    setError('');
    try {
      const { error: updateError } = await supabase
        .from('services')
        .update({ video_url: '' })
        .eq('id', serviceId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      refresh();
      setDeleteConfirm(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed. Please try again.';
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-white font-bold text-lg">Service Videos</h3>
        <p className="text-gray-500 text-xs mt-1">
          Manage the video displayed on each service card on the Services page.
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <i className="ri-loader-4-line animate-spin"></i>
          Loading service videos...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {activeServices.map((service) => {
          const url = service.video_url || '';
          const isUploading = uploadingId === service.id;
          const isPending = pending?.serviceId === service.id;
          const isSuccess = successId === service.id;
          const isDeleting = deletingId === service.id;

          return (
            <div
              key={service.id}
              className="bg-[#111111] border border-white/10 rounded-xl p-5 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <i className={`${service.icon} text-[#2db84b]`}></i>
                <h3 className="text-white font-semibold text-sm">{service.title}</h3>
                <span className="text-gray-500 text-xs uppercase tracking-wider ml-auto">VIDEO</span>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-[#0d0d0d] border border-white/5 min-h-[180px] flex items-center justify-center mb-4">
                {url && !isPending ? (
                  <video
                    src={url}
                    className="w-full max-h-[220px] object-contain"
                    muted
                    loop
                    playsInline
                    onError={(e) => {
                      (e.currentTarget as HTMLVideoElement).style.display = 'none';
                    }}
                  />
                ) : isPending ? (
                  <div className="text-center py-8">
                    <i className="ri-file-upload-line text-[#2db84b] text-3xl mb-2"></i>
                    <p className="text-white text-sm font-medium">{pending.file.name}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {((pending.file.size ?? 0) / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <i className="ri-video-line text-gray-600 text-4xl mb-2"></i>
                    <p className="text-gray-500 text-sm">No video uploaded</p>
                  </div>
                )}

                {!isPending && !isUploading && !isSuccess && !isDeleting && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 gap-3 p-4">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => openFilePicker(service.id)}
                        className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <i className="ri-film-line"></i>
                        Change Video
                      </button>
                      {url && (
                        <button
                          onClick={() => handleDownload(url, `${service.title.replace(/\s+/g, '_')}_video.mp4`)}
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
                          onClick={() => setLightbox({ url, label: service.title })}
                          className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-pointer transition-colors border border-white/20"
                        >
                          <i className="ri-eye-line"></i>
                          View Full Size
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(service)}
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

                {isSuccess && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center gap-2">
                      <i className="ri-checkbox-circle-line text-[#2db84b] text-3xl"></i>
                      <span className="text-white text-sm font-medium">Uploaded!</span>
                    </div>
                  </div>
                )}
              </div>

              {isPending && (
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
                accept="video/*"
                className="hidden"
                ref={(el) => { inputRefs.current[service.id] = el; }}
                onChange={(e) => handleFileSelect(e, service.id)}
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
            <video
              src={lightbox.url}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
              controls
              autoPlay
            />
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
                <h3 className="text-white font-bold text-lg">Delete video for {deleteConfirm.title}?</h3>
                <p className="text-gray-400 text-sm mt-2">
                  This will remove the video from this service card. You can upload a new one anytime.
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
                  onClick={() => handleDelete(deleteConfirm.id)}
                  disabled={deletingId === deleteConfirm.id}
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