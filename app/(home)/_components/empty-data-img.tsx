import Image from "next/image";
import todoNullLarge from "../../../public/imgs/todo-null-large.svg";
import doneNullLarge from "../../../public/imgs/done-null-large.svg";
import todoNullSmall from "../../../public/imgs/todo-null-small.svg";
import doneNullSmall from "../../../public/imgs/done-null-small.svg";

const LIST_TYPE = {
  todo: {
    NullImgSmall: todoNullSmall,
    NullImgLarge: todoNullLarge,
    nullText: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  },
  done: {
    NullImgSmall: doneNullSmall,
    NullImgLarge: doneNullLarge,
    nullText: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
  },
};

interface EmptyDataImgProps {
  type: "todo" | "done";
}

// 데이터가 없을 때 렌더링 할 이미지 컴포넌트
const EmptyDataImg = ({ type }: EmptyDataImgProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-[24px] pc:mt-[64px]">
        <Image
          className="tablet:hidden"
          src={LIST_TYPE[type].NullImgSmall}
          alt={`${type}NullSmall`}
        />
        <Image
          className="hidden tablet:block"
          src={LIST_TYPE[type].NullImgLarge}
          alt={`${type}NullLarge`}
        />
        <p className="flex flex-col items-center font-nanumsquare-bold text-16px text-slate-400">
          {LIST_TYPE[type].nullText.map((text, idx) => (
            <span key={idx}>{text}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default EmptyDataImg;
