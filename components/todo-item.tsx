"use client";

import Image from "next/image";
import todoCircle from "../public/icons/todo-circle.svg";
import doneCircle from "../public/icons/done-circle.svg";
import { TODO_DETAIL_ROUTE } from "../constants/routes";
import Link from "next/link";
import { ItemResponse, updateItem } from "../services/apis/itemApi";
import { Dispatch, SetStateAction } from "react";

// 완료 여부에 따른 스타일 및 아이콘 정의
const DONE_STATUS_STYLES = {
  done: {
    bgStyle: "bg-violet-200",
    textStyle: "line-through",
    checkIcon: doneCircle,
  },
  notDone: {
    bgStyle: "bg-white",
    textStyle: "",
    checkIcon: todoCircle,
  },
};

interface TodoItemProps {
  isDone: boolean;
  text: string;
  itemId: number;
  setAllItems: Dispatch<SetStateAction<ItemResponse[]>>;
}

const TodoItem = ({ isDone, text, itemId, setAllItems }: TodoItemProps) => {
  const style = isDone ? DONE_STATUS_STYLES.done : DONE_STATUS_STYLES.notDone;

  // 체크버튼 누르면 isCompleted 업데이트
  const handleClickCheckBtn = () => {
    setAllItems((items) => {
      const _items = items.slice();
      const targetIdx = _items.findIndex((item) => item.id === itemId);
      const targetItem = _items[targetIdx];
      const updatedItem = {
        ...targetItem,
        isCompleted: !targetItem.isCompleted,
      };
      _items.splice(targetIdx, 1, updatedItem);
      return _items;
    });

    updateItem(itemId, { isCompleted: !isDone }).catch(() => {
      alert("할 일 상태 변경에 실패하였습니다.");
      location.reload();
    });
  };

  return (
    <li
      className={`${style.bgStyle} flex h-[50px] shrink-0 items-center gap-[16px] rounded-[27px] border-2 border-slate-900 px-[12px]`}
    >
      <Image
        className="cursor-pointer"
        src={style.checkIcon}
        alt={"check or not"}
        onClick={handleClickCheckBtn}
      />
      <Link
        href={`${TODO_DETAIL_ROUTE}/${itemId}`}
        className={`w-full font-nanumsquare-regular text-16px ${style.textStyle}`}
      >
        {/* text를 최대 50자 까지만 보여줌 */}
        {text.length >= 50 ? `${text.slice(0, 50)}...` : text}
      </Link>
    </li>
  );
};

export default TodoItem;
