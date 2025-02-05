import { renderHook, act } from "@testing-library/react";
import { useImageUpload } from "./useImageUpload";
import { uploadImage } from "../services/apis/imageApi";

jest.mock("../services/apis/imageApi", () => ({
  uploadImage: jest.fn(),
}));

describe("useImageUpload", () => {
  let setItem: jest.Mock;
  let setIsEditing: jest.Mock;

  beforeEach(() => {
    setItem = jest.fn();
    setIsEditing = jest.fn();
  });

  it("파일 이름이 영어가 아닐 경우 알림을 띄운다.", () => {
    const { result } = renderHook(() => useImageUpload(setItem, setIsEditing));

    const fakeEvent = {
      target: { files: [{ name: "한글파일.jpg", size: 1024 * 1024 }] },
    };

    jest.spyOn(window, "alert").mockImplementation(() => {});

    act(() => {
      result.current.handleFileUpload(fakeEvent as any);
    });

    expect(window.alert).toHaveBeenCalledWith(
      "파일 이름은 영어로만 구성되어야 합니다.",
    );
  });

  it("파일 크기가 5MB를 초과할 경우 알림을 띄운다.", () => {
    const { result } = renderHook(() => useImageUpload(setItem, setIsEditing));

    const fakeEvent = {
      target: { files: [{ name: "test.jpg", size: 6 * 1024 * 1024 }] },
    };

    jest.spyOn(window, "alert").mockImplementation(() => {});

    act(() => {
      result.current.handleFileUpload(fakeEvent as any);
    });

    expect(window.alert).toHaveBeenCalledWith("파일 크기가 5MB를 초과합니다.");
  });

  it("정상적인 파일 업로드 후 setItem과 setIsEditing이 호출된다.", async () => {
    (uploadImage as jest.Mock).mockResolvedValue("https://test.com/image.jpg");

    const { result } = renderHook(() => useImageUpload(setItem, setIsEditing));

    const fakeEvent = {
      target: { files: [{ name: "test.jpg", size: 1024 * 1024 }] },
    };

    await act(async () => {
      await result.current.handleFileUpload(fakeEvent as any);
    });

    expect(uploadImage).toHaveBeenCalled();
    expect(setItem).toHaveBeenCalledWith(expect.any(Function));
    expect(setIsEditing).toHaveBeenCalledWith(true);
  });
});
