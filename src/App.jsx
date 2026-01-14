import { useState, useEffect, useMemo } from 'react';
import AuthModal from './components/AuthModal';
import Toolbar from './components/Toolbar';
import AlphabetNav from './components/AlphabetNav';
import APICard from './components/APICard';
import APIEditor from './components/APIEditor';
import Footer from './components/Footer';
import { loadAPIData, saveAPIData } from './utils/storage';
import './index.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [alphaFilter, setAlphaFilter] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentAPI, setCurrentAPI] = useState(null);

  // Load API data on mount
  useEffect(() => {
    if (isAuthenticated) {
      const data = loadAPIData();
      setApiData(data);
    }
  }, [isAuthenticated]);

  // Save API data whenever it changes
  useEffect(() => {
    if (isAuthenticated && apiData.length > 0) {
      saveAPIData(apiData);
    }
  }, [apiData, isAuthenticated]);

  // Extract unique products and categories for filters
  const { products, categories } = useMemo(() => {
    const productSet = new Set();
    const categorySet = new Set();
    
    apiData.forEach(api => {
      (api.products || []).forEach(p => productSet.add(p));
      if (api.category) categorySet.add(api.category);
    });
    
    return {
      products: Array.from(productSet).sort(),
      categories: Array.from(categorySet).sort()
    };
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

  if (!isAuthenticated) {
    return <AuthModal onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <header>
        <div className="title-block">
          <h1>CluesVault</h1>
          <div className="subtitle">
            Central API vault for CLUES Core, CLUES: QI, CLUES: Valiant, CLUES: TES, Heart-Recovery_Calendar & Olivia-Chatbot.
          </div>
          <div className="brand-tagline">
            John E. Desautels & Associates · CLUES™ · Stop Guessing — Start Living
          </div>
        </div>
      </header>

      <Toolbar
        search={search}
        setSearch={setSearch}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        products={products}
        categories={categories}
        onNewAPI={handleNewAPI}
        onImport={handleImport}
        apiData={apiData}
      />

      <AlphabetNav 
        activeFilter={alphaFilter}
        setActiveFilter={setAlphaFilter}
      />

      <div className="grid">
        {filteredAPIs.map(api => (
          <APICard
            key={api.apiId}
            api={api}
            onEdit={() => handleEditAPI(api)}
            onDelete={() => handleDeleteAPI(api)}
          />
        ))}
      </div>

      {filteredAPIs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
          No APIs match your filters. Try adjusting your search or filters.
        </div>
      )}

      <APIEditor
        api={currentAPI}
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        onSave={handleSaveAPI}
      />

      <Footer />
    </>
  );
}
