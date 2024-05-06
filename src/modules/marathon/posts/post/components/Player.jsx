import React from "react";

const createUrlAudio = (a, b, c) => {
  const baseUrl = "https://esup.fun/api/files/";
  return baseUrl + a + "/" + b + "/" + c;
};

const Player = ({ post }) => {
  const audioUrl = createUrlAudio(post.collectionId, post.id, post.audio);

  const playerStyle = {
    filter: "sepia(20%) saturate(70%) grayscale(1) contrast(99%) invert(12%)",
    width: "634px",
    height: "40px",
    padding: "4px",
    borderRadius: "8px",
  };

  return (
    <div>
      {post.audio && (
        <audio preload="metadata" controls style={playerStyle}>
          <source src={audioUrl} type="audio/webm" />
        </audio>
      )}
    </div>
  );
};

export default Player;
