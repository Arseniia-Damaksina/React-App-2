import { Activity } from "../../types/types";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { clearActivityLogs } from "../../slices/activitySlice";
import { useAppDispatch } from "../../store/store";

const HistoryArea: React.FC<{
  activityLogs: Activity[];
  setHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ activityLogs, setHistoryModal }) => {
  const dispatch = useAppDispatch();

  const clearHistory = () => {
    dispatch(clearActivityLogs());
  };

  return (
    <div className="flex flex-col items-start w-3/4 sm:w-2/3 xl:w-1/3 bg-white rounded-xl">
      <div className="w-full flex justify-between bg-secondary rounded-t-xl p-2">
        <h2 className="text-2xl font-bold p-3 text-white">History</h2>
        <div className="flex">
          {activityLogs.length > 0 && (
            <button
              className="text-white flex items-center mr-3 hover:underline"
              onClick={clearHistory}
            >
              <ClockIcon className="w-5 h-5 mr-1" />
              Clear History
            </button>
          )}
          <button
            className="text-white flex items-center mr-3 hover:underline"
            onClick={() => {
              setHistoryModal(false);
            }}
          >
            <XMarkIcon className="w-5 h-5 mr-1" />
            Close
          </button>
        </div>
      </div>
      {activityLogs.length > 0 ? (
        <div className="flex w-full">
          <div className="bg-gray-100 w-full p-5 rounded-b-xl">
            <ul>
              {activityLogs.map((activity) => (
                <li
                  className="flex m-3 text-sm text-gray-600"
                  key={activity.id}
                >
                  <p className="w-2/3 mr-3">- {activity.log.text}</p>
                  <p className="w-1/3">{activity.log.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 p-5">No activity logs found</p>
      )}
    </div>
  );
};

export default HistoryArea;
