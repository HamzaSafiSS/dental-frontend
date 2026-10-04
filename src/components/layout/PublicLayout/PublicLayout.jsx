import TopBar from '../TopBar/TopBar';

/**
 * PublicLayout — wraps all public-facing pages.
 * Includes TopBar, Navbar (future), main content, and Footer (future).
 */
export default function PublicLayout({ children }) {
  return (
    <div className="site-wrapper">
      <TopBar />
      {/* Navbar will be added in the next phase */}
      <main className="main-content">
        {children}
      </main>
      {/* Footer will be added later */}
    </div>
  );
}
