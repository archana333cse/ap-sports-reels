'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import ClipLoader from 'react-spinners/ClipLoader';
import { Reel } from './../types/reel';

export default function Home() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/reels')
      .then((res) => res.json())
      .then(setReels);
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {reels.map((reel, index) => (
        <div
          className="snap-start h-screen flex items-center justify-center relative"
          key={index}
          onClick={() => setPlayingIndex(index)}
        >
          {loading && (
            <div className="absolute z-10">
              <ClipLoader color="#ffffff" loading={loading} size={60} />
            </div>
          )}

          {playingIndex === index ? (
            <ReactPlayer
              url={reel.videoUrl}
              playing
              controls={false}
              width="100%"
              height="100%"
              onReady={() => setLoading(false)}
              onBuffer={() => setLoading(true)}
              onBufferEnd={() => setLoading(false)}
            />
          ) : (
            <img
            src={reel.thumbnail}
            alt={reel.title}
            className="object-contain max-h-[80vh] max-w-[80vw] mx-auto my-auto cursor-pointer"
          />
           
          )}
        </div>
      ))}
    </div>
  );
}
