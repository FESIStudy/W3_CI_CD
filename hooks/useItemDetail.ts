import { useState, useEffect } from "react";
import { HOME_PAGE_ROUTE } from "../constants/routes";
import {
  getItem,
  UpdateItemProps,
  updateItem,
  deleteItem,
} from "../services/apis/itemApi";
import { Item } from "../types/ItemType";
import { useRouter } from "next/navigation";

export const useItemDetail = (id: number) => {
  const [item, setItem] = useState<Item>();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 아이템 상세정보 API 호출
    getItem(id).then((data) => setItem(data));
  }, [id]);

  const handleEdit = () => {
    if (!item) return;

    // 현재 아이템에서 API 호출에 필요한 속성만 추출
    const { imageUrl, isCompleted, memo, name } = item;
    const updatedItem: UpdateItemProps = {
      imageUrl: imageUrl || "",
      memo: memo || "",
      isCompleted,
      name,
    };

    // Update API 호출
    updateItem(id, updatedItem)
      .then(() => {
        alert("수정을 완료하였습니다.");
        router.push(HOME_PAGE_ROUTE);
      })
      .catch(() => {
        alert("수정에 실패하였습니다.");
      });
  };

  const handleDelete = () => {
    // 삭제 확인 모달 표시
    if (confirm(`"${item?.name}" 할 일을 삭제하시겠습니까?`)) {
      deleteItem(id)
        .then(() => {
          // 아이템 삭제 후 홈으로 이동
          alert("삭제 완료하였습니다.");
          router.push(HOME_PAGE_ROUTE);
        })
        .catch(() => {
          alert("삭제에 실패하였습니다.");
        });
    }
  };

  return { item, setItem, isEditing, setIsEditing, handleEdit, handleDelete };
};
