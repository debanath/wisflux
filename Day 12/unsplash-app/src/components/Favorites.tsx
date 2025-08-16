import React from "react";
import { UnsplashImage } from "../App";

interface Props {
  favorites: UnsplashImage[];
  toggleFavorite: (image: UnsplashImage) => void;
}

const Favorites: React.FC<Props> = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {favorites.map((img) => (
        <div key={img.id} style={{ position: "relative" }}>
          <a href={img.links.html} target="_blank" rel="noopener noreferrer">
            <img
              src={img.urls.small}
              alt={img.alt_description}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </a>
          <button
            onClick={() => toggleFavorite(img)}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          >
            ♥
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
