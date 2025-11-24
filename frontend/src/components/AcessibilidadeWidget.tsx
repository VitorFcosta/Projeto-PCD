import { useState } from "react";
import { useAcessibilidade } from "../context/AcessibilidadeContext";
import { 
  Accessibility,
  Minus, 
  Plus, 
  SunMoon, 
  RotateCcw,
  X
} from "lucide-react";

export default function AcessibilidadeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, highContrast, increaseFont, decreaseFont, toggleHighContrast, resetSettings } = useAcessibilidade();

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Botão Flutuante */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          aria-label="Abrir menu de acessibilidade"
          title="Acessibilidade"
        >
          <Accessibility className="w-8 h-8" />
        </button>
      )}

      {/* Painel Aberto */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-5 w-72 animate-fade-in-up">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-indigo-600" /> Acessibilidade
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Controle de Fonte */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Tamanho do Texto</p>
              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button onClick={decreaseFont} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors" aria-label="Diminuir fonte">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold font-mono">{fontSize}%</span>
                <button onClick={increaseFont} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors" aria-label="Aumentar fonte">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Alto Contraste */}
            <div>
              <button 
                onClick={toggleHighContrast}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${highContrast ? 'bg-yellow-400 border-black text-black font-bold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500'}`}
              >
                <span className="flex items-center gap-2 text-sm">
                  <SunMoon className="w-4 h-4" /> Alto Contraste
                </span>
                <div className={`w-4 h-4 rounded-full border ${highContrast ? 'bg-black border-black' : 'border-slate-400'}`}></div>
              </button>
            </div>

            {/* Reset */}
            <button 
              onClick={resetSettings}
              className="w-full py-2 text-xs text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Restaurar padrão
            </button>
          </div>
        </div>
      )}
    </div>
  );
}