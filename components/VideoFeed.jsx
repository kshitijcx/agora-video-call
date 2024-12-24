"use client";
import { useState } from "react";
import {
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  LocalUser,
  useRemoteUsers,
  RemoteUser,
  useIsConnected,
} from "agora-rtc-react";

const VideoFeed = () => {
  const [calling, setCalling] = useState("");

  useJoin(
    {
      appid: process.env.NEXT_PUBLIC_APPID,
      channel: process.env.NEXT_PUBLIC_CHANNEL,
      token: process.env.NEXT_PUBLIC_TOKEN,
    },
    calling
  );

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  const isConnected = useIsConnected();

  return (
    <div className="h-screen w-screen space-y-5 flex items-center justify-center">
      {!isConnected ? (
        <button
          className="bg-green-300 p-6 rounded-xl text-2xl font-bold"
          onClick={() => setCalling(true)}
        >
          Call
        </button>
      ) : null}

      {isConnected && (
        <div className="space-y-5">
          <div className="flex gap-10 flex-wrap justify-center">
            <div className="w-80 h-80">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
              >
                <span className="text-white">You</span>
              </LocalUser>
            </div>
            {remoteUsers.map((item) => (
              <div key={item.uid} className="w-80 h-80">
                <RemoteUser user={item}>
                  <span className="text-white">{item.uid}</span>
                </RemoteUser>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5">
            <button
              onClick={() => setMicOn(!micOn)}
              className="bg-red-600 text-white p-4 rounded-lg"
            >
              {micOn ? "Mute" : "Unmute"}
            </button>
            <button
              onClick={() => setCameraOn(!cameraOn)}
              className="bg-red-600 text-white p-4 rounded-lg"
            >
              {cameraOn ? "Video Off" : "Video On"}
            </button>
            <button
              onClick={() => setCalling(!calling)}
              className="bg-red-600 text-white p-4 rounded-lg"
            >
              Disconnect Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default VideoFeed;
