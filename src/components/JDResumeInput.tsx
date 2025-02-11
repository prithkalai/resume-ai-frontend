import TextBox from "./TextBox";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { IoColorWandSharp } from "react-icons/io5";

interface Props {
  enhanceResume: (resume: string, jobDescription: string) => void;
  suggestionLoading: boolean;
  updateLoading: boolean;
}

const JDResumeInput = ({
  enhanceResume,
  suggestionLoading,
  updateLoading,
}: Props) => {
  const [resume, setResume] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const handleEnhanceClick = () => {
    // TODO: Verify if the resume and jd are empty
    enhanceResume(resume, jobDescription);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 w-full gap-4">
        <TextBox
          title="Job Description"
          placeHolder="Paste the Job Description"
          setContent={setJobDescription}
        />
        <TextBox
          title="Resume"
          placeHolder="Paste your Resume"
          setContent={setResume}
        />
      </div>

      <CustomButton
        loading={suggestionLoading || updateLoading}
        handleClick={handleEnhanceClick}
        Icon={<IoColorWandSharp className="text-xl font-extralight" />}
        placeHolder="Enhance"
      />
    </div>
  );
};

export default JDResumeInput;
