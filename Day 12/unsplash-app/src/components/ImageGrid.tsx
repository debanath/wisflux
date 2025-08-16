import React from "react";
import { UnsplashImage } from "../App";

interface Props {
  images: UnsplashImage[];
  favorites: UnsplashImage[];
  toggleFavorite: (image: UnsplashImage) => void;
}

const ImageGrid: React.FC<Props> = ({ images, favorites, toggleFavorite }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {images.map((img) => (
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
              background: favorites.some((f) => f.id === img.id)
                ? "red"
                : "white",
              color: favorites.some((f) => f.id === img.id) ? "white" : "black",
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

export default ImageGrid;
