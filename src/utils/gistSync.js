// GitHub Gist Sync for CluesVault
// Stores and retrieves vault data from a private GitHub Gist

const GIST_TOKEN_KEY = 'cluesvault_github_token';
const GIST_ID_KEY = 'cluesvault_gist_id';
const GIST_FILENAME = 'cluesvault-data.json';

// Get stored GitHub token
export function getGitHubToken() {
  return localStorage.getItem(GIST_TOKEN_KEY);
}

// Save GitHub token
export function saveGitHubToken(token) {
  localStorage.setItem(GIST_TOKEN_KEY, token);
}

// Remove GitHub token
export function removeGitHubToken() {
  localStorage.removeItem(GIST_TOKEN_KEY);
  localStorage.removeItem(GIST_ID_KEY);
}

// Get stored Gist ID
export function getGistId() {
  return localStorage.getItem(GIST_ID_KEY);
}

// Save Gist ID
export function saveGistId(id) {
  localStorage.setItem(GIST_ID_KEY, id);
}

// Validate GitHub token by fetching user info
export async function validateToken(token) {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (response.ok) {
      const user = await response.json();
      return { valid: true, username: user.login };
    }
    return { valid: false, error: 'Invalid token' };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Find existing CluesVault gist
export async function findExistingGist(token) {
  try {
    const response = await fetch('https://api.github.com/gists', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch gists');
    }

    const gists = await response.json();

    // Find a gist with our filename
    const existingGist = gists.find(gist =>
      gist.files && gist.files[GIST_FILENAME]
    );

    return existingGist ? existingGist.id : null;
  } catch (error) {
    console.error('Error finding gist:', error);
    return null;
  }
}

// Create a new private gist
export async function createGist(token, data) {
  try {
    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: 'CluesVault - Secure API & Credentials Registry Backup',
        public: false,
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(data, null, 2)
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create gist');
    }

    const gist = await response.json();
    saveGistId(gist.id);
    return { success: true, gistId: gist.id };
  } catch (error) {
    console.error('Error creating gist:', error);
    return { success: false, error: error.message };
  }
}

// Update existing gist
export async function updateGist(token, gistId, data) {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(data, null, 2)
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update gist');
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating gist:', error);
    return { success: false, error: error.message };
  }
}

// Load data from gist
export async function loadFromGist(token, gistId) {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load gist');
    }

    const gist = await response.json();

    if (!gist.files || !gist.files[GIST_FILENAME]) {
      throw new Error('Gist does not contain CluesVault data');
    }

    const content = gist.files[GIST_FILENAME].content;
    const data = JSON.parse(content);

    return { success: true, data };
  } catch (error) {
    console.error('Error loading from gist:', error);
    return { success: false, error: error.message };
  }
}

// Main sync function - saves all vault data to gist
export async function syncToGist(token, vaultData) {
  let gistId = getGistId();

  // If no gist ID, try to find existing one
  if (!gistId) {
    gistId = await findExistingGist(token);
    if (gistId) {
      saveGistId(gistId);
    }
  }

  // Create or update gist
  if (gistId) {
    return await updateGist(token, gistId, vaultData);
  } else {
    return await createGist(token, vaultData);
  }
}

// Main load function - loads all vault data from gist
export async function loadFromCloud(token) {
  let gistId = getGistId();

  // If no gist ID, try to find existing one
  if (!gistId) {
    gistId = await findExistingGist(token);
    if (gistId) {
      saveGistId(gistId);
    }
  }

  if (!gistId) {
    return { success: false, error: 'No cloud backup found' };
  }

  return await loadFromGist(token, gistId);
}
