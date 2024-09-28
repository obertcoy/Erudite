import { create } from 'zustand';

export enum FeedFilterState {
  GlobalStream = 0,
  FromYourHubs = 1,
  Fresh = 2,
}

export interface UseFeedFilterState {
  filter: FeedFilterState;
  setFilter: (filter: FeedFilterState) => void;
}

export const useFeedFilter = create<UseFeedFilterState>((set) => ({
  filter: FeedFilterState.GlobalStream,
  setFilter: (filter) => set({ filter }),
}));
