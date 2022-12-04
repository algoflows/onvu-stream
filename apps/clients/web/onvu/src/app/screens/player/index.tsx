import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

/* eslint-disable-next-line */
export interface PlayerProps {}

export function Player(props: PlayerProps) {
  return (
    <div>
      <ShakaPlayer
        autoPlay
        src="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"
      />
    </div>
  );
}

export default Player;
