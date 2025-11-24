import { useState } from "react";
import type { CreateVagaDTO } from "../../types/vaga";
import { X, Plus, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVagaDTO) => Promise<boolean>;
  isSubmitting: boolean;
}

export default function CreateVagaModal({ isOpen, onClose, onSubmit, isSubmitting }: Props) {
  const [form, setForm] = useState<CreateVagaDTO>({ 
    titulo: "", 
    descricao: "", 
    escolaridade: "Ensino Médio Completo" 
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      setForm({ titulo: "", descricao: "", escolaridade: "Ensino Médio Completo" });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nova Vaga</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Título do Cargo</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Desenvolvedor Front-end"
              value={form.titulo}
              onChange={e => setForm({...form, titulo: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Descrição Detalhada</label>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Descreva as atividades e requisitos..."
              value={form.descricao}
              onChange={e => setForm({...form, descricao: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Escolaridade</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.escolaridade}
              onChange={e => setForm({...form, escolaridade: e.target.value})}
            >
              <option>Ensino Fundamental Incompleto</option>
              <option>Ensino Fundamental Completo</option>
              <option>Ensino Médio Incompleto</option>
              <option>Ensino Médio Completo</option>
              <option>Ensino Superior Incompleto</option>
              <option>Ensino Superior Completo</option>
              <option>Pós-Graduação</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-medium">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 disabled:opacity-70">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              <span>Criar Vaga</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}