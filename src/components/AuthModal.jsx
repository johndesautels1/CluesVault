import { useState } from 'react';
import { hashString, loadAuth, saveAuth } from '../utils/storage';

export default function AuthModal({ onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hint, setHint] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);

  useState(() => {
    const stored = loadAuth();
    if (!stored) {
      setHint('First-time setup: choose an email and password for CluesVault.');
      setIsFirstTime(true);
    } else {
      setHint('Enter your CluesVault email and password.');
      setIsFirstTime(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setHint('Please enter both email and password.');
      return;
    }

    const hash = await hashString(email + '|' + password);
    const stored = loadAuth();

    if (!stored || isFirstTime) {
      // First-time setup
      saveAuth(email, hash);
      onAuthenticated();
    } else {
      // Returning user
      if (email === stored.email && hash === stored.hash) {
        onAuthenticated();
      } else {
        setHint('Invalid email or password.');
      }
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <h2>CluesVault Login</h2>
        <p>Secure access to your internal API vault for CLUES™ & Olivia.</p>
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="authEmail">Email</label>
            <input
              type="email"
              id="authEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="authPassword">Password</label>
            <input
              type="password"
              id="authPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="small" id="authHint" style={{ marginTop: '4px', minHeight: '1em' }}>
            {hint}
          </div>
          <div className="editor-footer">
            <button type="submit" className="btn-primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
