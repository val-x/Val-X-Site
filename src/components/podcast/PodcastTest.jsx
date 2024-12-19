import { useState } from 'react';
import PodcastPlayer, { samplePodcasts } from './PodcastPlayer';

const PodcastTest = () => {
  const [currentPodcast, setCurrentPodcast] = useState(samplePodcasts.synthwave);

  return (
    <div className="p-6 space-y-6">
      {/* Podcast Selection */}
      <div className="flex gap-4">
        {Object.entries(samplePodcasts).map(([key, podcast]) => (
          <button
            key={key}
            onClick={() => setCurrentPodcast(podcast)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            {podcast.title}
          </button>
        ))}
      </div>

      {/* Podcast Player */}
      <PodcastPlayer post={currentPodcast} />
    </div>
  );
};

export default PodcastTest; 