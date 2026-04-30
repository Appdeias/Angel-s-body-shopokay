import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/hooks/useSiteData';
import type { Faq } from '@/hooks/useSiteData';

function FaqForm({ faq, onSave, onCancel }: {
  faq?: Faq;
  onSave: (d: Omit<Faq, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}) {
  const [question, setQuestion] = useState(faq?.question || '');
  const [answer, setAnswer] = useState(faq?.answer || '');
  const [order, setOrder] = useState(faq?.display_order || 0);
  const [isActive, setIsActive] = useState(faq?.is_active ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ question, answer, display_order: order, is_active: isActive });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#2db84b]/30 rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Question</label>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Order</label>
          <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b]" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Answer</label>
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2db84b] resize-none" required />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="faqActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 accent-[#2db84b] cursor-pointer" />
        <label htmlFor="faqActive" className="text-gray-300 text-sm cursor-pointer">Visible on website</label>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-save-line"></i> {faq ? 'Update' : 'Add'} FAQ
        </button>
        <button type="button" onClick={onCancel} className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-5 py-2 rounded-full transition-colors cursor-pointer text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function FaqsManager() {
  const { faqs, refresh } = useSiteData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const handleSave = async (data: Omit<Faq, 'id' | 'created_at'>) => {
    try {
      if (editingId) {
        await supabase.from('faqs').update(data).eq('id', editingId);
      } else {
        await supabase.from('faqs').insert(data);
      }
      refresh();
      setEditingId(null);
      setShowAdd(false);
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await supabase.from('faqs').delete().eq('id', id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
            <i className="ri-question-line text-[#2db84b] text-lg"></i>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">FAQs</h2>
            <p className="text-gray-500 text-xs">Manage frequently asked questions</p>
          </div>
        </div>
        <button onClick={() => { setShowAdd(true); setEditingId(null); }} className="bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-4 py-2 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2">
          <i className="ri-add-line"></i> Add FAQ
        </button>
      </div>

      {showAdd && <div className="mb-6"><FaqForm onSave={handleSave} onCancel={() => setShowAdd(false)} /></div>}

      <div className="space-y-3">
        {faqs.filter((f) => f.is_active || editingId === f.id).map((faq) => (
          <div key={faq.id} className="bg-[#111111] border border-white/10 rounded-xl p-5">
            {editingId === faq.id ? (
              <FaqForm faq={faq} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm">{faq.question}</h3>
                    {!faq.is_active && <span className="text-gray-500 text-xs bg-white/5 px-2 py-0.5 rounded-full">Hidden</span>}
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{faq.answer}</p>
                  <p className="text-gray-500 text-xs mt-1">Order: {faq.display_order}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { setEditingId(faq.id); setShowAdd(false); }} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#2db84b]/20 rounded-lg text-gray-400 hover:text-[#2db84b] cursor-pointer">
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button onClick={() => handleDelete(faq.id)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-[#c0392b]/20 rounded-lg text-gray-400 hover:text-[#c0392b] cursor-pointer">
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