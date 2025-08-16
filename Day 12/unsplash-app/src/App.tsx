import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";
import Favorites from "./components/Favorites";

export interface UnsplashImage {
  id: string;
  urls: { small: string };
  alt_description: string;
  links: { html: string };
}

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [favorites, setFavorites] = useState<UnsplashImage[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setImages([]);
      return;
    }

    const fetchImages = async () => {
      try {
        setError("");
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        setImages(data.results);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const delayDebounce = setTimeout(fetchImages, 500); // debounce typing
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const toggleFavorite = (image: UnsplashImage) => {
    let updatedFavs;
    if (favorites.some((fav) => fav.id === image.id)) {
      updatedFavs = favorites.filter((fav) => fav.id !== image.id);
    } else {
      updatedFavs = [...favorites, image];
    }
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Unsplash Search</h1>
      <SearchBar query={query} setQuery={setQuery} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && images.length === 0 && query && <p>No photos found.</p>}
      <ImageGrid
        images={images}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <h2>Favorites</h2>
      <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default App;
