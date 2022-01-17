import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [photos, setPhotos] = useState(["/img/loading.jpg"]);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const albumUrl = searchParams.get("albumUrl");

    if (albumUrl) {
      axios.get("/api/publicPhotos?albumUrl=" + albumUrl).then((response) => {
        setPhotos(response.data);
      });
    } else {
      const photos = new Array(100).map((_, i) => `/api/photo?=${i}`);
      setPhotos(photos);
    }
    setPhotoIndex(0);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shuffle = searchParams.has("shuffle");
    const interval = searchParams.get("interval") || 10000;

    const photoInterval = setInterval(
      () =>
        setPhotoIndex((i) => {
          if (shuffle) {
            return Math.floor(Math.random() * photos.length);
          }
          return (i + 1) % photos.length;
        }),

      interval
    );
    return () => clearInterval(photoInterval);
  }, [photos]);

  return (
    <>
      <Head>
        <title>Cloud Photoframe</title>
      </Head>
      <div className="w-screen h-screen bg-black">
        <img
          className="absolute w-full h-full object-contain z-10 p-5"
          src={`${photos[photoIndex]}`}
          alt="Cloud Photoframe"
        />
        <img
          className="absolute w-full h-full object-cover blur-2xl"
          src={`${photos[photoIndex]}`}
          alt="Cloud Photoframe"
        />
      </div>
    </>
  );
}
