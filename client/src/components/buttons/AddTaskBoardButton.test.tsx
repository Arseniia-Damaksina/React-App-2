import { render, fireEvent } from '@testing-library/react';
import AddTaskBoardButton from './AddTaskBoardButton';
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

describe('AddTaskBoardButton', () => {
  it('should call setTaskBoardForm when the button is clicked', () => {
    const setTaskBoardFormMock = jest.fn();
    const { getByText } = render(<AddTaskBoardButton setTaskBoardForm={setTaskBoardFormMock} />);

    fireEvent.click(getByText('Create New Board'));

    expect(setTaskBoardFormMock).toHaveBeenCalledWith(true);
  });

  it('should render the button with the correct text', () => {
    const setTaskBoardFormMock = jest.fn();
    const { getByText } = render(<AddTaskBoardButton setTaskBoardForm={setTaskBoardFormMock} />);

    expect(getByText('Create New Board')).toBeInTheDocument();
  });
});
