import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils";
import { prepareFormData, validateJobData } from "../utils/createJobUtil";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useCreateJobHandlers = ({
  jobData,
  setJobData,
  validationErrors,
  setValidationErrors,
  requirementInput,
  setRequirementInput,
  skillInput,
  setSkillInput,
}) => {
  const navigate = useNavigate();

  const addRequirement = () => {
    if (requirementInput && !jobData.requirements.includes(requirementInput)) {
      setJobData((prevData) => ({
        ...prevData,
        requirements: [...prevData.requirements, requirementInput],
      }));
      setRequirementInput("");
    }
  };

  const removeRequirement = (requirement) => {
    setJobData((prevData) => ({
      ...prevData,
      requirements: prevData.requirements.filter((r) => r !== requirement),
    }));
  };

  const addSkill = () => {
    if (skillInput && !jobData.skills.includes(skillInput)) {
      setJobData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, skillInput],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setJobData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((s) => s !== skill),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setValidationErrors({ ...validationErrors, [name]: "" });
    setJobData((prevData) => ({
      ...prevData,
      [name]: files?.length ? files[0] : value,
    }));
  };

  const handleCancel = async () => navigate("/admin/jobs");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateJobData(jobData);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }

    try {
      const formData = prepareFormData(jobData);
      const response = await axios.post(
        `${JOB_API_ENDPOINT}/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  return {
    addRequirement,
    removeRequirement,
    addSkill,
    removeSkill,
    handleInputChange,
    handleCancel,
    handleSubmit,
  };
};

export default useCreateJobHandlers;
