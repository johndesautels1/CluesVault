import { useState, useEffect } from 'react';

export default function APIEditor({ api, isOpen, onClose, onSave, categories = [], products = [] }) {
  const [formData, setFormData] = useState({
    apiId: '',
    name: '',
    status: 'active',
    products: [],
    category: '',
    description: '',
    baseUrlProd: '',
    docsUrl: '',
    authMethod: '',
    envProd: '',
    envDev: '',
    accountEmail: '',
    loginUrl: '',
    accountPassword: '',
    apiKeyToken: '',
    tokenPortalUrl: '',
    tokenLastRotated: '',
    secretLocation: '',
    tags: [],
    notes: '',
    // NEW CREDENTIAL FIELDS
    userId: '',
    username: '',
    personalCode: '',
    passcode: '',
    loginCredentials: ''
  });

  useEffect(() => {
    if (api) {
      setFormData({
        ...api,
        tags: Array.isArray(api.tags) ? api.tags : [],
        products: Array.isArray(api.products) ? api.products : []
      });
    } else {
      // Reset for new API
      setFormData({
        apiId: '',
        name: '',
        status: 'active',
        products: [],
        category: '',
        description: '',
        baseUrlProd: '',
        docsUrl: '',
        authMethod: '',
        envProd: '',
        envDev: '',
        accountEmail: '',
        loginUrl: '',
        accountPassword: '',
        apiKeyToken: '',
        tokenPortalUrl: '',
        tokenLastRotated: '',
        secretLocation: '',
        tags: [],
        notes: '',
        userId: '',
        username: '',
        personalCode: '',
        passcode: '',
        loginCredentials: ''
      });
    }
  }, [api, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'products') {
      const product = value;
      setFormData(prev => ({
        ...prev,
        products: checked
          ? [...prev.products, product]
          : prev.products.filter(p => p !== product)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate apiId from name if not provided
    const apiId = formData.apiId || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Parse tags
    const tags = formData.tags
      ? (typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags)
      : [];
    
    const apiData = {
      ...formData,
      apiId,
      tags
    };
    
    onSave(apiData);
  };

  if (!isOpen) return null;

  return (
    <div className={`editor-backdrop ${isOpen ? 'show' : ''}`}>
      <div className="editor-panel">
        <div className="editor-header">
          <h2>{api ? 'Edit API' : 'New API'}</h2>
          <button className="editor-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="field-group">
            <label htmlFor="name">API Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="apiId">
              Internal ID <span className="hint">(optional – auto from name if empty)</span>
            </label>
            <input
              type="text"
              id="apiId"
              name="apiId"
              value={formData.apiId}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="testing">Testing</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>

          <div className="field-group">
            <label>Products using this API</label>
            <div className="products-row">
              {products.map(product => (
                <label key={product}>
                  <input
                    type="checkbox"
                    name="products"
                    value={product}
                    checked={formData.products.includes(product)}
                    onChange={handleChange}
                  />
                  {product}
                </label>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="description">Description (what this API pulls/does)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What data this API pulls, how CLUES uses it, and any key roles."
            />
          </div>

          {/* API Configuration */}
          <div className="field-group">
            <label htmlFor="baseUrlProd">Base URL (prod)</label>
            <input
              type="text"
              id="baseUrlProd"
              name="baseUrlProd"
              value={formData.baseUrlProd}
              onChange={handleChange}
              placeholder="https://api.example.com/v1"
            />
          </div>

          <div className="field-group">
            <label htmlFor="docsUrl">Docs URL</label>
            <input
              type="text"
              id="docsUrl"
              name="docsUrl"
              value={formData.docsUrl}
              onChange={handleChange}
              placeholder="https://developer.example.com/docs"
            />
          </div>

          <div className="field-group">
            <label htmlFor="authMethod">Auth method</label>
            <input
              type="text"
              id="authMethod"
              name="authMethod"
              value={formData.authMethod}
              onChange={handleChange}
              placeholder="Bearer API key, OAuth2, etc."
            />
          </div>

          <div className="field-group">
            <label htmlFor="envProd">Env var (prod)</label>
            <input
              type="text"
              id="envProd"
              name="envProd"
              value={formData.envProd}
              onChange={handleChange}
              placeholder="E.g. OPENAI_API_KEY"
            />
          </div>

          <div className="field-group">
            <label htmlFor="envDev">Env var (dev)</label>
            <input
              type="text"
              id="envDev"
              name="envDev"
              value={formData.envDev}
              onChange={handleChange}
              placeholder="Optional dev key env var"
            />
          </div>

          {/* Account Information */}
          <div className="section-divider">
            <div className="section-header">Account Information</div>
          </div>

          <div className="field-group">
            <label htmlFor="accountEmail">Account email</label>
            <input
              type="email"
              id="accountEmail"
              name="accountEmail"
              value={formData.accountEmail}
              onChange={handleChange}
              placeholder="Login email for this provider"
            />
          </div>

          <div className="field-group">
            <label htmlFor="loginUrl">Login portal URL</label>
            <input
              type="text"
              id="loginUrl"
              name="loginUrl"
              value={formData.loginUrl}
              onChange={handleChange}
              placeholder="https://provider.com/login or console URL"
            />
          </div>

          <div className="field-group">
            <label htmlFor="accountPassword">Login password / hint</label>
            <input
              type="text"
              id="accountPassword"
              name="accountPassword"
              value={formData.accountPassword}
              onChange={handleChange}
              placeholder="Optional – consider storing full password in a password manager instead."
            />
          </div>

          {/* NEW CREDENTIALS SECTION */}
          <div className="section-divider">
            <div className="section-header">Login Credentials</div>
          </div>

          <div className="field-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="User ID for this service"
            />
          </div>

          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username for login"
            />
          </div>

          <div className="field-group">
            <label htmlFor="personalCode">Personal / Customer Code</label>
            <input
              type="text"
              id="personalCode"
              name="personalCode"
              value={formData.personalCode}
              onChange={handleChange}
              placeholder="Personal or customer identification code"
            />
          </div>

          <div className="field-group">
            <label htmlFor="passcode">Passcode / PIN</label>
            <input
              type="text"
              id="passcode"
              name="passcode"
              value={formData.passcode}
              onChange={handleChange}
              placeholder="Passcode or PIN (stored locally only)"
            />
          </div>

          <div className="field-group">
            <label htmlFor="loginCredentials">Combined Login Credentials</label>
            <textarea
              id="loginCredentials"
              name="loginCredentials"
              value={formData.loginCredentials}
              onChange={handleChange}
              placeholder="Additional login information, notes, or combined credentials"
            />
          </div>

          {/* API Keys & Tokens */}
          <div className="section-divider">
            <div className="section-header">API Keys & Tokens</div>
          </div>

          <div className="field-group">
            <label htmlFor="apiKeyToken">API key / token</label>
            <input
              type="text"
              id="apiKeyToken"
              name="apiKeyToken"
              value={formData.apiKeyToken}
              onChange={handleChange}
              placeholder="Optional – stored locally on this device/app only."
            />
            <div className="hint">
              Security note: this vault is local-only and not synced. For maximum safety, keep real keys in 1Password and store only references here.
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="tokenPortalUrl">Token / keys page URL</label>
            <input
              type="text"
              id="tokenPortalUrl"
              name="tokenPortalUrl"
              value={formData.tokenPortalUrl}
              onChange={handleChange}
              placeholder="Direct link to where you generate/rotate keys."
            />
          </div>

          <div className="field-group">
            <label htmlFor="tokenLastRotated">Token last rotated</label>
            <input
              type="date"
              id="tokenLastRotated"
              name="tokenLastRotated"
              value={formData.tokenLastRotated}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="secretLocation">Secret stored in</label>
            <input
              type="text"
              id="secretLocation"
              name="secretLocation"
              value={formData.secretLocation}
              onChange={handleChange}
              placeholder="1Password, Vercel env vars, etc."
            />
          </div>

          {/* Additional Information */}
          <div className="section-divider">
            <div className="section-header">Additional Information</div>
          </div>

          <div className="field-group">
            <label htmlFor="tags">
              Tags <span className="hint">(comma separated, e.g. critical, paid, external)</span>
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Rate limits, ToS gotchas, backup plan, risk level, etc."
            />
          </div>

          {/* Form Actions */}
          <div className="editor-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save API
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}