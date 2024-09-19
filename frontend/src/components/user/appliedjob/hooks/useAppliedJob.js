import { APPLICATION_API_ENDPOINT } from "@/components/utils/constant";
import { setApplication } from "@/redux/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAppliedJob = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    try {
      const fetchApplication = async () => {
        const response = await axios.get(
          `${APPLICATION_API_ENDPOINT}/my-applications`,
          {
            params: { userId: user.id },
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setApplication(response.data.applications));
        }
      };

      fetchApplication();
    } catch (error) {
      console.error(error);
    }
  }, []);
};

export default useAppliedJob;
