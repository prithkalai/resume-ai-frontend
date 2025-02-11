import { useState } from "react";
import List from "./List";
import { SuggestionData } from "./Dashboard";

type Toggle = "technical_skills" | "bullets";

interface Props {
  data: SuggestionData;
  setData: React.Dispatch<React.SetStateAction<SuggestionData>>;
}

const SuggestionTabs = ({ data, setData }: Props) => {
  const [toggle, setToggle] = useState<Toggle>("technical_skills");
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
      {data ? (
        <List
          dataPoints={
            toggle === "technical_skills" ? data.technical_skills : data.bullets
          }
          removeDataPoint={(index) => handleRemoveItem(toggle, index)}
          editDataPoint={(index, newVal) => handleEditDataPoint(index, newVal)}
          tabKey={toggle}
        />
      ) : (
        <p>Enhance Resume to View Suggestions</p>
      )}
    </div>
  );
};

export default SuggestionTabs;
