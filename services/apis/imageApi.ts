import axiosInstance from "../axiosInstance";

interface UploadImageResponse {
  url: string;
}

// 이미지 업로드
export const uploadImage = async (formData: FormData) => {
  console.log([...formData.entries()]);
  const response = await axiosInstance.post<UploadImageResponse>(
    `/images/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data.url;
};
