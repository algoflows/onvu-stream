import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

/* eslint-disable-next-line */
export interface PlayerProps {}

export function Player(props: PlayerProps) {
  return (
    <div>
      <ShakaPlayer
        autoPlay
        src="https://platform-aws-cdk-v2-dev-video-output-bucket.s3.eu-west-1.amazonaws.com/hunt1234/hunt1234.mpd"
      />
    </div>
  );
}

export default Player;
