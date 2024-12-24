"use client";
import { useState } from "react";
import AgoraRTC, {
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  LocalUser,
  AgoraRTCProvider,
} from "agora-rtc-react";
import VideoFeed from "./VideoFeed";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoCall = () => {
  

  return (
    <AgoraRTCProvider client={client}>
      <VideoFeed/>
    </AgoraRTCProvider>
  );
};
export default VideoCall;
