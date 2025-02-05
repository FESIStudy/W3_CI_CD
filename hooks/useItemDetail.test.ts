import { renderHook, act } from "@testing-library/react";
import { useItemDetail } from "../hooks/useItemDetail";
import { getItem, updateItem, deleteItem } from "../services/apis/itemApi";
import { useRouter } from "next/navigation";

jest.mock("../services/apis/itemApi", () => ({
  getItem: jest.fn(),
  updateItem: jest.fn(),
  deleteItem: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("useItemDetail", () => {
  let routerPush: jest.Mock;

  beforeEach(() => {
    (getItem as jest.Mock).mockResolvedValue({
      id: 1,
      name: "테스트 아이템",
      isCompleted: false,
    });
    (updateItem as jest.Mock).mockResolvedValue({});
    (deleteItem as jest.Mock).mockResolvedValue({});

    routerPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPush });
  });

  it("handleDelete가 정상적으로 삭제를 처리한다.", async () => {
    const { result } = renderHook(() => useItemDetail(1));

    jest.spyOn(window, "confirm").mockImplementation(() => true);
    jest.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(deleteItem).toHaveBeenCalledWith(1);
    expect(routerPush).toHaveBeenCalledWith("/");
    expect(window.alert).toHaveBeenCalledWith("삭제 완료하였습니다.");
  });

  it("삭제 확인 모달에서 취소하면 API 호출이 되지 않는다.", () => {
    const { result } = renderHook(() => useItemDetail(1));

    jest.spyOn(window, "confirm").mockImplementation(() => false);

    act(() => {
      result.current.handleDelete();
    });

    expect(deleteItem).not.toHaveBeenCalled();
  });
});
