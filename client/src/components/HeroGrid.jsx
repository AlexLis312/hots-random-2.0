import { API_URL } from "../config/env";

export default function HeroGrid({ heroes, selected, onToggleHero }) {
  return (
    <section className="hero-pool">
      <h3>Select Heroes for Pool</h3>
      <p>Selected: {selected.length}</p>

      <div className="hero-grid">
        {heroes.map((hero) => (
          <div
            key={hero.id}
            onClick={() => onToggleHero(hero.id)}
            className={`hero-card ${selected.includes(hero.id) ? "selected" : ""}`}
          >
            {hero.img_path ? (
              <img src={`${API_URL}${hero.img_path}`} alt={hero.name} />
            ) : (
              <div className="hero-card__placeholder" />
            )}
            <div className="hero-name">{hero.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
