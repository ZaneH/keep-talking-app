import { createContext, useCallback, useContext, useState } from "react";

interface HighlightContextType {
  highlight: (_object: any) => void;
  unhighlight: (_object: any) => void;
  selected: any;
}

const HighlightContext = createContext<HighlightContextType>(
  {} as HighlightContextType
);

export function HighlightProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<any>([]);

  const highlight = useCallback((object: any) => {
    setSelected((prev: any) => [...new Set([...prev, object])]);
  }, []);

  const unhighlight = useCallback((object: any) => {
    setSelected((prev: any) => prev.filter((obj: any) => obj !== object));
  }, []);

  return (
    <HighlightContext.Provider value={{ highlight, unhighlight, selected }}>
      {children}
    </HighlightContext.Provider>
  );
}

export const useHighlight = () => useContext(HighlightContext);
