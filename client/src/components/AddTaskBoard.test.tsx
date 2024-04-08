import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AddTaskBoard from "./AddTaskBoard";

jest.mock("./buttons/AddTaskBoardButton", () => {
  return jest.fn(() => <button data-testid="add-task-board-button" />);
});

jest.mock("./forms/AddTaskBoardForm", () => {
  return jest.fn(() => (
    <form data-testid="add-task-board-form">
    </form>
  ));
});

describe("AddTaskBoard component", () => {
  it("renders AddTaskBoardButton by default", () => {
    const { getByTestId } = render(<AddTaskBoard />);
    const addTaskBoardButton = getByTestId("add-task-board-button");
    expect(addTaskBoardButton).toBeInTheDocument();
  });
});
