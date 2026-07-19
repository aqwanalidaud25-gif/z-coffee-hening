import { useState, useCallback, useEffect } from "react";

/**
 * useSidebar
 * Mengatur state buka/tutup sidebar untuk layar mobile.
 * Di desktop (md ke atas) sidebar selalu tampil lewat CSS (md:block),
 * hook ini hanya relevan untuk toggle overlay di mobile.
 */
export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Tutup otomatis saat resize ke desktop agar overlay tidak "nyangkut"
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isOpen, open, close, toggle };
}
