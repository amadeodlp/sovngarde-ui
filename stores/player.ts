import { defineStore } from 'pinia';

export interface GameStream {
  id: string;
  title: string;
  streamerName: string;
  streamerId: string;
  game: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewers: number;
  streamUrl: string;
  startedAt?: string;
  tags?: string[];
  description?: string;
}

export interface GameClip {
  id: string;
  title: string;
  streamerName: string;
  streamerId: string;
  game: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  clipUrl: string;
  createdAt: string;
  tags?: string[];
  description?: string;
}

export interface PlayerState {
  isOpen: boolean;
  currentStreamId: string | null;
  currentClipId: string | null;
  currentStream: GameStream | null;
  currentClip: GameClip | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  playQueue: Array<{
    type: 'stream' | 'clip';
    id: string;
  }>;
  error: string | null;
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    isOpen: false,
    currentStreamId: null,
    currentClipId: null,
    currentStream: null,
    currentClip: null,
    isPlaying: false,
    isLoading: false,
    volume: 80,
    playQueue: [],
    error: null,
  }),
  
  getters: {
    isWatchingStream: (state) => !!state.currentStreamId,
    isWatchingClip: (state) => !!state.currentClipId,
    currentTitle: (state) => {
      if (state.currentStream) return state.currentStream.title;
      if (state.currentClip) return state.currentClip.title;
      return null;
    },
    currentCreator: (state) => {
      if (state.currentStream) return state.currentStream.streamerName;
      if (state.currentClip) return state.currentClip.streamerName;
      return null;
    },
    queueCount: (state) => state.playQueue.length,
  },
  
  actions: {
    playStream(stream: GameStream) {
      this.currentStreamId = stream.id;
      this.currentStream = stream;
      this.currentClipId = null;
      this.currentClip = null;
      this.isPlaying = true;
      this.isOpen = true;
      this.isLoading = true;
      this.error = null;
    },
    
    playClip(clip: GameClip) {
      this.currentClipId = clip.id;
      this.currentClip = clip;
      this.currentStreamId = null;
      this.currentStream = null;
      this.isPlaying = true;
      this.isOpen = true;
      this.isLoading = true;
      this.error = null;
    },
    
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
    
    togglePlayPause() {
      if (this.currentStreamId || this.currentClipId) {
        this.isPlaying = !this.isPlaying;
      }
    },
    
    setPlaying(playing: boolean) {
      this.isPlaying = playing;
    },
    
    setVolume(volume: number) {
      this.volume = volume;
    },
    
    stop() {
      this.isPlaying = false;
    },
    
    closePlayer() {
      this.isOpen = false;
      this.isPlaying = false;
    },
    
    openPlayer() {
      this.isOpen = true;
    },
    
    addToQueue(item: { type: 'stream' | 'clip'; id: string }) {
      this.playQueue.push(item);
    },
    
    removeFromQueue(index: number) {
      this.playQueue.splice(index, 1);
    },
    
    clearQueue() {
      this.playQueue = [];
    },
    
    playNext() {
      if (this.playQueue.length > 0) {
        const nextItem = this.playQueue.shift();
        if (nextItem) {
          if (nextItem.type === 'stream') {
            this.currentStreamId = nextItem.id;
            this.currentClipId = null;
            this.currentClip = null;
          } else {
            this.currentClipId = nextItem.id;
            this.currentStreamId = null;
            this.currentStream = null;
          }
          this.isPlaying = true;
          this.isLoading = true;
        }
      } else {
        // No more items in queue
        this.isPlaying = false;
      }
    },
    
    setError(error: string | null) {
      this.error = error;
    },
  },
});
