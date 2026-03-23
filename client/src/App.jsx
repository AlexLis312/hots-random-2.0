import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase.js";

const backendUrl = "https://hots-random-api.onrender.com";

export default function App() {
  const [search, setSearch] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [role, setRole] = useState("");
  const [universe, setUniverse] = useState("");
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

  useEffect(() => {
    if (!search) {
      setFilteredHeroes(heroes);
      return;
    }

    const filtered = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredHeroes(filtered);
  }, [search, heroes]);

  // Клик по герою для выбора/снятия
  const toggleHero = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  };

  // role/univers Random
  const getFilteredRandomHero = async (role, universe) => {
    setLoading(true);
    try {
      let query = supabase.from("heroes").select("*");

      // фильтр по роли
      if (role) {
        query = query.eq("role", role);
      }

      // фильтр по вселенной
      if (universe) {
        query = query.eq("universe", universe);
      }

      const { data, error } = await query;

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("No heroes found");

      const randomHero = data[Math.floor(Math.random() * data.length)];
      setHero(randomHero);
    } catch (err) {
      console.error(err);
      alert("Error fetching hero");
    } finally {
      setLoading(false);
    }
  };

  // Pool Random
  const getRandomFromPool = async () => {
    if (selected.length === 0) {
      alert("Select heroes first!");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.from("heroes").select("*").in("id", selected);

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("No heroes found");

      const randomHero = data[Math.floor(Math.random() * data.length)];

      setHero(randomHero);
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
      {/* Фильтр */}
      <input
        type="text"
        placeholder="Search hero..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Выбор */}
      <div>
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">All Roles</option>
          <option value="tank">Tank</option>
          <option value="dd">Damage</option>
          <option value="heal">Heal</option>
          <option value="bruiser">Bruiser</option>
          <option value="support">Support</option>
        </select>

        <select onChange={(e) => setUniverse(e.target.value)}>
          <option value="">All Universes</option>
          <option value="warcraft">Warcraft</option>
          <option value="diablo">Diablo</option>
          <option value="starcraft">StarCraft</option>
          <option value="overwatch">OverWatch</option>
          <option value="nexus">Nexus</option>
        </select>
      </div>

      {/* Кнопки */}
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{ color: "black" }}
          onClick={() => getFilteredRandomHero(role, universe)}
          disabled={loading}
        >
          {loading ? "Loading..." : "🎯 Filtered Random"}
        </button>
        <br />
        <button style={{ color: "black" }} onClick={getAllRandomHero} disabled={loading}>
          {loading ? "Loading..." : "🎲 Full Random"}
        </button>
        <br />
        <button
          style={{ color: "black", marginLeft: "10px" }}
          onClick={getRandomFromPool}
          disabled={loading}
        >
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
          <a href={hero.url} target="_blank" rel="noopener noreferrer">
            Build Guide
          </a>
        </div>
      )}

      {/* pool/filter */}
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
        {(search ? filteredHeroes : heroes).map((h) => (
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
