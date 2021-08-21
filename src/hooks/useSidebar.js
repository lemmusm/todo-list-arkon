import { useState } from 'react';

export const useSidebar = () => {
  const initialState = false;

  const [mobileOpen, setMobileOpen] = useState(initialState);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return { mobileOpen, handleDrawerToggle };
};
