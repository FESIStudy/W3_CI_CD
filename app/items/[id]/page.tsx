"use client";

import { useParams } from "next/navigation";
import ActionBtn from "../../../components/action-btn";
import EditImgBtn from "../../../components/edit-img-btn";
import TodoItemDetail from "../../../components/todo-item-detail";
import { useImageUpload } from "../../../hooks/useImageUpload";
import { useItemDetail } from "../../../hooks/useItemDetail";
import { Item } from "../../../types/ItemType";
import imgNullIcon from "../../../public/imgs/img-null.svg";
import Image from "next/image";

const Detail = () => {
  const params = useParams();
  const id = Number(params.id);

  // 아이템 조회, 수정, 삭제 커스텀 훅
  const { item, setItem, isEditing, setIsEditing, handleEdit, handleDelete } =
    useItemDetail(id);

  // 파일 업로드 커스텀 훅
  const { fileInputRef, handleFileUpload } = useImageUpload(
    setItem,
    setIsEditing,
  );

  return (
    <div className="mx-auto min-h-[calc(100vh-60px)] bg-white px-[16px] py-[16px] tablet:px-[24px] tablet:py-[24px] pc:w-[1200px] pc:px-[120px]">
      {/* Todo 이름 섹션 */}
      <section className="mb-[17px] tablet:mb-[24px]">
        <TodoItemDetail
          setItem={setItem}
          name={item?.name}
          isDone={item?.isCompleted}
          setIsEditing={setIsEditing}
        />
      </section>

      {/* 이미지 & 메모 섹션 */}
      <section className="mb-[24px] flex flex-col items-center justify-center gap-[15px] tablet:gap-[24px] pc:flex-row">
        <div
          className={`relative flex h-[311px] w-full shrink-0 items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 pc:w-[384px]`}
        >
          {item?.imageUrl ? (
            <Image
              className="rounded-[24px] object-cover"
              src={item.imageUrl}
              alt={item.imageUrl}
              fill
            />
          ) : (
            <Image src={imgNullIcon} alt="imgNullIcon" />
          )}

          <EditImgBtn
            className="absolute bottom-[16px] right-[16px]"
            onClick={() => fileInputRef.current!.click()}
            type={item?.imageUrl ? "edit" : "add"}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <div
          className={`relative flex h-[311px] w-full items-center justify-center rounded-[24px] bg-[url('/imgs/memo.svg')]`}
        >
          <span className="absolute left-[50%] right-[50%] top-[24px] mx-auto w-fit translate-x-[-50%] transform font-nanumsquare-bold text-16px font-extrabold text-amber-800">
            Memo
          </span>
          <textarea
            value={item?.memo || ""}
            onChange={(e) => {
              setItem((prevItem) => {
                setIsEditing(true);
                return { ...prevItem, memo: e.target.value } as Item;
              });
            }}
            className="memo-scroll-bar m-[16px] mt-[58px] h-[229px] w-full cursor-pointer resize-none bg-transparent pr-[12px] text-center font-nanumsquare-regular text-16px outline-none"
          />
        </div>
      </section>

      {/* 버튼 섹션 */}
      <section className="flex items-center justify-center gap-[7px] tablet:gap-[16px] pc:justify-end">
        <ActionBtn type="edit" active={isEditing} onClick={handleEdit} />
        <ActionBtn type="delete" onClick={handleDelete} />
      </section>
    </div>
  );
};

export default Detail;
