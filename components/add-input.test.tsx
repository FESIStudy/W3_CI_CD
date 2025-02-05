import { render, screen, fireEvent } from "@testing-library/react";
import { createItem } from "../services/apis/itemApi";
import AddInput from "./add-input";

// `createItem`을 Mocking
jest.mock("../services/apis/itemApi", () => ({
  createItem: jest.fn(),
}));

describe("AddInput Component", () => {
  test("입력 필드가 정상적으로 렌더링되는지 확인", () => {
    render(<AddInput setAllItems={() => {}} />);

    const input = screen.getByPlaceholderText("할 일을 입력해주세요");
    expect(input).toBeInTheDocument();
  });

  test("입력 필드 값이 변경될 때 상태가 업데이트되는지 확인", () => {
    render(<AddInput setAllItems={() => {}} />);

    const input = screen.getByPlaceholderText(
      "할 일을 입력해주세요",
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "새로운 할 일" } });

    expect(input.value).toBe("새로운 할 일");
  });

  test("버튼 클릭 시 `createItem` API가 호출되는지 확인", async () => {
    const setAllItemsMock = jest.fn();
    (createItem as jest.Mock).mockResolvedValue({
      id: 1,
      text: "새로운 할 일",
    });

    render(<AddInput setAllItems={setAllItemsMock} />);

    const input = screen.getByPlaceholderText("할 일을 입력해주세요");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "새로운 할 일" } });
    fireEvent.click(button);

    expect(createItem).toHaveBeenCalledWith("새로운 할 일");
  });

  test("입력 값이 없으면 버튼이 비활성화되는지 확인", () => {
    render(<AddInput setAllItems={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
});
