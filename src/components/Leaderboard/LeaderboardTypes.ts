interface leaderboardType {
  Dashboard: 'Normal';
  DailyChallenge: 'DailyChallenge';
  PvP: 'PvP';
}

export type Props = {
  page: leaderboardType[keyof leaderboardType];
};
