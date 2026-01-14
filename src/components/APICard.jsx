import { getStatusClass } from '../utils/storage';

export default function APICard({ api, categoryInfo, onEdit, onDelete }) {
  const handleTitleClick = () => {
    if (api.docsUrl) {
      window.open(api.docsUrl, '_blank');
    } else if (api.tokenPortalUrl) {
      window.open(api.tokenPortalUrl, '_blank');
    } else if (api.baseUrlProd) {
      window.open(api.baseUrlProd, '_blank');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-row">
          <span className="card-category-icon" title={categoryInfo?.name}>
            {categoryInfo?.icon || '📁'}
          </span>
          <div className="card-title" onClick={handleTitleClick}>
            {api.name || '(Unnamed API)'}
          </div>
        </div>
        <div className={`status-pill ${getStatusClass(api.status)}`}>
          {(api.status || 'active').toUpperCase()}
        </div>
      </div>

      {api.description && (
        <div className="card-description">{api.description}</div>
      )}

      {api.monthlyCost && (
        <div className="cost-badge">{api.monthlyCost}/mo</div>
      )}

      {api.products && api.products.length > 0 && (
        <>
          <div className="label">Products</div>
          <div className="chip-row">
            {api.products.map((p, idx) => (
              <div key={idx} className="chip">{p}</div>
            ))}
          </div>
        </>
      )}

      {api.baseUrlProd && (
        <>
          <div className="label">Base URL</div>
          <div className="small url-text">{api.baseUrlProd}</div>
        </>
      )}

      {(api.docsUrl || api.authMethod) && (
        <div className="card-links">
          {api.docsUrl && (
            <a href={api.docsUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              📖 Docs
            </a>
          )}
          {api.loginUrl && (
            <a href={api.loginUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              🔑 Login
            </a>
          )}
          {api.tokenPortalUrl && (
            <a href={api.tokenPortalUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              🎫 Keys
            </a>
          )}
        </div>
      )}

      {api.authMethod && (
        <div className="small auth-info">
          Auth: {api.authMethod}
          {api.envProd && <span className="env-var"> · {api.envProd}</span>}
        </div>
      )}

      {(api.accountEmail || api.username || api.userId) && (
        <div className="credentials-section">
          <div className="label">Credentials</div>
          {api.accountEmail && <div className="small">📧 {api.accountEmail}</div>}
          {api.username && <div className="small">👤 {api.username}</div>}
          {api.userId && <div className="small">🆔 {api.userId}</div>}
        </div>
      )}

      {api.secretLocation && (
        <div className="small secret-location">🔒 {api.secretLocation}</div>
      )}

      {api.tags && api.tags.length > 0 && (
        <div className="tags">
          {api.tags.map((tag, idx) => (
            <div key={idx} className="tag">{tag}</div>
          ))}
        </div>
      )}

      {api.notes && (
        <div className="card-notes">
          <div className="small">{api.notes}</div>
        </div>
      )}

      <div className="card-actions">
        <button onClick={onEdit}>✏️ Edit</button>
        <button onClick={onDelete} className="btn-delete">🗑️ Delete</button>
      </div>
    </div>
  );
}
