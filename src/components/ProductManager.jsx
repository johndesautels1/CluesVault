import { useState } from 'react';

export default function ProductManager({ isOpen, onClose, products, onSave }) {
  const [editedProducts, setEditedProducts] = useState(products);
  const [newProduct, setNewProduct] = useState('');

  const handleAdd = () => {
    if (!newProduct.trim()) {
      alert('Please enter a product name');
      return;
    }

    if (editedProducts.includes(newProduct.trim())) {
      alert('Product already exists');
      return;
    }

    setEditedProducts([...editedProducts, newProduct.trim()].sort());
    setNewProduct('');
  };

  const handleDelete = (product) => {
    if (confirm(`Delete "${product}"? APIs using it will lose this product tag.`)) {
      setEditedProducts(editedProducts.filter(p => p !== product));
    }
  };

  const handleSave = () => {
    onSave(editedProducts);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="editor-backdrop show">
      <div className="editor-panel">
        <div className="editor-header">
          <h2>📦 Manage Products</h2>
          <button className="editor-close" onClick={onClose}>&times;</button>
        </div>

        <div className="category-manager-content">
          <p className="hint" style={{ marginBottom: '12px' }}>
            Products are the applications/systems that use your APIs. Add your own products here.
          </p>

          <div className="category-list">
            {editedProducts.map((product, idx) => (
              <div key={idx} className="category-item">
                <span className="cat-icon">📦</span>
                <span className="cat-name">{product}</span>
                <button
                  className="cat-delete"
                  onClick={() => handleDelete(product)}
                  title="Delete product"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="section-divider">
            <div className="section-header">Add New Product</div>
          </div>

          <div className="add-category-form">
            <div className="field-group" style={{ flex: 1 }}>
              <label>Product Name</label>
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="e.g., My New App"
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
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
            Save Products
          </button>
        </div>
      </div>
    </div>
  );
}
