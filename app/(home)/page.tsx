"use client";

import AddInput from "../../components/add-input";
import { getItems, ItemResponse } from "../../services/apis/itemApi";
import TodoList from "./_components/todo-list";
import { useEffect, useState } from "react";

const Home = () => {
  const [allItems, setAllItems] = useState<ItemResponse[]>([]);

  useEffect(() => {
    getItems().then((items) => {
      setAllItems(items);
    });
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] px-[16px] py-[16px] tablet:px-[24px] tablet:py-[24px]">
      {/* 할 일 추가 섹션 */}
      <AddInput setAllItems={setAllItems} />

      {/* 할 일 리스트 섹션 */}
      <section className="flex flex-col gap-[48px] pc:flex-row pc:gap-[24px]">
        <TodoList type="todo" allItems={allItems} setAllItems={setAllItems} />
        <TodoList type="done" allItems={allItems} setAllItems={setAllItems} />
      </section>
    </div>
  );
};

export default Home;
