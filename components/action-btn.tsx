import Image from "next/image";
import checkIcon from "../public/icons/check.svg";
import plusActiveIcon from "../public/icons/plus-active.svg";
import plusInactiveIcon from "../public/icons/plus-inactive.svg";
import deleteIcon from "../public/icons/delete.svg";
import { FormEventHandler } from "react";

// 버튼 타입과 상태에 따라 사용할 아이콘 매핑
const ICONS = {
  add: {
    active: plusActiveIcon,
    inactive: plusInactiveIcon,
  },
  delete: deleteIcon,
  edit: checkIcon,
};

// 버튼 타입별 스타일 정의
const BUTTON_STYLES = {
  add: "w-[54.78px] tablet:w-[164.35px] bg-violet-600 hover:bg-violet-700 text-white disabled:bg-slate-200 disabled:text-slate-900",
  delete: "bg-rose-500 text-white hover:bg-rose-600",
  edit: "bg-lime-300 hover:bg-lime-400 text-slate-900 disabled:bg-slate-200 disabled:text-slate-900",
};

// 버튼 타입별 텍스트 정의
const BUTTON_TEXTS = {
  add: "추가하기",
  delete: "삭제하기",
  edit: "수정 완료",
};

type BtnType = "add" | "delete" | "edit";

interface ActionBtnProps {
  type: BtnType;
  active?: boolean;
  onClick: FormEventHandler<HTMLButtonElement>;
}

// 타입별로 재사용 가능한 버튼
// add 타입의 경우 480px을 기준으로 UI가 변경되도록 반응형 구현
const ActionBtn = ({ type, active = true, onClick }: ActionBtnProps) => {
  // 버튼 타입과 활성화 상태에 따라 적절한 아이콘 선택
  const icon =
    type === "add" ? ICONS[type][active ? "active" : "inactive"] : ICONS[type];

  return (
    <button
      // action-btn은 공통 스타일로 global.css에 정의
      className={`action-btn ${BUTTON_STYLES[type]}`}
      onClick={onClick}
      disabled={!active} // 비활성 상태인 경우 버튼 비활성화
    >
      <Image src={icon} alt={`${type}Icon`} />
      {/* type이 add일 때만 모바일 환경에서 텍스트 숨기기*/}
      <span className={`tablet:block ${type === "add" ? "hidden" : ""}`}>
        {BUTTON_TEXTS[type]}
      </span>
    </button>
  );
};

export default ActionBtn;
