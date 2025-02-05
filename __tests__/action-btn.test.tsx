import { render, screen, fireEvent } from "@testing-library/react";
import ActionBtn from "../components/action-btn";

describe("ActionBtn", () => {
  describe("renders correct text based on type", () => {
    test("should render '추가하기' when type is 'add'", () => {
      render(<ActionBtn type="add" onClick={() => {}} />);
      expect(screen.getByText("추가하기")).toBeInTheDocument();
    });
    test("should render '삭제하기' when type is 'delete'", () => {
      render(<ActionBtn type="delete" onClick={() => {}} />);
      expect(screen.getByText("삭제하기")).toBeInTheDocument();
    });
    test("should render '수정 완료' when type is 'edit'", () => {
      render(<ActionBtn type="edit" onClick={() => {}} />);
      expect(screen.getByText("수정 완료")).toBeInTheDocument();
    });
  });
  describe("button click events", () => {
    test("should call onClick handler when '수정 완료' button is clicked", () => {
      const handleClick = jest.fn();
      render(<ActionBtn type="edit" onClick={handleClick} />);
      const button = screen.getByText("수정 완료");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
