import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // 'POP' means the user navigated back/forward, or refreshed the page.
    if (navType !== 'POP') {
      if (hash) {
        // Find the element and scroll to it smoothly
        // Small timeout ensures the DOM is fully painted first
        setTimeout(() => {
          const element = document.getElementById(hash.replace('#', ''));
          if (element) {
            // Offset for the sticky navbar
            const yOffset = -100; 
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' 
        });
      }
    }
  }, [pathname, hash, navType]);

  return null;
}
