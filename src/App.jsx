import { useState, useEffect, useMemo } from 'react';
import AuthModal from './components/AuthModal';
import Toolbar from './components/Toolbar';
import CategoryTabs from './components/CategoryTabs';
import AlphabetNav from './components/AlphabetNav';
import APICard from './components/APICard';
import APIEditor from './components/APIEditor';
import BulkImport from './components/BulkImport';
import CategoryManager from './components/CategoryManager';
import ProductManager from './components/ProductManager';
import Footer from './components/Footer';
import { loadAPIData, saveAPIData, loadCategories, saveCategories, loadProducts, saveProducts } from './utils/storage';
import './index.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [alphaFilter, setAlphaFilter] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isProductManagerOpen, setIsProductManagerOpen] = useState(false);
  const [currentAPI, setCurrentAPI] = useState(null);

  // Load API data, categories, and products on mount
  useEffect(() => {
    if (isAuthenticated) {
      const data = loadAPIData();
      setApiData(data);
      const cats = loadCategories();
      setCategories(cats);
      const prods = loadProducts();
      setProducts(prods);
    }
  }, [isAuthenticated]);

  // Save API data whenever it changes
  useEffect(() => {
    if (isAuthenticated && apiData.length > 0) {
      saveAPIData(apiData);
    }
  }, [apiData, isAuthenticated]);

  // Save categories whenever they change
  useEffect(() => {
    if (isAuthenticated && categories.length > 0) {
      saveCategories(categories);
    }
  }, [categories, isAuthenticated]);

  // Save products whenever they change
  useEffect(() => {
    if (isAuthenticated && products.length > 0) {
      saveProducts(products);
    }
  }, [products, isAuthenticated]);

  // Get used products for filter dropdown (only show products actually in use)
  const usedProducts = useMemo(() => {
    const productSet = new Set();
    apiData.forEach(api => {
      (api.products || []).forEach(p => productSet.add(p));
    });
    return Array.from(productSet).sort();
  }, [apiData]);

  // Filter and sort API data
  const filteredAPIs = useMemo(() => {
    let filtered = apiData.filter(api => {
      const searchText = (
        (api.name || '') + ' ' +
        (api.category || '') + ' ' +
        (api.description || '') + ' ' +
        (api.notes || '') + ' ' +
        (api.tags || []).join(' ') + ' ' +
        (api.products || []).join(' ')
      ).toLowerCase();

      if (search && !searchText.includes(search.toLowerCase())) return false;
      if (productFilter && !(api.products || []).includes(productFilter)) return false;
      if (categoryFilter && api.category !== categoryFilter) return false;
      if (statusFilter && (api.status || '').toLowerCase() !== statusFilter) return false;

      if (alphaFilter) {
        const firstChar = ((api.name || '').trim().charAt(0) || '').toUpperCase();
        if (alphaFilter === '#') {
          if (firstChar >= 'A' && firstChar <= 'Z') return false;
        } else if (firstChar !== alphaFilter) {
          return false;
        }
      }

      return true;
    });

    // Sort alphabetically by name
    filtered.sort((a, b) => {
      const na = (a.name || '').toLowerCase();
      const nb = (b.name || '').toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      return 0;
    });

    return filtered;
  }, [apiData, search, productFilter, categoryFilter, statusFilter, alphaFilter]);

  const handleNewAPI = () => {
    setCurrentAPI(null);
    setIsEditorOpen(true);
  };

  const handleEditAPI = (api) => {
    setCurrentAPI(api);
    setIsEditorOpen(true);
  };

  const handleDeleteAPI = (api) => {
    if (confirm(`Delete "${api.name}"?`)) {
      setApiData(prev => prev.filter(a => a.apiId !== api.apiId));
    }
  };

  const handleSaveAPI = (apiToSave) => {
    if (currentAPI) {
      // Update existing
      setApiData(prev => prev.map(api =>
        api.apiId === currentAPI.apiId ? apiToSave : api
      ));
    } else {
      // Add new
      setApiData(prev => [...prev, apiToSave]);
    }
    setIsEditorOpen(false);
    setCurrentAPI(null);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setCurrentAPI(null);
  };

  const handleImport = (importedData) => {
    setApiData(importedData);
  };

  const handleBulkImport = (newApis) => {
    // Merge with existing, avoiding duplicates by apiId
    const existingIds = new Set(apiData.map(a => a.apiId));
    const uniqueNewApis = newApis.filter(a => !existingIds.has(a.apiId));
    setApiData(prev => [...prev, ...uniqueNewApis]);
  };

  const handleSaveCategories = (newCategories) => {
    setCategories(newCategories);
  };

  const handleSaveProducts = (newProducts) => {
    setProducts(newProducts);
  };

  // Get category info helper
  const getCategoryInfo = (categoryId) => {
    return categories.find(c => c.id === categoryId) || { icon: '📁', name: categoryId || 'Uncategorized' };
  };

  if (!isAuthenticated) {
    return <AuthModal onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      {/* CLUES Intelligence Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="logo-container">
            <span className="logo-icon">🔐</span>
            <div className="logo-text">
              <h1>CluesVault</h1>
              <span className="logo-subtitle">Secure API & Credentials Registry</span>
            </div>
          </div>
        </div>
        <div className="header-tagline">
          <span className="tagline-main">CLUES Intelligence LTD</span>
          <span className="tagline-sub">Enterprise Security • API Management • Credential Control</span>
        </div>
      </header>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={categoryFilter}
        setActiveCategory={setCategoryFilter}
        onManageCategories={() => setIsCategoryManagerOpen(true)}
      />

      {/* Toolbar */}
      <Toolbar
        search={search}
        setSearch={setSearch}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        products={usedProducts}
        onNewAPI={handleNewAPI}
        onImport={handleImport}
        onBulkImport={() => setIsBulkImportOpen(true)}
        onManageProducts={() => setIsProductManagerOpen(true)}
        apiData={apiData}
      />

      {/* Alphabet Navigation */}
      <AlphabetNav
        activeFilter={alphaFilter}
        setActiveFilter={setAlphaFilter}
      />

      {/* Stats Bar */}
      <div className="stats-bar">
        <span className="stat-item">
          📊 {filteredAPIs.length} of {apiData.length} APIs
          {categoryFilter && ` in ${getCategoryInfo(categoryFilter).icon} ${getCategoryInfo(categoryFilter).name}`}
        </span>
      </div>

      {/* API Cards Grid */}
      <div className="grid">
        {filteredAPIs.map(api => (
          <APICard
            key={api.apiId}
            api={api}
            categoryInfo={getCategoryInfo(api.category)}
            onEdit={() => handleEditAPI(api)}
            onDelete={() => handleDeleteAPI(api)}
          />
        ))}
      </div>

      {filteredAPIs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No APIs match your filters.</p>
          <p className="hint">Try adjusting your search, category, or filters.</p>
        </div>
      )}

      {/* API Editor Modal */}
      <APIEditor
        api={currentAPI}
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        onSave={handleSaveAPI}
        categories={categories}
        products={products}
      />

      {/* Bulk Import Modal */}
      <BulkImport
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onImport={handleBulkImport}
        categories={categories}
      />

      {/* Category Manager Modal */}
      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        onSave={handleSaveCategories}
      />

      {/* Product Manager Modal */}
      <ProductManager
        isOpen={isProductManagerOpen}
        onClose={() => setIsProductManagerOpen(false)}
        products={products}
        onSave={handleSaveProducts}
      />

      {/* Footer */}
      <Footer />
    </>
  );
}
