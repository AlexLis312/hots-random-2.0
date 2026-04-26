import { ROLES, UNIVERSES } from "../utils/constants";

export default function HeroFilters({
  role,
  universe,
  search,
  onRoleChange,
  onUniverseChange,
  onSearchChange,
}) {
  return (
    <div className="filters">
      <div className="filters__selects">
        <select value={role} onChange={(e) => onRoleChange(e.target.value)}>
          {ROLES.map((item) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select value={universe} onChange={(e) => onUniverseChange(e.target.value)}>
          {UNIVERSES.map((item) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Search hero..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
