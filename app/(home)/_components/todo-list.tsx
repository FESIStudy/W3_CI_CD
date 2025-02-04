import { ItemResponse } from "../../../services/apis/itemApi";
import Image from "next/image";
import todoLabel from "../../../public/imgs/todo-label.svg";
import doneLabel from "../../../public/imgs/done-label.svg";
import TodoItem from "../../../components/todo-item";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import EmptyDataImg from "./empty-data-img";

const LIST_TYPE = {
  todo: {
    labelImg: todoLabel,
  },
  done: {
    labelImg: doneLabel,
  },
};

interface TodoListProps {
  type: "todo" | "done";
  allItems: ItemResponse[];
  setAllItems: Dispatch<SetStateAction<ItemResponse[]>>;
}

// 완료 타입에 따라 List를 렌더링하는 컴포넌트
const TodoList = ({ type, allItems, setAllItems }: TodoListProps) => {
  const [items, setItems] = useState<ItemResponse[]>([]);

  useEffect(() => {
    setItems(
      allItems.filter((item) =>
        type === "done" ? item.isCompleted : !item.isCompleted,
      ),
    );
  }, [allItems]);

  return (
    <div className="w-full">
      <Image src={LIST_TYPE[type].labelImg} alt={`${type}Label`} />

      {/* 아이템이 없는 경우 Null 이미지 렌더링 */}
      {!items.length ? (
        <EmptyDataImg type={type} />
      ) : (
        /* 아이템이 있는 경우 리스트 렌더링 */
        <ul className="mt-[16px] flex grow flex-col gap-[16px]">
          {items.map((item) => (
            <TodoItem
              key={item.id}
              itemId={item.id}
              isDone={item.isCompleted}
              text={item.name}
              setAllItems={setAllItems}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
