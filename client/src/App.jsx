import { useEffect, useState } from "react";

function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch("https://hots-random-api.onrender.com/heroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

  return (
    <div>
      <h1>HOTS Random Heroes</h1>

      {heroes.map((hero) => (
        <div key={hero.id}>
          <h3>{hero.name}</h3>
          <p>{hero.role}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
