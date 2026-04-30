import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/hooks/useSiteData';
import type { CompanyValue } from '@/hooks/useSiteData';

const ICONS = ['ri-price-tag-3-line', 'ri-customer-service-2-line', 'ri-shield-check-line', 'ri-user-heart-line', 'ri-translate-2', 'ri-car-line'];

function ValueForm({ value, onSave, onCancel }: {
  value?: CompanyValue;
  onSave: (d: Omit<CompanyValue, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(value?.label || '');
  const [icon, setIcon] = useState(value?.icon || 'ri-shield-check-line');
  const [order, setOrder] = useState(value?.display_order || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ label, icon, display_order: order });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#2db84b]/30 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Label</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Order</label>
          <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Icon</label>
        <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] cursor-pointer">
          {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-save-line"></i> {value ? 'Update' : 'Add'} Value
        </button>
        <button type="button" onClick={onCancel} className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ValuesManager() {
  const { companyValues, refresh } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const handleSave = async (data: Omit<CompanyValue, 'id' | 'created_at'>) => {
    try {
      if (editingId) {
        await supabase.from('company_values').update(data).eq('id', editingId);
      } else {
        await supabase.from('company_values').insert(data);
      }
      refresh();
      setEditingId(null);
      setShowAdd(false);
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this value?')) return;
    await supabase.from('company_values').delete().eq('id', id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
            <i className="ri-heart-3-line text-[#2db84b] text-lg"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Our Values</h2>
            <p className="text-gray-500 text-xs">Values shown on the About Us page</p>
          </div>
        </div>
        <button onClick={() => { setShowAdd(true); setEditingId(null); }} className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-4 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-add-line"></i> Add Value
        </button>
      </div>

      {showAdd && <div className="mb-6"><ValueForm onSave={handleSave} onCancel={() => setShowAdd(false)} /></div>}

      <div className="space-y-3">
        {companyValues.map((v) => (
          <div key={v.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
            {editingId === v.id ? (
              <ValueForm value={v} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-lg shrink-0">
                  <i className={`${v.icon} text-[#2db84b] text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm">{v.label}</h3>
                  <p className="text-gray-500 text-xs">Order: {v.display_order}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { setEditingId(v.id); setShowAdd(false); }} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#2db84b]/20 rounded-lg text-gray-400 hover:text-[#2db84b] cursor-pointer">
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button onClick={() => handleDelete(v.id)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#c0392b]/20 rounded-lg text-gray-400 hover:text-[#c0392b] cursor-pointer">
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