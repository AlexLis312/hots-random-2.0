import hotsIcon from "../assets/hotsIcon.png";

export default function HeroHeader() {
  return (
    <h1 className="app-title">
      <img src={hotsIcon} alt="Heroes of the Storm icon" className="app-title__icon" />
      Random Hero Picker
    </h1>
  );
}
