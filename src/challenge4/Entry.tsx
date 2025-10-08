import type EntryInfo from "./EntryInfo";
import MakerPng from "./marker.png";

export default function Entry({
  img,
  title,
  country,
  googleMapsLink,
  dates,
  text,
}: EntryInfo) {
  return (
    <article className="journal-entry">
      <div className="main-image-container">
        <img className="main-image" src={img.src} alt={img.alt} />
      </div>
      <div className="info-container">
        <div className="location-row">
          <img className="marker" src={MakerPng} alt="map marker icon" />
          <span className="country">{country}</span>
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
            View on Google Maps
          </a>
        </div>
        <h2 className="entry-title">{title}</h2>
        <p className="trip-dates">{dates}</p>
        <p className="entry-text">{text}</p>
      </div>
    </article>
  );
}
