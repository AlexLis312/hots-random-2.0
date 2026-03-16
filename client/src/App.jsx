import { useState, useEffect } from "react";

const backendUrl = "https://hots-random-api.onrender.com";

export default function App() {
  const [hero, setHero] = useState(null);
  const [heroes, setHeroes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загрузка всех героев
  useEffect(() => {
    fetch(`${backendUrl}/heroes`)
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error(err));
  }, []);

  // Клик по герою для выбора/снятия
  const toggleHero = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  };

  // Pool Random
  const getRandomFromPool = async () => {
    if (selected.length === 0) {
      alert("Select heroes first!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/heroes/random/pool`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selected }),
      });
      if (!res.ok) throw new Error("Failed to fetch from pool");
      const data = await res.json();
      setHero(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching hero from pool");
    } finally {
      setLoading(false);
    }
  };

  // Full Random
  const getAllRandomHero = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/heroes/random/all`);
      if (!res.ok) throw new Error("Failed to fetch hero");
      const data = await res.json();
      setHero(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching hero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1>🎲 Random Hero Picker</h1>

      {/* Кнопки */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={getAllRandomHero} disabled={loading}>
          {loading ? "Loading..." : "🎲 Full Random"}
        </button>
        <button onClick={getRandomFromPool} disabled={loading} style={{ marginLeft: "10px" }}>
          {loading ? "Loading..." : "🎯 Pool Random"}
        </button>
      </div>

      {/* Результат */}
      {hero && (
        <div
          style={{
            border: "2px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {hero?.img_path && (
            <img
              src={`${backendUrl}${hero.img_path}`}
              alt={hero.name}
              style={{ maxWidth: "150px", borderRadius: "8px" }}
            />
          )}
          <h3>{hero.name}</h3>
          <p>{hero.role}</p>
          <a href={hero.url} target="_blank" rel="noopener noreferrer">
            Build Guide
          </a>
        </div>
      )}

      {/* Hero Picker */}
      <h3>Select Heroes for Pool</h3>
      <p>Selected: {selected.length}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: "10px",
          justifyItems: "center",
        }}
      >
        {heroes.map((h) => (
          <div
            key={h.id}
            onClick={() => toggleHero(h.id)}
            style={{
              border: selected.includes(h.id) ? "3px solid #00f" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px",
              cursor: "pointer",
              width: "100px",
              textAlign: "center",
              transition: "all 0.2s",
            }}
          >
            {h.img_path ? (
              <img
                src={`${backendUrl}${h.img_path}`}
                alt={h.name}
                style={{ width: "80px", borderRadius: "6px" }}
              />
            ) : (
              <div style={{ width: "80px", height: "80px", background: "#eee" }} />
            )}
            <div style={{ fontSize: "12px", marginTop: "5px" }}>{h.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
