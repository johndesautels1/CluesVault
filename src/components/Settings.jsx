import { useState, useEffect } from 'react';
import {
  getGitHubToken,
  saveGitHubToken,
  removeGitHubToken,
  validateToken,
  syncToGist,
  loadFromCloud
} from '../utils/gistSync';

export default function Settings({
  isOpen,
  onClose,
  vaultData,
  onRestoreData,
  syncStatus,
  onSyncStatusChange
}) {
  const [token, setToken] = useState('');
  const [savedToken, setSavedToken] = useState('');
  const [username, setUsername] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const stored = getGitHubToken();
    if (stored) {
      setSavedToken(stored);
      // Validate and get username
      validateToken(stored).then(result => {
        if (result.valid) {
          setUsername(result.username);
        }
      });
    }
  }, [isOpen]);

  const handleConnect = async () => {
    if (!token.trim()) {
      setMessage({ type: 'error', text: 'Please enter a token' });
      return;
    }

    setIsValidating(true);
    setMessage({ type: '', text: '' });

    const result = await validateToken(token.trim());

    if (result.valid) {
      saveGitHubToken(token.trim());
      setSavedToken(token.trim());
      setUsername(result.username);
      setToken('');
      setMessage({ type: 'success', text: `Connected as ${result.username}!` });
      onSyncStatusChange('connected');
    } else {
      setMessage({ type: 'error', text: 'Invalid token. Check your token and try again.' });
    }

    setIsValidating(false);
  };

  const handleDisconnect = () => {
    if (confirm('Disconnect GitHub sync? Your local data will remain, but cloud sync will stop.')) {
      removeGitHubToken();
      setSavedToken('');
      setUsername('');
      setMessage({ type: 'info', text: 'Disconnected from GitHub' });
      onSyncStatusChange('disconnected');
    }
  };

  const handleSyncNow = async () => {
    if (!savedToken) return;

    setIsSyncing(true);
    setMessage({ type: '', text: '' });
    onSyncStatusChange('syncing');

    const result = await syncToGist(savedToken, vaultData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Synced to GitHub Gist!' });
      onSyncStatusChange('synced');
    } else {
      setMessage({ type: 'error', text: `Sync failed: ${result.error}` });
      onSyncStatusChange('error');
    }

    setIsSyncing(false);
  };

  const handleRestoreFromCloud = async () => {
    if (!savedToken) return;

    if (!confirm('Restore from cloud? This will replace your local data with the cloud backup.')) {
      return;
    }

    setIsSyncing(true);
    setMessage({ type: '', text: '' });

    const result = await loadFromCloud(savedToken);

    if (result.success) {
      onRestoreData(result.data);
      setMessage({ type: 'success', text: 'Restored from cloud backup!' });
    } else {
      setMessage({ type: 'error', text: `Restore failed: ${result.error}` });
    }

    setIsSyncing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="editor-backdrop show">
      <div className="editor-panel settings-panel">
        <div className="editor-header">
          <h2>⚙️ Settings & Cloud Sync</h2>
          <button className="editor-close" onClick={onClose}>&times;</button>
        </div>

        <div className="settings-content">
          {/* GitHub Sync Section */}
          <div className="settings-section">
            <h3>☁️ GitHub Cloud Sync</h3>
            <p className="hint">
              Sync your vault to a private GitHub Gist. Your data stays private and accessible from any device.
            </p>

            {savedToken ? (
              <div className="connected-status">
                <div className="connected-info">
                  <span className="connected-badge">✅ Connected</span>
                  <span className="connected-user">@{username}</span>
                </div>

                <div className="sync-actions">
                  <button
                    className="btn-primary"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                  >
                    {isSyncing ? '⏳ Syncing...' : '☁️ Sync Now'}
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={handleRestoreFromCloud}
                    disabled={isSyncing}
                  >
                    📥 Restore from Cloud
                  </button>
                  <button
                    className="btn-danger"
                    onClick={handleDisconnect}
                  >
                    🔌 Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="connect-form">
                <div className="field-group">
                  <label>GitHub Personal Access Token</label>
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="hint">
                    Create a token at{' '}
                    <a
                      href="https://github.com/settings/tokens/new?scopes=gist&description=CluesVault"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/settings/tokens
                    </a>
                    {' '}with only <strong>"gist"</strong> scope checked.
                  </p>
                </div>

                <button
                  className="btn-primary"
                  onClick={handleConnect}
                  disabled={isValidating}
                >
                  {isValidating ? '⏳ Validating...' : '🔗 Connect GitHub'}
                </button>
              </div>
            )}

            {message.text && (
              <div className={`settings-message ${message.type}`}>
                {message.text}
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="settings-section">
            <h3>ℹ️ How Cloud Sync Works</h3>
            <ul className="info-list">
              <li>Your data is stored in a <strong>private GitHub Gist</strong></li>
              <li>Only you can see it (requires your token)</li>
              <li>Syncs: APIs, categories, products, and all credentials</li>
              <li>Works across devices - just connect with same token</li>
              <li>Auto-sync happens when you save changes</li>
            </ul>
          </div>

          {/* Data Stats */}
          <div className="settings-section">
            <h3>📊 Vault Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-value">{vaultData.apis?.length || 0}</span>
                <span className="stat-label">APIs</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{vaultData.categories?.length || 0}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{vaultData.products?.length || 0}</span>
                <span className="stat-label">Products</span>
              </div>
            </div>
          </div>
        </div>

        <div className="editor-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
