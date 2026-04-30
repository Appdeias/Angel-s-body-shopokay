import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/hooks/useSiteData';
import type { Service } from '@/hooks/useSiteData';

const REMIX_ICONS = [
  'ri-car-line', 'ri-hammer-line', 'ri-shield-line', 'ri-paint-brush-line',
  'ri-focus-3-line', 'ri-flashlight-line', 'ri-circle-line', 'ri-drop-line',
  'ri-building-line', 'ri-layout-2-line', 'ri-palette-line', 'ri-car-washing-line',
  'ri-tools-line', 'ri-settings-3-line', 'ri-star-line',
];

function ServiceForm({ service, onSave, onCancel }: {
  service?: Service;
  onSave: (s: Omit<Service, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(service?.title || '');
  const [description, setDescription] = useState(service?.description || '');
  const [icon, setIcon] = useState(service?.icon || 'ri-car-line');
  const [videoUrl, setVideoUrl] = useState(service?.video_url || '');
  const [imageUrl, setImageUrl] = useState(service?.image_url || '');
  const [price, setPrice] = useState(service?.price || '');
  const [displayOrder, setDisplayOrder] = useState(service?.display_order || 0);
  const [isActive, setIsActive] = useState(service?.is_active ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, icon, video_url: videoUrl, image_url: imageUrl, price, display_order: displayOrder, is_active: isActive });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#2db84b]/30 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Order</label>
          <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] resize-none" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Video URL</label>
          <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Image URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="https://..." />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Icon</label>
          <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] cursor-pointer">
            {REMIX_ICONS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Price (optional)</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="Starting at $X" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 accent-[#2db84b] cursor-pointer" />
        <label htmlFor="isActive" className="text-gray-300 text-sm cursor-pointer">Visible on website</label>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-save-line"></i> {service ? 'Update' : 'Add'} Service
        </button>
        <button type="button" onClick={onCancel} className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ServicesManager() {
  const { services, refresh } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (data: Omit<Service, 'id' | 'created_at'>) => {
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('services').update(data).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert(data);
        if (error) throw error;
      }
      refresh();
      setEditingId(null);
      setShowAdd(false);
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    await supabase.from('services').delete().eq('id', id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
            <i className="ri-car-line text-[#2db84b] text-lg"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Services</h2>
            <p className="text-gray-500 text-xs">Add, edit, or remove services from your website</p>
          </div>
        </div>
        <button onClick={() => { setShowAdd(true); setEditingId(null); }} className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-4 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-add-line"></i> Add Service
        </button>
      </div>

      {showAdd && (
        <div className="mb-6">
          <ServiceForm onSave={handleSave} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      {saving && (
        <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <i className="ri-loader-4-line animate-spin"></i> Saving...
        </p>
      )}

      <div className="space-y-3">
        {services.filter((s) => s.is_active || editingId === s.id).map((service) => (
          <div key={service.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
            {editingId === service.id ? (
              <ServiceForm service={service} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-lg shrink-0">
                  <i className={`${service.icon} text-[#2db84b] text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">{service.title}</h3>
                    {service.price && <span className="text-[#e8b84b] text-xs font-semibold bg-[#e8b84b]/10 px-2 py-0.5 rounded-full">{service.price}</span>}
                    {!service.is_active && <span className="text-gray-500 text-xs bg-white/5 px-2 py-0.5 rounded-full">Hidden</span>}
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-gray-500 text-xs">
                    <span>Order: {service.display_order}</span>
                    {service.video_url && <span><i className="ri-video-line mr-1"></i>Video</span>}
                    {service.image_url && <span><i className="ri-image-line mr-1"></i>Image</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { setEditingId(service.id); setShowAdd(false); }} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#2db84b]/20 rounded-lg text-gray-400 hover:text-[#2db84b] transition-colors cursor-pointer">
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#c0392b]/20 rounded-lg text-gray-400 hover:text-[#c0392b] transition-colors cursor-pointer">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}