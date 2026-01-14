import { useState, useRef } from 'react';
import { parseCSV } from '../utils/storage';

export default function BulkImport({ isOpen, onClose, onImport, categories }) {
  const [importText, setImportText] = useState('');
  const [preview, setPreview] = useState([]);
  const [importMode, setImportMode] = useState('csv'); // csv, paste, json
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      if (file.name.endsWith('.json')) {
        try {
          const data = JSON.parse(text);
          const apis = Array.isArray(data) ? data : [data];
          setPreview(apis);
          setImportMode('json');
        } catch (err) {
          alert('Invalid JSON file');
        }
      } else {
        setImportText(text);
        const parsed = parseCSV(text);
        setPreview(parsed);
        setImportMode('csv');
      }
    };
    reader.readAsText(file);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setImportText(text);

    // Try to parse as JSON first
    try {
      const data = JSON.parse(text);
      const apis = Array.isArray(data) ? data : [data];
      setPreview(apis);
      setImportMode('json');
      return;
    } catch {}

    // Otherwise parse as CSV
    const parsed = parseCSV(text);
    setPreview(parsed);
    setImportMode('csv');
  };

  const handleImport = () => {
    if (preview.length === 0) {
      alert('No valid data to import');
      return;
    }
    onImport(preview);
    setImportText('');
    setPreview([]);
    onClose();
  };

  const downloadTemplate = () => {
    const headers = [
      'name', 'category', 'status', 'description', 'baseUrlProd', 'docsUrl',
      'authMethod', 'envProd', 'accountEmail', 'loginUrl', 'accountPassword',
      'apiKeyToken', 'secretLocation', 'tags', 'notes', 'userId', 'username',
      'personalCode', 'passcode', 'loginCredentials', 'monthlyCost'
    ];
    const example = [
      'OpenAI API', 'ai-ml', 'active', 'GPT-4 for AI analysis', 'https://api.openai.com/v1',
      'https://platform.openai.com/docs', 'Bearer API key', 'OPENAI_API_KEY',
      'your@email.com', 'https://platform.openai.com', '', '', '1Password',
      'critical; paid', 'Rate limits apply', '', '', '', '', '', '$20'
    ];

    const csv = headers.join(',') + '\n' + example.map(v =>
      v.includes(',') || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v
    ).join(',');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cluesvault-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="editor-backdrop show">
      <div className="editor-panel bulk-import-panel">
        <div className="editor-header">
          <h2>📥 Bulk Import APIs</h2>
          <button className="editor-close" onClick={onClose}>&times;</button>
        </div>

        <div className="bulk-import-content">
          <div className="import-instructions">
            <p><strong>Import multiple APIs at once!</strong></p>
            <p className="hint">Upload a CSV/JSON file or paste data directly below.</p>
          </div>

          <div className="import-actions">
            <button
              className="btn-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              📁 Upload CSV/JSON File
            </button>
            <button
              className="btn-secondary"
              onClick={downloadTemplate}
            >
              📋 Download Template
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div className="field-group">
            <label>Or paste CSV/JSON data here:</label>
            <textarea
              value={importText}
              onChange={handleTextChange}
              placeholder={`Paste CSV format:
name,category,status,description,loginUrl,accountEmail,accountPassword
OpenAI,ai-ml,active,GPT-4 API,https://platform.openai.com,me@email.com,mypass123
Stripe,financial,active,Payments,https://dashboard.stripe.com,me@email.com,pass456

Or JSON format:
[{"name":"OpenAI","category":"ai-ml","status":"active"}]`}
              rows={8}
            />
          </div>

          {preview.length > 0 && (
            <div className="import-preview">
              <h3>Preview ({preview.length} items to import):</h3>
              <div className="preview-list">
                {preview.slice(0, 10).map((api, idx) => (
                  <div key={idx} className="preview-item">
                    <span className="preview-name">{api.name}</span>
                    <span className="preview-cat">{api.category || 'Uncategorized'}</span>
                    <span className="preview-status">{api.status || 'active'}</span>
                  </div>
                ))}
                {preview.length > 10 && (
                  <div className="preview-more">...and {preview.length - 10} more</div>
                )}
              </div>
            </div>
          )}

          <div className="category-help">
            <p className="hint"><strong>Available category IDs:</strong></p>
            <div className="category-list-mini">
              {categories.map(cat => (
                <span key={cat.id} className="cat-hint">{cat.icon} {cat.id}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="editor-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            onClick={handleImport}
            disabled={preview.length === 0}
          >
            Import {preview.length} APIs
          </button>
        </div>
      </div>
    </div>
  );
}
