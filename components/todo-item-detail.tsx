import Image from "next/image";
import todoCircle from "../public/icons/todo-circle.svg";
import doneCircle from "../public/icons/done-circle.svg";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Item } from "../types/ItemType";

interface TodoItemDetailProps {
  isDone?: boolean;
  name?: string;
  setItem: Dispatch<SetStateAction<Item | undefined>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const TodoItemDetail = ({
  isDone,
  name,
  setItem,
  setIsEditing,
}: TodoItemDetailProps) => {
  // 완료 여부에 따른 배경색 적용
  const bgStyle = isDone ? "bg-violet-200" : "bg-white";

  // 완료 여부에 따른 아이콘 적용
  const checkIcon = isDone ? doneCircle : todoCircle;

  // 완료 상태 변경
  const handleClickCheckBtn = () => {
    setIsEditing(true);
    setItem((item) => {
      return { ...item, isCompleted: !item?.isCompleted } as Item;
    });
  };

  // 할 일 이름 변경
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    if (e.target.value.length === 0)
      return alert("제목을 한 글자 이상 입력해주세요.");
    setItem((item) => {
      return { ...item, name: e.target.value } as Item;
    });
  };

  return (
    <div
      className={`${bgStyle} flex h-[64px] items-center justify-center gap-[16px] rounded-[24px] border-2 border-slate-900`}
    >
      <Image
        className="cursor-pointer"
        src={checkIcon}
        alt={"check or not"}
        onClick={handleClickCheckBtn}
      />
      <input
        className="max-w-[76%] cursor-pointer bg-transparent font-nanumsquare-bold text-20px underline outline-none [field-sizing:content] tablet:max-w-[86%]"
        value={name || ""}
        onChange={handleNameChange}
      />
    </div>
  );
};

export default TodoItemDetail;
