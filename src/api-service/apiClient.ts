import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/resume",
});

type APIEntity = { old: string; new: string };
export type AISuggestions = {
  technical_skills: APIEntity[];
  bullets: APIEntity[];
};
type APIResponse = {
  data: AISuggestions;
};

class APIClient {
  enhanceResume = (
    resume: string,
    jobDescription: string
  ): Promise<APIResponse> => {
    return AxiosInstance.post("/completion", {
      job: jobDescription,
      resume: resume,
    });
  };

  updateGoogleDocs = (approvedData: AISuggestions) => {
    return AxiosInstance.post("/update", approvedData);
  };
}

export default new APIClient();
