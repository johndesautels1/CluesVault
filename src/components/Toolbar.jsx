import { exportJSON, exportCSV, exportJS, exportPython } from '../utils/storage';

export default function Toolbar({
  search,
  setSearch,
  productFilter,
  setProductFilter,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  products,
  categories,
  onNewAPI,
  onImport,
  apiData
}) {
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
          placeholder="Search by name, product, tag…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
          <option value="">Filter by product</option>
          {products.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Filter by category</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Filter by status</option>
          <option value="active">Active</option>
          <option value="testing">Testing</option>
          <option value="deprecated">Deprecated</option>
        </select>
        
        <button onClick={onNewAPI}>＋ New API</button>
        <button onClick={() => exportJSON(apiData)}>Export JSON</button>
        <button onClick={() => exportCSV(apiData)}>Export CSV</button>
        <button onClick={() => exportJS(apiData)}>Export JS</button>
        <button onClick={() => exportPython(apiData)}>Export Python</button>
        <button onClick={handleImportClick}>Import JSON</button>
      </div>
    </div>
  );
}
