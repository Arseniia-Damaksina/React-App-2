import { useState } from "react";
import Modal from "./ui/Modal";
import HistoryArea from "./HistoryArea";
import HistoryButton from "./buttons/HistoryButton";

const History = () => {
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
          <HistoryArea setHistoryModal={setHistoryModal} />
        </Modal>
      )}
      <HistoryButton onClick={handleToggleHistory} />
    </>
  );
};

export default History;
