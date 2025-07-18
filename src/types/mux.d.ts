declare module '@mux/mux-player-react' {
  import { ComponentType, CSSProperties } from 'react';

  interface MuxPlayerProps {
    streamType?: 'on-demand' | 'live' | 'll-live';
    src?: string;
    playbackId?: string;
    poster?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    style?: CSSProperties;
    className?: string;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onError?: (error: Event | Error) => void;
    onLoadStart?: () => void;
    onLoadedData?: () => void;
    onCanPlay?: () => void;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  }

  const MuxPlayer: ComponentType<MuxPlayerProps>;
  export default MuxPlayer;
}