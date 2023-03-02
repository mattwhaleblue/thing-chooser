import { createScoresArray } from "../utils";

type Props = {
  currentScore: number;
  scores: ReturnType<typeof createScoresArray>;
};

export const Scores = ({ currentScore, scores }: Props) => {
  const topScore = scores.reduce((acc, curr) => {
    if (curr.score > acc) {
      return curr.score;
    }

    return acc;
  }, 0);

  const totalTimePlayed = scores.length * 10;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="space-y-2">
        <p className="text-xl">Current Score</p>
        <p
          className={
            currentScore >= 0 ? "text-green-400 text-6xl" : "text-red-400 text-6xl"
          }
        >
          {currentScore}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xl">Top Score</p>
        <p className="text-6xl">{topScore}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xl">Total Time Played</p>
        <p className="text-6xl">{totalTimePlayed}</p>
      </div>
    </div>
  );
};
