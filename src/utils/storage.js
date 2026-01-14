import { STORAGE_KEY, AUTH_KEY, DEFAULT_APIS } from '../data';

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
