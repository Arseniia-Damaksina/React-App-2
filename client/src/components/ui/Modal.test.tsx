import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  it("renders children when active is true", () => {
    const setActiveMock = jest.fn();
    const { getByText } = render(
      <Modal active={true} setActive={setActiveMock}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls setActive(false) when clicking outside the modal content", () => {
    const setActiveMock = jest.fn();
    const { container } = render(
      <Modal active={true} setActive={setActiveMock}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContainer = container.firstChild;
    if (modalContainer) {
      fireEvent.click(modalContainer);
      expect(setActiveMock).toHaveBeenCalledWith(false);
    } else {
      fail("Modal container not found");
    }
  });

  it("does not call setActive(false) when clicking on the modal content", () => {
    const setActiveMock = jest.fn();
    const { container } = render(
      <Modal active={true} setActive={setActiveMock}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = container.querySelector(".modalContent");
    if (modalContent) {
      fireEvent.click(modalContent);
      expect(setActiveMock).not.toHaveBeenCalled();
    } else {
      fail("Modal content not found");
    }
  });
});
