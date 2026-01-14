export default function CategoryTabs({ categories, activeCategory, setActiveCategory, onManageCategories }) {
  return (
    <div className="category-tabs-container">
      <div className="category-tabs">
        <button
          className={`category-tab ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => setActiveCategory('')}
        >
          📋 All
        </button>
        {categories.map(cat => (
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
