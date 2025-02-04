import { Dispatch, SetStateAction, useRef } from "react";
import { uploadImage } from "../services/apis/imageApi";
import { Item } from "../types/ItemType";

export const useImageUpload = (
  setItem: React.Dispatch<React.SetStateAction<Item | undefined>>,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 이름 영어로만 이루어져 있는지 확인
    const isEnglishOnly = /^[a-zA-Z.]+$/.test(file.name);
    if (!isEnglishOnly) {
      alert("파일 이름은 영어로만 구성되어야 합니다.");
      return;
    }

    // 크기 제한 (5MB 이하 확인)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기가 5MB를 초과합니다.");
      return;
    }

    // 파일을 폼데이터 형식으로 변환
    const formData = new FormData();
    formData.append("image", file);

    // 이미지 링크 받아오기
    const uploadedImageUrl = await uploadImage(formData);

    // 아이템 업데이트
    setItem(
      (prevItem) => ({ ...prevItem, imageUrl: uploadedImageUrl }) as Item,
    );

    setIsEditing(true);
  };

  return { fileInputRef, handleFileUpload };
};
