import React from 'react';
import ReactPlayer from 'react-player'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { XCircle, VideoOff } from 'lucide-react'; 

function Trailer() {
  const navigate = useNavigate();

  const ytvideo = useSelector((state) => state.movie.info?.videos);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <XCircle
        className="absolute top-6 right-6 h-10 w-10 text-muted-foreground cursor-pointer transition-colors hover:text-foreground"
        onClick={() => navigate(-1)}
      />

      {ytvideo ? (
        <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
          <ReactPlayer
            controls
            width="100%"  
            height="100%"
            src={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <VideoOff className="h-24 w-24" />
          <h2 className="text-2xl font-semibold text-foreground">Trailer Not Available</h2>
          <p>We couldn't find an official trailer for this movie.</p>
        </div>
      )}
    </div>
  );
}

export default Trailer;