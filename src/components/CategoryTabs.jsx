export default function CategoryTabs({ categories, activeCategory, setActiveCategory, onManageCategories }) {
  // Sort categories alphabetically by name
  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="category-tabs-container">
      <div className="category-tabs-grid">
        <button
          className={`category-tab ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => setActiveCategory('')}
        >
          📋 All
        </button>
        {sortedCategories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
        <button
          className="category-tab manage-btn"
          onClick={onManageCategories}
          title="Add or edit categories"
        >
          ⚙️ Manage
        </button>
      </div>
    </div>
  );
}
