import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // 'POP' means the user navigated back/forward, or refreshed the page.
    // In those cases, we want the browser's default scroll restoration to handle it.
    // For 'PUSH' (clicking a link) or 'REPLACE', we scroll to the top.
    if (navType !== 'POP') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' to avoid jarring smooth scrolls on navigation
      });
    }
  }, [pathname, navType]);

  return null;
}
