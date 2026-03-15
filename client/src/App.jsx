import { useState } from "react";

function App() {
  const backendUrl = "https://hots-random-api.onrender.com";
  const [role, setRole] = useState("");
  const [universe, setUniverse] = useState("");
  const [hero, setHero] = useState(null);
  // const [heroes, setHeroes] = useState([]);
  // const [randomHero, setRandomHero] = useState(null);

  // useEffect(() => {
  //   fetch("https://hots-random-api.onrender.com/heroes")
  //     .then((res) => res.json())
  //     .then((data) => setHeroes(data));
  // }, []);

  const getRandomHero = async () => {
    const params = new URLSearchParams();

    if (role) params.append("role", role);
    if (universe) params.append("universe", universe);

    const res = await fetch(`https://hots-random-api.onrender.com/random?${params}`);

    const data = await res.json();
    setHero(data);
  };

  // const getRandomHero = () => {
  //   fetch("https://hots-random-api.onrender.com/heroes/random")
  //     .then((res) => res.json())
  //     .then((data) => setRandomHero(data));
  // };

  return (
    <div>
      <h1>HOTS Random Hero</h1>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Any Role</option>
        <option value="tank">Tank</option>
        <option value="healer">Healer</option>
        <option value="dd">Damage</option>
      </select>

      <select onChange={(e) => setUniverse(e.target.value)}>
        <option value="">Any Universe</option>
        <option value="warcraft">Warcraft</option>
        <option value="diablo">Diablo</option>
        <option value="starcraft">StarCraft</option>
        <option value="overwatch">Overwatch</option>
      </select>

      <button onClick={getRandomHero}>🎲 Random Hero</button>

      {hero && (
        <div>
          <img
            src={`${backendUrl}${hero.img_path}`}
            alt={hero.name}
            style={{ maxWidth: "200px" }}
          />
          <h3>{hero.name}</h3>
          <p>{hero.role}</p>
          <a href={hero.url} target="_blank" rel="noopener noreferrer">
            Build Guide
          </a>
        </div>
      )}

      {/* <h2>All Heroes</h2>

      {heroes.map((hero) => (
        <div key={hero.id}>
          {hero.name} - {hero.role}
        </div>
      ))} */}
    </div>
  );
}

export default App;
