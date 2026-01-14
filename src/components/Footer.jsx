export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-logo">🔐 CluesVault</span>
          <span className="footer-tagline">Secure API & Credentials Registry</span>
        </div>

        <div className="footer-company">
          <span className="company-name">CLUES Intelligence LTD</span>
          <span className="company-info">Enterprise Security Solutions</span>
        </div>
      </div>

      <div className="footer-legal">
        <span>© {currentYear} CLUES Intelligence LTD. All rights reserved.</span>
        <span className="footer-divider">•</span>
        <span>Data stored locally in your browser</span>
        <span className="footer-divider">•</span>
        <span>No cloud sync • No external transmission</span>
      </div>

      <div className="footer-security">
        🔒 Your credentials never leave your device
      </div>
    </footer>
  );
}
