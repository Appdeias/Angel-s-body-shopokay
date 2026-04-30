import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/hooks/useSiteData';
import type { HowItWorksStep } from '@/hooks/useSiteData';

const ICONS = ['ri-customer-service-2-line', 'ri-file-list-3-line', 'ri-tools-line', 'ri-checkbox-circle-line', 'ri-car-line', 'ri-shield-check-line'];

function StepForm({ step, onSave, onCancel }: {
  step?: HowItWorksStep;
  onSave: (d: Omit<HowItWorksStep, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(step?.title || '');
  const [description, setDescription] = useState(step?.description || '');
  const [icon, setIcon] = useState(step?.icon || 'ri-tools-line');
  const [order, setOrder] = useState(step?.display_order || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, icon, display_order: order });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#2db84b]/30 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Order</label>
          <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] resize-none" required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Icon</label>
        <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] cursor-pointer">
          {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-save-line"></i> {step ? 'Update' : 'Add'} Step
        </button>
        <button type="button" onClick={onCancel} className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function HowItWorksManager() {
  const { howItWorks, refresh } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const handleSave = async (data: Omit<HowItWorksStep, 'id' | 'created_at'>) => {
    try {
      if (editingId) {
        await supabase.from('how_it_works').update(data).eq('id', editingId);
      } else {
        await supabase.from('how_it_works').insert(data);
      }
      refresh();
      setEditingId(null);
      setShowAdd(false);
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this step?')) return;
    await supabase.from('how_it_works').delete().eq('id', id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
            <i className="ri-task-line text-[#2db84b] text-lg"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">How It Works</h2>
            <p className="text-gray-500 text-xs">Edit the 4-step process shown on the homepage</p>
          </div>
        </div>
        <button onClick={() => { setShowAdd(true); setEditingId(null); }} className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-4 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-add-line"></i> Add Step
        </button>
      </div>

      {showAdd && <div className="mb-6"><StepForm onSave={handleSave} onCancel={() => setShowAdd(false)} /></div>}

      <div className="space-y-3">
        {howItWorks.map((step) => (
          <div key={step.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
            {editingId === step.id ? (
              <StepForm step={step} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-lg shrink-0">
                  <i className={`${step.icon} text-[#2db84b] text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm">{step.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{step.description}</p>
                  <p className="text-gray-500 text-xs mt-1">Order: {step.display_order}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { setEditingId(step.id); setShowAdd(false); }} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#2db84b]/20 rounded-lg text-gray-400 hover:text-[#2db84b] cursor-pointer">
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button onClick={() => handleDelete(step.id)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#c0392b]/20 rounded-lg text-gray-400 hover:text-[#c0392b] cursor-pointer">
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