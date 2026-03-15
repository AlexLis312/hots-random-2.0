import { useState } from "react";

const backendUrl = "https://hots-random-api.onrender.com";

export default function App() {
  const [role, setRole] = useState("");
  const [universe, setUniverse] = useState("");
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const getRandomHero = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (role) params.append("role", role);
    if (universe) params.append("universe", universe);

    try {
      const res = await fetch(`${backendUrl}/heroes/random?${params}`);
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        alert(errorData.message || "Error fetching hero");
        return;
      }
      const data = await res.json();
      setHero(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching hero");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setRole("");
    setUniverse("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>🎲 Random Hero</h1>

      {/* Фильтры */}
      <div style={{ marginBottom: "10px" }}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Any Role</option>
          <option value="tank">Tank</option>
          <option value="bruiser">Bruiser</option>
          <option value="support">Support</option>
          <option value="healer">Healer</option>
          <option value="dd">Damage</option>
        </select>

        <select
          value={universe}
          onChange={(e) => setUniverse(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Any Universe</option>
          <option value="warcraft">Warcraft</option>
          <option value="diablo">Diablo</option>
          <option value="starcraft">StarCraft</option>
          <option value="overwatch">Overwatch</option>
          <option value="nexus">Nexus</option>
        </select>
      </div>

      {/* Кнопки */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={getRandomHero} disabled={loading}>
          {loading ? "Loading..." : "🎲 Get Random Hero"}
        </button>
        <button onClick={resetFilters} style={{ marginLeft: "10px" }}>
          Reset Filters
        </button>
        <button onClick={getAllRandomHero} style={{ marginLeft: "10px" }}>
          All Random
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
          <p>{hero.role}</p>
          <a href={hero.url} target="_blank" rel="noopener noreferrer">
            Build Guide
          </a>
        </div>
      )}
    </div>
  );
}
