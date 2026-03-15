import { useEffect, useState } from "react";

function App() {
  const [heroes, setHeroes] = useState([]);
  const [randomHero, setRandomHero] = useState(null);

  useEffect(() => {
    fetch("https://hots-random-api.onrender.com/heroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

  const getRandomHero = () => {
    fetch("https://hots-random-api.onrender.com/heroes/random")
      .then((res) => res.json())
      .then((data) => setRandomHero(data));
  };

  return (
    <div>
      <h1>HOTS Random Hero</h1>

      <button onClick={getRandomHero}>🎲 Random Hero</button>

      {randomHero && (
        <div>
          <img src={randomHero.img_path} />
          <h3>{randomHero.name}</h3>
          <p>{randomHero.role}</p>
          <a href={randomHero.url}>Build Guide</a>
        </div>
        // <div>
        //   <h2>{randomHero.name}</h2>
        //   <p>{randomHero.role}</p>
        //   <p>{randomHero.universe}</p>
        // </div>
      )}

      <h2>All Heroes</h2>

      {heroes.map((hero) => (
        <div key={hero.id}>
          {hero.name} - {hero.role}
        </div>
      ))}
    </div>
  );
}

export default App;
