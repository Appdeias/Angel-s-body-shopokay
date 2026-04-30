import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/hooks/useSiteData';
import type { Review } from '@/mocks/reviews';

const SERVICES = [
  'Collision Repair', 'Dent Removal', 'Bumper Repair', 'Full Paint Job',
  'Spot Paint Repair', 'Headlight Restoration', 'Rim Painting', 'Clear Coat Application',
  'Structural Repair', 'Panel Replacement', 'Color Matching', 'Full Vehicle Restoration',
];

function ReviewForm({ review, onSave, onCancel }: {
  review?: Review;
  onSave: (data: Omit<Review, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(review?.name || '');
  const [rating, setRating] = useState(review?.rating || 5);
  const [text, setText] = useState(review?.text || '');
  const [service, setService] = useState(review?.service || SERVICES[0]);
  const [displayOrder, setDisplayOrder] = useState(review?.display_order || 0);
  const [isActive, setIsActive] = useState(review?.is_active ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, rating, text, service, display_order: displayOrder, is_active: isActive });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#2db84b]/30 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Customer Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Rating (1-5)</label>
          <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(parseInt(e.target.value) || 5)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Order</label>
          <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Service</label>
          <select value={service} onChange={(e) => setService(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] cursor-pointer">
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="rActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 accent-[#2db84b] cursor-pointer" />
          <label htmlFor="rActive" className="text-gray-300 text-sm cursor-pointer">Visible on website</label>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Review Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] resize-none" required maxLength={500} />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-save-line"></i> {review ? 'Update' : 'Add'} Review
        </button>
        <button type="button" onClick={onCancel} className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ReviewsManager() {
  const { reviews, refresh } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (data: Omit<Review, 'id' | 'created_at'>) => {
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('reviews').update(data).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('reviews').insert(data);
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
    if (!confirm('Are you sure you want to delete this review?')) return;
    await supabase.from('reviews').delete().eq('id', id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
            <i className="ri-star-line text-[#2db84b] text-lg"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Customer Reviews</h2>
            <p className="text-gray-500 text-xs">Manage reviews displayed on your website</p>
          </div>
        </div>
        <button onClick={() => { setShowAdd(true); setEditingId(null); }} className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-4 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-add-line"></i> Add Review
        </button>
      </div>

      {showAdd && (
        <div className="mb-6">
          <ReviewForm onSave={handleSave} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      {saving && (
        <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <i className="ri-loader-4-line animate-spin"></i> Saving...
        </p>
      )}

      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
            {editingId === review.id ? (
              <ReviewForm review={review} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-lg shrink-0">
                  <span className="text-[#2db84b] text-xs font-bold">
                    {review.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">{review.name}</h3>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={`text-xs ${i < review.rating ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-600'}`}></i>
                      ))}
                    </div>
                    {!review.is_active && <span className="text-gray-500 text-xs bg-white/5 px-2 py-0.5 rounded-full">Hidden</span>}
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-1">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <span className="text-[#2db84b]">{review.service}</span>
                    <span>Order: {review.display_order}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { setEditingId(review.id); setShowAdd(false); }} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#2db84b]/20 rounded-lg text-gray-400 hover:text-[#2db84b] transition-colors cursor-pointer">
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button onClick={() => handleDelete(review.id)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#c0392b]/20 rounded-lg text-gray-400 hover:text-[#c0392b] transition-colors cursor-pointer">
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