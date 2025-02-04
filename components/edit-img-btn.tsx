import Image from "next/image";
import addIcon from "../public/icons/plus-gray.svg";
import editIcon from "../public/icons/edit.svg";

const BUTTON_STYLE = {
  add: "bg-slate-200",
  edit: "border-slate-900 border-2 bg-slate-900 bg-opacity-50",
};

interface EditImgBtnProps {
  type: "add" | "edit";
  onClick: () => void;
  className?: string;
}

const EditImgBtn = ({ type, onClick, className }: EditImgBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex size-[64px] items-center justify-center rounded-full ${BUTTON_STYLE[type]} ${className}`}
    >
      <Image src={type === "add" ? addIcon : editIcon} alt={`${type}Icon`} />
    </button>
  );
};

export default EditImgBtn;
