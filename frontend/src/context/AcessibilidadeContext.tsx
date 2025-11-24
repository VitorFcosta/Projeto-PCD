import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AcessibilidadeContextType {
  fontSize: number; // Porcentagem (100 = normal)
  highContrast: boolean;
  toggleHighContrast: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetSettings: () => void;
}

const AcessibilidadeContext = createContext<AcessibilidadeContextType | undefined>(undefined);

export function AcessibilidadeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  // Aplica o tamanho da fonte na tag HTML
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Aplica classe de alto contraste
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 10, 150)); // Max 150%
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 10, 80));  // Min 80%
  
  const toggleHighContrast = () => setHighContrast(prev => !prev);
  
  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
  };

  return (
    <AcessibilidadeContext.Provider value={{ fontSize, highContrast, toggleHighContrast, increaseFont, decreaseFont, resetSettings }}>
      {children}
    </AcessibilidadeContext.Provider>
  );
}

export function useAcessibilidade() {
  const context = useContext(AcessibilidadeContext);
  if (!context) throw new Error("useAcessibilidade must be used within AcessibilidadeProvider");
  return context;
}