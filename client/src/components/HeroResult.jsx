import { API_URL } from "../config/env";

export default function HeroResult({ hero }) {
  if (!hero) {
    return null;
  }

  return (
    <div className="hero-result">
      {hero.img_path && <img src={`${API_URL}${hero.img_path}`} alt={hero.name} />}
      <h3>{hero.name}</h3>
      <a href={hero.url} target="_blank" rel="noopener noreferrer">
        Build Guide
      </a>
    </div>
  );
}
