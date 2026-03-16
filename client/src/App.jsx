import { useState, useEffect } from "react";

const backendUrl = "https://hots-random-api.onrender.com";

export default function App() {
  const [hero, setHero] = useState(null);
  const [heroes, setHeroes] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/heroes`)
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

  const toggleHero = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  };

  const getRandomFromPool = async () => {
    if (selected.length === 0) {
      alert("Select heroes first");
      return;
    }
    const res = await fetch(`${backendUrl}/heroes/random/pool`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selected }),
    });

    const data = await res.json();
    setHero(data);
  };

  const getAllRandomHero = async () => {
    try {
      const res = await fetch(`${backendUrl}/heroes/random/all`);
      if (!res.ok) throw new Error("Failed to fetch hero");
      const data = await res.json();
      setHero(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching hero");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>🎲 Random Hero</h1>
      <p>Selected heroes: {selected.length}</p>

      {/* Кнопки */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={getAllRandomHero} style={{ marginLeft: "10px" }}>
          All Random
        </button>
        <button onClick={getRandomFromPool} style={{ marginLeft: "10px" }}>
          Pool Random
        </button>
      </div>

      {/* Результат */}
      {hero && (
        <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <img
            src={`${backendUrl}${hero.img_path}`}
            alt={hero.name}
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
          <h3>{hero.name}</h3>
          <a href={hero.url} target="_blank" rel="noopener noreferrer">
            Build Guide
          </a>
        </div>
      )}
      {heroes.map((h) => (
        <label key={h.id} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selected.includes(h.id)}
            onChange={() => toggleHero(h.id)}
          />
          {h.name}
        </label>
      ))}
    </div>
  );
}
