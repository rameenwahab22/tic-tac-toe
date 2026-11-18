
import { createContext } from "react";

export const SfxContext = createContext({});

export function SfxContextProvider({ children }) {
  return (
    <SfxContext.Provider value={{}}>
      {children}
    </SfxContext.Provider>
  );
}
