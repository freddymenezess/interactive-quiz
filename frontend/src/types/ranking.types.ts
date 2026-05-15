export interface RankingEntry {
  position: number;
  userId: string;
  name: string;
  totalScore: number;
  completedAt?: Date;
}
