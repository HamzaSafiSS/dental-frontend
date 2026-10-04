import TopBar from '../TopBar/TopBar';
import Navbar from '../Navbar/Navbar';

/**
 * PublicLayout — wraps all public-facing pages.
 * Includes TopBar, Navbar, main content, and Footer (future).
 */
export default function PublicLayout({ children }) {
  return (
    <div className="site-wrapper">
      <TopBar />
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      {/* Footer will be added later */}
    </div>
  );
}
