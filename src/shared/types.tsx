export interface Celebrity {
  id: number;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: {
    positive: number;
    negative: number;
  };
}

export enum ResultIcon {
  ThumbUp = 'thumb-up',
  ThumbDown = 'thumb-down',
}

export type Vote = {
  pollId: number | null;
  vote: VoteType | null;
}

export enum VoteType {
  positive,
  negative
}
export interface Poll {
  id: number;
  positivePercentage: number;
  negativePercentage: number;
  resultIcon: ResultIcon;
  openingDate: string;
  celebrity: Celebrity;
}


