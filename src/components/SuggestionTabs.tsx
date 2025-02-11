import { useState } from "react";
import List from "./List";
import { SuggestionData } from "./Dashboard";
import { PropagateLoader } from "react-spinners";
import CustomButton from "./CustomButton";
import { IoColorWandSharp } from "react-icons/io5";

type Toggle = "technical_skills" | "bullets";

interface Props {
  data: SuggestionData;
  setData: React.Dispatch<React.SetStateAction<SuggestionData>>;
  suggestionLoading: boolean;
  updateLoading: boolean;
  handleUpdate: (fileName: string) => void;
}

// TODO: Loading indicators and state variables for when Update is loading

const SuggestionTabs = ({
  data,
  setData,
  suggestionLoading,
  updateLoading,
  handleUpdate,
}: Props) => {
  const [toggle, setToggle] = useState<Toggle>("technical_skills");
  const [fileName, setFileName] = useState<string>("");
  const tabs: { id: Toggle; label: string }[] = [
    { id: "technical_skills", label: "Skills" },
    { id: "bullets", label: "Bullets" },
  ];

  // Marks data at index as removed
  const handleRemoveItem = (
    category: "technical_skills" | "bullets",
    index: number
  ) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map(
        (item, i) =>
          i === index ? { ...item, isRemoved: !item.isRemoved } : item // Toggle isRemoved
      ),
    }));
  };

  // Editing Bullet Points
  const handleEditDataPoint = (index: number, newValue: string) => {
    setData((prevData) => ({
      ...prevData,
      [toggle]: prevData[toggle].map((item, i) =>
        i === index ? { ...item, new: newValue } : item
      ),
    }));
  };

  return (
    <div className="w-full p-4">
      <div className="flex gap-3 font-syncopate mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-1 transition-colors border-b-2 ${
              toggle === tab.id
                ? "text-purple-600 border-purple-600"
                : "text-gray-500 hover:text-gray-700 border-white"
            }`}
            onClick={() => setToggle(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {suggestionLoading ? (
        <div className="flex justify-center items-center h-32">
          <PropagateLoader color="#9810fa" />
        </div>
      ) : (
        <>
          {data.technical_skills.length === 0 && data.bullets.length === 0 ? (
            <div className="flex justify-center items-center text-sm h-20 font-syncopate text-gray-400">
              <p>Enhance Resume to View Suggestions</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-row items-center gap-2">
                <span className="font-syncopate text-purple-600">
                  New File Name :
                </span>
                <input
                  className="border-[0.5px] min-w-[300px] rounded-sm p-2 font-funnelsans"
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter a file name for the new resume."
                />
              </div>
              <List
                dataPoints={
                  toggle === "technical_skills"
                    ? data.technical_skills
                    : data.bullets
                }
                removeDataPoint={(index) => handleRemoveItem(toggle, index)}
                editDataPoint={(index, newVal) =>
                  handleEditDataPoint(index, newVal)
                }
                tabKey={toggle}
              />
              <CustomButton
                loading={updateLoading}
                handleClick={() => handleUpdate(fileName)}
                placeHolder="Update Docs"
                Icon={<IoColorWandSharp className="text-xl font-extralight" />}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SuggestionTabs;
