export default function HeroActions({
  loading,
  onFilteredRandom,
  onFullRandom,
  onPoolRandom,
}) {
  return (
    <div className="hero-actions">
      <button onClick={onFilteredRandom} disabled={loading}>
        {loading ? "Loading..." : "Filtered Random"}
      </button>

      <button onClick={onFullRandom} disabled={loading}>
        {loading ? "Loading..." : "Full Random"}
      </button>

      <button onClick={onPoolRandom} disabled={loading}>
        {loading ? "Loading..." : "Pool Random"}
      </button>
    </div>
  );
}
