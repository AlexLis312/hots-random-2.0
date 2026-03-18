import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";

export default function App() {
  const [heroes, setHeroes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    async function fetchHeroes() {
      const { data, error } = await supabase.from("heroes").select("*");
      if (error) return console.error(error);
      setHeroes(data || []);
    }

    fetchHeroes();
  }, []);

  const pickRandomHeroFromPool = async () => {
    if (!selected.length) return alert("Select heroes first!");
    const { data, error } = await supabase
      .from("heroes")
      .select("*")
      .in("id", selected.map(Number));
    if (error) return console.error(error);
    setHero(data[Math.floor(Math.random() * data.length)]);
  };

  return (
    <div>
      <button onClick={pickRandomHeroFromPool}>Pool Random</button>
      {hero && <div>{hero.name}</div>}
    </div>
  );
}
