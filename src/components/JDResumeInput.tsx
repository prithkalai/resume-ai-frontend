import { IoColorWandSharp } from "react-icons/io5";
import TextBox from "./TextBox";

const JDResumeInput = () => {
  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 w-full gap-4">
        <TextBox
          title="Job Description"
          placeHolder="Paste the Job Description"
        />
        <TextBox title="Resume" placeHolder="Paste your Resume" />
      </div>

      <button className="flex items-center gap-2 p-3 rounded-md w-fit text-white  hover:cursor-pointer bg-purple-600">
        <span>
          <IoColorWandSharp className="text-2xl" />
        </span>
        <span className="font-alumni text-2xl font-bold">Enhance Resume</span>
      </button>
    </div>
  );
};

export default JDResumeInput;
