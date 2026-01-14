import { useState } from 'react';

export default function CategoryManager({ isOpen, onClose, categories, onSave }) {
  const [editedCategories, setEditedCategories] = useState(categories);
  const [newCat, setNewCat] = useState({ id: '', name: '', icon: '📁' });

  const handleAdd = () => {
    if (!newCat.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    const id = newCat.id.trim() || newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editedCategories.some(c => c.id === id)) {
      alert('Category ID already exists');
      return;
    }

    setEditedCategories([...editedCategories, { ...newCat, id }]);
    setNewCat({ id: '', name: '', icon: '📁' });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this category? APIs using it will become uncategorized.')) {
      setEditedCategories(editedCategories.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    onSave(editedCategories);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="editor-backdrop show">
      <div className="editor-panel">
        <div className="editor-header">
          <h2>⚙️ Manage Categories</h2>
          <button className="editor-close" onClick={onClose}>&times;</button>
        </div>

        <div className="category-manager-content">
          <p className="hint" style={{ marginBottom: '12px' }}>
            Add, edit, or remove categories. Changes affect how APIs are organized.
          </p>

          <div className="category-list">
            {editedCategories.map((cat, idx) => (
              <div key={cat.id} className="category-item">
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-id">({cat.id})</span>
                <button
                  className="cat-delete"
                  onClick={() => handleDelete(cat.id)}
                  title="Delete category"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="section-divider">
            <div className="section-header">Add New Category</div>
          </div>

          <div className="add-category-form">
            <div className="field-group">
              <label>Icon (emoji)</label>
              <input
                type="text"
                value={newCat.icon}
                onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
                placeholder="📁"
                maxLength={2}
                style={{ width: '60px' }}
              />
            </div>

            <div className="field-group" style={{ flex: 1 }}>
              <label>Category Name</label>
              <input
                type="text"
                value={newCat.name}
                onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                placeholder="e.g., Cloud Services"
              />
            </div>

            <div className="field-group">
              <label>ID (auto-generated)</label>
              <input
                type="text"
                value={newCat.id || (newCat.name ? newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '')}
                onChange={(e) => setNewCat({ ...newCat, id: e.target.value })}
                placeholder="cloud-services"
              />
            </div>

            <button className="btn-primary add-cat-btn" onClick={handleAdd}>
              + Add
            </button>
          </div>
        </div>

        <div className="editor-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>
            Save Categories
          </button>
        </div>
      </div>
    </div>
  );
}
