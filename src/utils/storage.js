import { STORAGE_KEY, AUTH_KEY, CATEGORIES_KEY, PRODUCTS_KEY, DEFAULT_APIS, DEFAULT_CATEGORIES, PRODUCTS } from '../data';

// SHA-256 hash function
export async function hashString(str) {
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Load API data from localStorage
export function loadAPIData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_APIS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid data format');
    }
    return parsed;
  } catch (e) {
    console.error('Error loading API data:', e);
    return DEFAULT_APIS;
  }
}

// Save API data to localStorage
export function saveAPIData(apiData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apiData));
    return true;
  } catch (e) {
    console.error('Error saving API data:', e);
    return false;
  }
}

// Load auth credentials from localStorage
export function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error loading auth:', e);
    return null;
  }
}

// Save auth credentials to localStorage
export function saveAuth(email, hash) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, hash }));
    return true;
  } catch (e) {
    console.error('Error saving auth:', e);
    return false;
  }
}

// Load categories from localStorage
export function loadCategories() {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      return DEFAULT_CATEGORIES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return DEFAULT_CATEGORIES;
    }
    return parsed;
  } catch (e) {
    console.error('Error loading categories:', e);
    return DEFAULT_CATEGORIES;
  }
}

// Save categories to localStorage
export function saveCategories(categories) {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    return true;
  } catch (e) {
    console.error('Error saving categories:', e);
    return false;
  }
}

// Load products from localStorage
export function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      return PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return PRODUCTS;
    }
    return parsed;
  } catch (e) {
    console.error('Error loading products:', e);
    return PRODUCTS;
  }
}

// Save products to localStorage
export function saveProducts(products) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return true;
  } catch (e) {
    console.error('Error saving products:', e);
    return false;
  }
}

// Parse CSV for bulk import
export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const apis = [];

  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const api = {};
    headers.forEach((header, idx) => {
      let value = values[idx] || '';
      // Handle array fields
      if (['products', 'tags'].includes(header) && value) {
        api[header] = value.split(';').map(v => v.trim()).filter(Boolean);
      } else {
        api[header] = value;
      }
    });

    // Generate apiId if not present
    if (!api.apiId && api.name) {
      api.apiId = api.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (api.name) {
      apis.push(api);
    }
  }

  return apis;
}

// Export functions
export function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportJSON(apiData) {
  const json = JSON.stringify(apiData, null, 2);
  downloadFile('cluesvault-api-registry.json', json, 'application/json');
}

export function exportCSV(apiData) {
  const headers = [
    'apiId', 'name', 'status', 'products', 'category', 'description',
    'baseUrlProd', 'docsUrl', 'authMethod', 'envProd', 'envDev',
    'accountEmail', 'loginUrl', 'accountPassword', 'apiKeyToken',
    'tokenPortalUrl', 'tokenLastRotated', 'secretLocation', 'tags', 'notes',
    'userId', 'username', 'personalCode', 'passcode', 'loginCredentials'
  ];
  const rows = [headers.join(',')];
  
  apiData.forEach(api => {
    const row = headers.map(h => {
      let val = api[h];
      if (Array.isArray(val)) val = val.join('; ');
      if (val == null) val = '';
      val = String(val).replace(/"/g, '""');
      if (val.search(/[" ,\n]/) >= 0) {
        val = '"' + val + '"';
      }
      return val;
    });
    rows.push(row.join(','));
  });
  
  const csv = rows.join('\n');
  downloadFile('cluesvault-api-registry.csv', csv, 'text/csv');
}

export function exportJS(apiData) {
  const json = JSON.stringify(apiData, null, 2);
  const js = `export const CLUES_APIS = ${json};\n\nexport default CLUES_APIS;\n`;
  downloadFile('cluesvault-apis.js', js, 'application/javascript');
}

export function exportPython(apiData) {
  const json = JSON.stringify(apiData, null, 2);
  const escaped = json.replace(/'/g, "\\'");
  const py = `APIS_JSON = '''
${escaped}
'''

import json
APIS = json.loads(APIS_JSON)
`;
  downloadFile('cluesvault_apis.py', py, 'text/x-python');
}

// Get status class name
export function getStatusClass(status) {
  switch ((status || '').toLowerCase()) {
    case 'active': return 'status-active';
    case 'testing': return 'status-testing';
    case 'deprecated': return 'status-deprecated';
    default: return 'status-active';
  }
}
