import React, { useRef, useEffect } from "react";

const VideoPlayer = React.forwardRef(({ src, thumbnail, isMuted, onEnded }, ref) => {
  const videoElement = useRef(null);

  useEffect(() => {
    if (ref && videoElement.current) {
      ref.current = videoElement.current;
    }
  }, [ref]);

  return (
    <div className="relative">
      <video
        ref={videoElement}
        className="w-full h-full object-cover"
        controls
        muted={isMuted}
        onEnded={onEnded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {thumbnail && !videoElement.current?.playing && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
});

export default VideoPlayer;
