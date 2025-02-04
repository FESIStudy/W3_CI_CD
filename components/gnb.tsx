"use client";

import Image from "next/image";
import logoSmall from "../public/imgs/logo-small.svg";
import logoLarge from "../public/imgs/logo-large.svg";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import { usePathname, useRouter } from "next/navigation";

const Gnb = () => {
  const router = useRouter();
  const path = usePathname();

  const handleLogoClick = () => {
    if (path === HOME_PAGE_ROUTE) {
      // 현재 페이지가 HOME_PAGE_ROUTE인 경우 새로고침
      window.location.reload();
    } else {
      // 다른 페이지에서는 HOME_PAGE_ROUTE로 이동
      router.push(HOME_PAGE_ROUTE);
    }
  };

  return (
    <>
      <nav className="m-auto flex h-[60px] max-w-[1200px] items-center bg-white px-[16px] tablet:px-[24px]">
        <div onClick={handleLogoClick} className="cursor-pointer">
          {/* 모바일 환경에서는 텍스트가 없는 로고 사용 */}
          <Image src={logoSmall} alt="logoSmall" className="tablet:hidden" />
          {/* 태블릿 이상에서는 텍스트가 있는 로고 사용 */}
          <Image
            src={logoLarge}
            alt="logoLarge"
            className="hidden tablet:block"
          />
        </div>
      </nav>
      <div className="absolute left-0 h-[1px] w-[100%] bg-slate-200" />
    </>
  );
};

export default Gnb;
