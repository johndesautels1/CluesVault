export default function AlphabetNav({ activeFilter, setActiveFilter }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  const handleClick = (letter) => {
    if (activeFilter === letter) {
      setActiveFilter('');
    } else {
      setActiveFilter(letter);
    }
  };

  return (
    <div className="alpha-bar">
      {letters.map(letter => (
        <button
          key={letter}
          className={`alpha-btn ${activeFilter === letter ? 'alpha-active' : ''}`}
          onClick={() => handleClick(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
