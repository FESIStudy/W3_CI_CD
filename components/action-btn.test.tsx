import { render, screen, fireEvent } from "@testing-library/react";
import ActionBtn from "./action-btn";

describe("ActionBtn Component", () => {
  test("버튼이 정상적으로 렌더링되는지 확인", () => {
    render(<ActionBtn type="add" onClick={() => {}} />);

    // 추가하기 버튼이 렌더링되는지 확인
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("올바른 아이콘이 표시되는지 확인", () => {
    render(<ActionBtn type="edit" onClick={() => {}} />);

    // '수정 완료' 버튼이 렌더링되는지 확인
    expect(screen.getByAltText("editIcon")).toBeInTheDocument();
  });

  test("버튼 클릭 이벤트가 정상 동작하는지 확인", () => {
    const handleClick = jest.fn();
    render(<ActionBtn type="delete" onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // 클릭 이벤트가 한 번 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("비활성화된 버튼은 클릭되지 않는지 확인", () => {
    const handleClick = jest.fn();
    render(<ActionBtn type="add" active={false} onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // 클릭 이벤트가 호출되지 않았는지 확인
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
