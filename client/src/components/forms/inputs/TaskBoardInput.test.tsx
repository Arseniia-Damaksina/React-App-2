import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskBoardInput from "./TaskBoardInput";

describe("TaskBoardInput component", () => {
  it("renders input element with correct props", () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TaskBoardInput
        value="Test Value"
        onChange={mockOnChange}
        placeholder="Test Placeholder"
      />
    );
    const inputElement = getByPlaceholderText("Test Placeholder");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("value", "Test Value");
  });

  it("calls onChange function when input value changes", () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <TaskBoardInput
        value=""
        onChange={mockOnChange}
        placeholder="Test Placeholder"
      />
    );
    const inputElement = getByPlaceholderText("Test Placeholder");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
