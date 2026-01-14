import { getStatusClass } from '../utils/storage';

export default function APICard({ api, onEdit, onDelete }) {
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
        <div className="card-title" onClick={handleTitleClick}>
          {api.name || '(Unnamed API)'}
        </div>
        <div className={`status-pill ${getStatusClass(api.status)}`}>
          {(api.status || 'active').toUpperCase()}
        </div>
      </div>

      {api.description && (
        <div className="value">{api.description}</div>
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

      {api.category && (
        <>
          <div className="label">Category</div>
          <div className="value">{api.category}</div>
        </>
      )}

      {api.baseUrlProd && (
        <>
          <div className="label">Base URL (prod)</div>
          <div className="small">{api.baseUrlProd}</div>
        </>
      )}

      {(api.docsUrl || api.authMethod) && (
        <>
          <div className="label">Docs & Auth</div>
          {api.docsUrl && (
            <a href={api.docsUrl} target="_blank" rel="noopener noreferrer">
              API Docs
            </a>
          )}
          {api.authMethod && (
            <div className="small">
              Auth: {api.authMethod}
              {api.envProd && ` · env: ${api.envProd}`}
            </div>
          )}
        </>
      )}

      {(api.accountEmail || api.loginUrl) && (
        <>
          <div className="label">Account & Login</div>
          {api.accountEmail && (
            <div className="small">Email: {api.accountEmail}</div>
          )}
          {api.loginUrl && (
            <a href={api.loginUrl} target="_blank" rel="noopener noreferrer">
              Login Portal
            </a>
          )}
        </>
      )}

      {api.tokenPortalUrl && (
        <>
          <div className="label">Token / Keys</div>
          <a href={api.tokenPortalUrl} target="_blank" rel="noopener noreferrer">
            Manage Keys
          </a>
          {api.tokenLastRotated && (
            <div className="small">Last rotated: {api.tokenLastRotated}</div>
          )}
        </>
      )}

      {api.secretLocation && (
        <>
          <div className="label">Secret Location</div>
          <div className="small">{api.secretLocation}</div>
        </>
      )}

      {api.tags && api.tags.length > 0 && (
        <div className="tags">
          {api.tags.map((tag, idx) => (
            <div key={idx} className="tag">{tag}</div>
          ))}
        </div>
      )}

      {api.notes && (
        <>
          <div className="label">Notes</div>
          <div className="small">{api.notes}</div>
        </>
      )}

      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
