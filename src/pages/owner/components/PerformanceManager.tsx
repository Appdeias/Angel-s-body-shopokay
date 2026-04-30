import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/hooks/useSiteData';
import type { PerformanceBar } from '@/hooks/useSiteData';

function BarForm({ bar, onSave, onCancel }: {
  bar?: PerformanceBar;
  onSave: (d: Omit<PerformanceBar, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(bar?.label || '');
  const [value, setValue] = useState(bar?.value || 0);
  const [display, setDisplay] = useState(bar?.display || '');
  const [order, setOrder] = useState(bar?.display_order || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ label, value, display, display_order: order });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#2db84b]/30 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Label</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Display Text</label>
          <input type="text" value={display} onChange={(e) => setDisplay(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="e.g. 99%" required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Value (0-100)</label>
          <input type="number" min={0} max={100} value={value} onChange={(e) => setValue(parseInt(e.target.value) || 0)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Order</label>
          <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-save-line"></i> {bar ? 'Update' : 'Add'} Bar
        </button>
        <button type="button" onClick={onCancel} className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function PerformanceManager() {
  const { performanceBars, refresh } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const handleSave = async (data: Omit<PerformanceBar, 'id' | 'created_at'>) => {
    try {
      if (editingId) {
        await supabase.from('performance_bars').update(data).eq('id', editingId);
      } else {
        await supabase.from('performance_bars').insert(data);
      }
      refresh();
      setEditingId(null);
      setShowAdd(false);
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this performance bar?')) return;
    await supabase.from('performance_bars').delete().eq('id', id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
            <i className="ri-bar-chart-2-line text-[#2db84b] text-lg"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Performance Bars</h2>
            <p className="text-gray-500 text-xs">Edit the animated stats shown next to the video</p>
          </div>
        </div>
        <button onClick={() => { setShowAdd(true); setEditingId(null); }} className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-4 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-add-line"></i> Add Bar
        </button>
      </div>

      {showAdd && <div className="mb-6"><BarForm onSave={handleSave} onCancel={() => setShowAdd(false)} /></div>}

      <div className="space-y-3">
        {performanceBars.map((bar) => (
          <div key={bar.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
            {editingId === bar.id ? (
              <BarForm bar={bar} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold text-sm">{bar.label}</h3>
                    <span className="text-[#2db84b] text-xs font-bold bg-[#2db84b]/10 px-2 py-0.5 rounded-full">{bar.display}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="h-2 rounded-full bg-[#2db84b]" style={{ width: `${bar.value}%` }}></div>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Order: {bar.display_order}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { setEditingId(bar.id); setShowAdd(false); }} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#2db84b]/20 rounded-lg text-gray-400 hover:text-[#2db84b] cursor-pointer">
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button onClick={() => handleDelete(bar.id)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#c0392b]/20 rounded-lg text-gray-400 hover:text-[#c0392b] cursor-pointer">
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