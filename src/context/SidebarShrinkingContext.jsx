import { createContext, useState, useContext } from "react";

const SidebarShrinkContext = createContext();

function SidebarShrinkProvider({ children }) {
  const [isShrunk, setIsShrunk] = useState(false);

  function toggleShrink() {
    setIsShrunk((prevIsShrunk) => !prevIsShrunk);
  }

  return (
    <SidebarShrinkContext.Provider
      value={{ isShrunk, setIsShrunk, toggleShrink }}
    >
      {children}
    </SidebarShrinkContext.Provider>
  );
}

function useSidebarShrink() {
  const context = useContext(SidebarShrinkContext);
  if (context === undefined) {
    throw new Error(
      "useSidebarShrink must be used within a SidebarShrinkProvider"
    );
  }
  return context;
}

export { SidebarShrinkProvider, useSidebarShrink };
