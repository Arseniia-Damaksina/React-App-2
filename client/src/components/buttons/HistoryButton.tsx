import { ClockIcon } from "@heroicons/react/24/outline";
import { onClickButtonProps } from "../../types/types";

const HistoryButton: React.FC<onClickButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center p-3 mx-6 border border-secondary rounded-lg bg-white shadow-lg"
    >
      <ClockIcon className="w-5 h-5 text-secondary" />
      <span className="hidden sm:inline text-secondary font-semibold ml-1">
        History
      </span>
    </button>
  );
};

export default HistoryButton;
