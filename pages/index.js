import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [reRenderCounter, setReRenderCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReRenderCounter((i) => i + (1 % 100));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Cloud Photoframe</title>
      </Head>
      <div className="w-screen h-screen bg-black">
        <img
          className="absolute w-full h-full object-contain z-10 p-5"
          src={`/api/photo?=${reRenderCounter}`}
          alt="Cloud Photoframe"
        />
        <img
          className="absolute w-full h-full object-cover blur-2xl"
          src={`/api/photo?=${reRenderCounter}`}
          alt="Cloud Photoframe"
        />
      </div>
    </>
  );
}
