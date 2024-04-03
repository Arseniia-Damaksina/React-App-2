import { ClockIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import {
  fetchAllActivityLogs,
  selectActivity,
} from "../../slices/activitySlice";
import Modal from "../ui/Modal";
import HistoryArea from "../ui/HistoryArea";

const HistoryButton: React.FC = () => {
  const [historyModal, setHistoryModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const activityLogs = useSelector(selectActivity);

  useEffect(() => {
    dispatch(fetchAllActivityLogs());
  }, [dispatch]);

  const handleToggleHistory: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setHistoryModal(!historyModal);
  };

  return (
    <>
      {historyModal && (
        <Modal active={historyModal} setActive={setHistoryModal}>
            <HistoryArea setHistoryModal={setHistoryModal} activityLogs={activityLogs}/>
        </Modal>
      )}
      <button
        onClick={handleToggleHistory}
        className="flex justify-center items-center p-3 mx-6 border-2 border-secondary rounded-lg bg-white shadow-lg"
      >
        <ClockIcon className="w-5 h-5 text-secondary" />
        <span className="hidden sm:inline text-secondary font-semibold ml-1">History</span>
      </button>
    </>
  );
};

export default HistoryButton;
