import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import Gnb from "../components/gnb";

// `next/router`를 mocking하여 테스트 가능하도록 설정
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Gnb Component", () => {
  let mockPush: jest.Mock;
  let mockReload: jest.SpyInstance;

  beforeEach(() => {
    // `useRouter`와 `usePathname` mock 설정
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // window.location.reload()를 mock 처리
    mockReload = jest
      .spyOn(window.location, "reload")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks(); // 각 테스트 후 mock 초기화
  });

  test("renders mobile and tablet logo correctly", () => {
    render(<Gnb />);

    // 모바일용 로고가 존재해야 함
    expect(screen.getByAltText("logoSmall")).toBeInTheDocument();

    // 태블릿 이상에서 보이는 로고도 존재해야 함
    expect(screen.getByAltText("logoLarge")).toBeInTheDocument();
  });

  test("reloads the page when logo is clicked on home page", () => {
    (usePathname as jest.Mock).mockReturnValue(HOME_PAGE_ROUTE);

    render(<Gnb />);
    const logo = screen.getByAltText("logoSmall");

    fireEvent.click(logo);

    expect(mockReload).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled(); // `router.push`는 호출되지 않아야 함
  });

  test("navigates to home when logo is clicked from another page", () => {
    (usePathname as jest.Mock).mockReturnValue("/another-page");

    render(<Gnb />);
    const logo = screen.getByAltText("logoSmall");

    fireEvent.click(logo);

    expect(mockPush).toHaveBeenCalledWith(HOME_PAGE_ROUTE);
    expect(mockReload).not.toHaveBeenCalled(); // `window.location.reload()`는 호출되지 않아야 함
  });
});
