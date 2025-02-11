import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ListData } from "./Dashboard";
import { CiSaveDown2 } from "react-icons/ci";
import { FiEdit, FiSave } from "react-icons/fi";

interface Props {
  dataPoints: ListData[];
  removeDataPoint: (index: number) => void;
  editDataPoint: (index: number, newValue: string) => void;
  tabKey: string;
}

const List = ({
  dataPoints,
  removeDataPoint,
  editDataPoint,
  tabKey,
}: Props) => {
  const [editVal, setEditVal] = useState<{ [key: number]: string }>({});
  const [currentTab, setCurrentTab] = useState(tabKey);

  // Reset editing when switching between tabs
  useEffect(() => {
    if (currentTab !== tabKey) {
      setEditVal({});
      setCurrentTab(tabKey);
    }
  }, [tabKey]);

  const handleEditChange = (index: number, value: string) => {
    setEditVal((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSaveClick = (index: number) => {
    if (editVal[index] !== undefined) {
      editDataPoint(index, editVal[index]);
    }
    setEditVal((prev) => {
      const updatedValues = { ...prev };
      delete updatedValues[index]; // Exit edit mode after saving
      return updatedValues;
    });
  };

  const handleRemoveClick = (index: number) => {
    removeDataPoint(index);

    // Exit edit mode for the removed item
    setEditVal((prev) => {
      const updatedValues = { ...prev };
      delete updatedValues[index];
      return updatedValues;
    });
  };

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {dataPoints.map((data, index: number) => (
          <li
            key={index}
            className={`flex justify-between items-center text-lg font-funnelsans gap-4
              p-2 border-b-[0.5px] border-l-[0.5px] rounded-bl-md border-purple-600 transition-colors
              ${data.isRemoved ? "bg-red-100 pointer-events-none" : ""}`}
          >
            <div className="flex flex-col w-full">
              <p className="text-gray-400">{data.old}</p>

              {/* Show either the text or the edit box */}
              {editVal[index] !== undefined ? (
                <input
                  type="text"
                  value={editVal[index]}
                  onChange={(e) => handleEditChange(index, e.target.value)}
                  className="border border-gray-400 rounded-md p-1 text-black w-full"
                />
              ) : (
                <p>{data.new}</p>
              )}
            </div>

            {/* Buttons Section */}
            <div className="flex gap-3 text-2xl">
              {/* Edit button dynamically changes to Save button */}
              {!data.isRemoved && (
                <button
                  onClick={
                    () =>
                      editVal[index] !== undefined
                        ? handleSaveClick(index) // If in edit mode, save changes
                        : setEditVal((prev) => ({ ...prev, [index]: data.new })) // If not, enter edit mode
                  }
                >
                  {editVal[index] !== undefined ? (
                    <FiSave className="text-green-500 hover:text-green-700" />
                  ) : (
                    <FiEdit className="text-blue-500 hover:text-blue-700" />
                  )}
                </button>
              )}

              {/* Remove/Restore button */}
              <button
                className=" pointer-events-auto"
                onClick={() => handleRemoveClick(index)}
              >
                {data.isRemoved ? (
                  <CiSaveDown2 />
                ) : (
                  <RxCross2 className="text-red-500 hover:text-red-700" />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
