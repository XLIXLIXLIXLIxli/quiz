import * as React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

export default function AudioRec() {
  const [recordedBlob, setRecordedBlob] = React.useState(null);
  const audioContainerRef = React.useRef(null);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const file = new File([blob], "recording.webm", { type: "audio/webm" });
    setRecordedBlob(file);
    const audioElement = document.createElement("audio");
    audioElement.src = url;
    audioElement.controls = true;
    audioContainerRef.current.innerHTML = "";
    audioContainerRef.current.appendChild(audioElement);
  };

  const handlePause = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const inputElement = document.getElementById("audioInput");
      inputElement.value = url;
    }
  };

  React.useEffect(() => {
    if (recordedBlob) {
    }
  }, [recordedBlob]);
  const space = recordedBlob ? 95 : 25;
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: space }}
    >
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadFileExtension="webm"
        onPause={handlePause}
      />
      <Box sx={{ pt: 2 }} ref={audioContainerRef} />
    </Stack>
  );
}
