type Props = {
  index: number;
  player?: string;
  onClick(event: any): void;
};

const Square = ({ index, onClick, player }: Props) => {
  const scale = player ? "scale-100" : "scale-0";
  const textColor = player === "X" ? "text-red-600" : "text-blue-900";
  const hoverStyle = "transition duration-500 hover:scale-105 transform";
  return (
    <div
      data-cell-index={index}
      className={`h-36 border-solid border-4 border-slate-200 font-display text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
      {...{ onClick }}
    >
      <span
        data-cell-index={index}
        className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}
      >
        {player}
      </span>
    </div>
  );
};

export default Square;
