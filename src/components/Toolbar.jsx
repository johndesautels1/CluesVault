import { exportJSON, exportCSV, exportJS, exportPython } from '../utils/storage';

export default function Toolbar({
  search,
  setSearch,
  productFilter,
  setProductFilter,
  statusFilter,
  setStatusFilter,
  products,
  onNewAPI,
  onImport,
  onBulkImport,
  onManageProducts,
  onSettings,
  syncStatus,
  apiData
}) {
  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'syncing': return '⏳';
      case 'synced': return '✅';
      case 'connected': return '☁️';
      case 'error': return '❌';
      default: return '📴';
    }
  };
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (!Array.isArray(parsed)) {
            alert('Imported JSON must be an array of API objects.');
            return;
          }
          onImport(parsed);
        } catch (err) {
          console.error('Error parsing imported JSON', err);
          alert('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="toolbar-glass">
      <div className="toolbar">
        <input
          type="text"
          placeholder="🔍 Search by name, tag, description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
          <option value="">All Products</option>
          {products.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">✅ Active</option>
          <option value="testing">🧪 Testing</option>
          <option value="deprecated">⚠️ Deprecated</option>
        </select>

        <div className="toolbar-divider"></div>

        <button onClick={onNewAPI} className="btn-accent">＋ New API</button>
        <button onClick={onBulkImport} className="btn-bulk">📥 Bulk Import</button>
        <button onClick={onManageProducts} className="btn-manage">📦 Products</button>

        <div className="toolbar-divider"></div>

        <div className="export-group">
          <button onClick={() => exportJSON(apiData)} title="Export as JSON">JSON</button>
          <button onClick={() => exportCSV(apiData)} title="Export as CSV">CSV</button>
          <button onClick={() => exportJS(apiData)} title="Export as JavaScript">JS</button>
          <button onClick={() => exportPython(apiData)} title="Export as Python">PY</button>
          <button onClick={handleImportClick} title="Import JSON file">📤</button>
        </div>

        <div className="toolbar-divider"></div>

        <button onClick={onSettings} className="btn-settings" title="Settings & Cloud Sync">
          {getSyncIcon()} Settings
        </button>
      </div>
    </div>
  );
}
