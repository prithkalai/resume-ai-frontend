import { useState } from "react";
import JDResumeInput from "./JDResumeInput";
import SuggestionTabs from "./SuggestionTabs";
import apiClient, { AISuggestions } from "../api-service/apiClient";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";

export type ListData = { old: string; new: string; isRemoved: boolean };
export type SuggestionData = {
  technical_skills: ListData[];
  bullets: ListData[];
};

// TODO: Error Handling across the whole applications
// TODO: Toast components to show success and failures. (Only after upload)

const Dashboard = () => {
  const [data, setData] = useState<SuggestionData>({
    technical_skills: [],
    bullets: [],
  });
  const [suggestionLoading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  const handleEnhance = async (resume: string, jobDescription: string) => {
    // Send JD and Resume to server
    try {
      setLoading(true);

      if (resume.length == 0 || jobDescription.length == 0) {
        toast("Resume/Job Description cannot be empty!!", {
          type: "error",
        });
        setLoading(false);
        return;
      }

      const { data: suggestions } = await apiClient.enhanceResume(
        resume,
        jobDescription
      );
      // Recieve Suggestion from Server

      console.log(suggestions);

      // Update the data to have an isRemoved flag.
      const modifiedData: SuggestionData = {
        technical_skills: suggestions.technical_skills.map((item) => ({
          ...item,
          isRemoved: false,
        })),
        bullets: suggestions.bullets.map((item) => ({
          ...item,
          isRemoved: false,
        })),
      };

      setData(modifiedData);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError)
        toast("Something went wrong. Please try again.", { type: "error" });
      console.log(error);

      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    // Loading : True
    try {
      setUpdateLoading(true);

      // Restructure data for the API
      const approvedData: AISuggestions = {
        technical_skills: data.technical_skills
          .filter((item) => !item.isRemoved) // Remove items with isRemoved: true
          .map(({ isRemoved, ...rest }) => rest), // Remove isRemoved property

        bullets: data.bullets
          .filter((item) => !item.isRemoved)
          .map(({ isRemoved, ...rest }) => rest),
      };

      await toast.promise(apiClient.updateGoogleDocs(approvedData), {
        pending: "Updating Google Docs..",
        success: "Update Successful!",
        error: "Error Updating Google Docs!",
      });

      setData({
        technical_skills: [],
        bullets: [],
      });
      setUpdateLoading(false);
    } catch (error) {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      <JDResumeInput
        enhanceResume={(resume, jobDescription) =>
          handleEnhance(resume, jobDescription)
        }
        suggestionLoading={suggestionLoading}
        updateLoading={updateLoading}
      />
      <SuggestionTabs
        data={data}
        setData={setData}
        suggestionLoading={suggestionLoading}
        updateLoading={updateLoading}
        handleUpdate={handleUpdate}
      />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default Dashboard;
