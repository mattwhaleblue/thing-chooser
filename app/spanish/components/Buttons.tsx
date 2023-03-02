type Props = {
  isCorrect: boolean;
  isRunning: boolean;
};

export const Buttons = ({ isCorrect, isRunning }: Props) => {
  if (!isRunning) {
    return (
      <button
        type="submit"
        className="bg-red-400 text-slate-800 rounded-md px-4 py-2 cursor-pointer font-bold"
      >
        Restart
      </button>
    );
  }

  const className = isCorrect
    ? "border bg-white text-slate-800 rounded-md px-4 py-2 cursor-pointer font-bold"
    : "bg-red-400 text-slate-800 rounded-md px-4 py-2 cursor-pointer font-bold";

  return (
    <button key={`${isCorrect}`} type="submit" className={className}>
      Next
    </button>
  );
};
