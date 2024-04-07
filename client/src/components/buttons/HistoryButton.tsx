import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../ui/Modal";
import HistoryArea from "../ui/HistoryArea";

const HistoryButton: React.FC = () => {
  const [historyModal, setHistoryModal] = useState<boolean>(false);

  const handleToggleHistory: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setHistoryModal(!historyModal);
  };

  return (
    <>
      {historyModal && (
        <Modal active={historyModal} setActive={setHistoryModal}>
          <HistoryArea
            setHistoryModal={setHistoryModal}
          />
        </Modal>
      )}
      <button
        onClick={handleToggleHistory}
        className="flex justify-center items-center p-3 mx-6 border border-secondary rounded-lg bg-white shadow-lg"
      >
        <ClockIcon className="w-5 h-5 text-secondary" />
        <span className="hidden sm:inline text-secondary font-semibold ml-1">
          History
        </span>
      </button>
    </>
  );
};

export default HistoryButton;
