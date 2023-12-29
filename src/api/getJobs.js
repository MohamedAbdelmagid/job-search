import axios from "axios";

const getJobs = async () => {
  const jobsURL = import.meta.env.VITE_API_URL + "/jobs";
  const response = await axios.get(jobsURL);
  return response.data;
};

export default getJobs;
