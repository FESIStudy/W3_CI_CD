import {
  useState,
  ChangeEvent,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import ActionBtn from "./action-btn";
import { createItem, ItemResponse } from "../services/apis/itemApi";

interface AddInputProps {
  setAllItems: Dispatch<SetStateAction<ItemResponse[]>>;
}

const AddInput = ({ setAllItems }: AddInputProps) => {
  const [newTodo, setNewTodo] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    // 공백만 입력한 경우 등록 안됨
    createItem(newTodo)
      .then((data) => {
        const newTodoItem = data;

        // 할 일 등록 후 서버 응답을 기반으로 상태 업데이트
        setAllItems((items) => [newTodoItem as ItemResponse, ...items]);

        // 입력창 비우기
        setNewTodo("");
      })
      .catch(() => {
        alert("할 일 등록을 실패하였습니다.");
        location.reload();
      });
  };

  return (
    <form className="mb-[24px] flex grow gap-[8px] tablet:mb-[40px] tablet:gap-[16px]">
      <input
        className="h-[52.5px] w-full rounded-[24px] border-[2px] border-slate-900 p-[24px_17px] font-nanumsquare-regular text-16px shadow-2px-slate-900 outline-none placeholder:text-slate-500"
        type="text"
        placeholder="할 일을 입력해주세요"
        value={newTodo}
        onChange={handleChangeInput}
      />
      <ActionBtn
        onClick={handleSubmit}
        type="add"
        active={Boolean(newTodo.trim().length)} // input에 입력값이 있을 경우 버튼 활성화
      />
    </form>
  );
};

export default AddInput;
