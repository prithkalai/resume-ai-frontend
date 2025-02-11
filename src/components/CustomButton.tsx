import { ReactElement } from "react";
import { PuffLoader } from "react-spinners";

interface Props {
  loading: boolean;
  handleClick: () => void;
  placeHolder: string;
  Icon: ReactElement;
}

const CustomButton = ({ loading, handleClick, placeHolder, Icon }: Props) => {
  return (
    <button
      className={`flex items-center gap-2 p-3 rounded-md w-fit text-white  
          hover:cursor-pointer  transition-colors hover:bg-purple-700 active:bg-purple-500
          ${loading ? "pointer-events-none bg-gray-300" : "bg-purple-600"} 
          `}
    >
      {loading ? (
        <PuffLoader size={25} color="white" />
      ) : (
        <>
          <span>{Icon}</span>
        </>
      )}
      <span
        className="font-syncopate text-sm font-extralight"
        onClick={() => handleClick()}
      >
        {placeHolder}
      </span>
    </button>
  );
};

export default CustomButton;
