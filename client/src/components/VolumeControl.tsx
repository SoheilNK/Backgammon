import React, { useState } from "react";

type VolumeControlProps = {
    volumeLevel: number;
    setVolumeLevel : (volumeLevel: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volumeLevel,
  setVolumeLevel,
}) => {
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolumeLevel = parseFloat(event.target.value);
      setVolumeLevel(newVolumeLevel);
      console.log("Volume level: ", newVolumeLevel);
  };

  return (
    <div>
      <label htmlFor="volume-control">Volume:</label>
      <input
        id="volume-control"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volumeLevel}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl;
