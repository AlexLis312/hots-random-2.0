import "./styles/main.scss";
import { useEffect, useMemo, useState } from "react";
import HeroActions from "./components/HeroActions";
import HeroFilters from "./components/HeroFilters";
import HeroGrid from "./components/HeroGrid";
import HeroHeader from "./components/HeroHeader";
import HeroResult from "./components/HeroResult";
import {
  getAllRandomHero,
  getFilteredRandomHero,
  getHeroes,
  getRandomFromPool,
} from "./services/heroesService";

export default function App() {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [universe, setUniverse] = useState("");
  const [hero, setHero] = useState(null);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadHeroes() {
      try {
        const data = await getHeroes();
        setHeroes(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadHeroes();
  }, []);

  const filteredHeroes = useMemo(() => {
    if (!search) {
      return heroes;
    }

    return heroes.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [heroes, search]);

  const toggleHero = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((heroId) => heroId !== id) : [...prev, id],
    );
  };

  const handleFilteredRandom = async () => {
    setLoading(true);

    try {
      const randomHero = await getFilteredRandomHero(role, universe);
      setHero(randomHero);
    } catch (error) {
      console.error(error);
      alert("Error fetching hero");
    } finally {
      setLoading(false);
    }
  };

  const handleFullRandom = async () => {
    setLoading(true);

    try {
      const randomHero = await getAllRandomHero();
      setHero(randomHero);
    } catch (error) {
      console.error(error);
      alert("Error fetching hero");
    } finally {
      setLoading(false);
    }
  };

  const handlePoolRandom = async () => {
    if (selected.length === 0) {
      alert("Select heroes first!");
      return;
    }

    setLoading(true);

    try {
      const randomHero = await getRandomFromPool(selected);
      setHero(randomHero);
    } catch (error) {
      console.error(error);
      alert("Error fetching hero from pool");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <HeroHeader />

      <HeroFilters
        role={role}
        universe={universe}
        search={search}
        onRoleChange={setRole}
        onUniverseChange={setUniverse}
        onSearchChange={setSearch}
      />

      <HeroActions
        loading={loading}
        onFilteredRandom={handleFilteredRandom}
        onFullRandom={handleFullRandom}
        onPoolRandom={handlePoolRandom}
      />

      <HeroResult hero={hero} />

      <HeroGrid
        heroes={filteredHeroes}
        selected={selected}
        onToggleHero={toggleHero}
      />
    </main>
  );
}
