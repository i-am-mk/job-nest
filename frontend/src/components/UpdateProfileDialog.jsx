import { useState } from "react";
import {
  Button,
  Input,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "./utils/constant";
import { setUser } from "@/redux/authSlice";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ openProfileDialog, setOpenProfileDialog }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    profilePhoto: user?.profile?.profilePhoto || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    resume: user?.profile?.resume || "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files && files.length ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      bio: "",
    };

    if (!formData.firstName) {
      errors.firstName = "First Name is required.";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First Name must be at least 2 characters long.";
    } else if (formData.firstName.length > 50) {
      errors.firstName = "First Name cannot exceed 50 characters.";
    }

    if (!formData.lastName) {
      errors.lastName = "Last Name is required.";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last Name must be at least 2 characters long.";
    } else if (formData.lastName.length > 50) {
      errors.lastName = "Last Name cannot exceed 50 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address.";
    } else if (formData.email.length > 254) {
      errors.email = "Email cannot exceed 254 characters.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "Invalid phone number. It should be a 10-digit number.";
    } else if (formData.phoneNumber.length > 15) {
      errors.phoneNumber = "Phone Number cannot exceed 15 characters.";
    }

    if (formData.bio && formData.bio.length > 500) {
      errors.bio = "Bio cannot exceed 500 characters.";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const addSkill = () => {
    const trimmedSkill = skillInput.trim().toUpperCase();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, trimmedSkill],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((s) => s !== skill),
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("resume", formData.resume);
      formDataToSend.append("profilePhoto", formData.profilePhoto);
      formData.skills.forEach((skill, index) => {
        formDataToSend.append(`skills[${index}]`, skill);
      });

      formDataToSend.append("bio", formData.bio || "");

      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setOpenProfileDialog(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openProfileDialog}
      onClose={() => setOpenProfileDialog(false)}
    >
      <DialogContent className="max-w-4xl p-4">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md"
              placeholder="Enter your first name"
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-xs">{formErrors.firstName}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md"
              placeholder="Enter your last name"
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-xs">{formErrors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md"
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-md"
              placeholder="Enter your phone number"
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-xs">{formErrors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-md p-2 h-24"
              placeholder="Enter a short bio"
            />
            {formErrors.bio && (
              <p className="text-red-500 text-xs">{formErrors.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="file">
              Resume
            </label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="col-span-2">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="profilePhoto"
            >
              Profile Picture
            </label>
            <Input
              type="file"
              accept="image/*"
              id="profile"
              name="profilePhoto"
              onChange={handleChange}
              className="cursor-pointer"
            />
            {formData.profilePhoto && (
              <p className="text-gray-300 text-sm mt-1">
                Selected file: {formData.profilePhoto}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="skills">
              Skills
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                id="skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-grow rounded-md"
                placeholder="Add a skill"
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                Add Skill
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center"
                >
                  {skill}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeSkill(skill)}
                  >
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpenProfileDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

UpdateProfileDialog.propTypes = {
  openProfileDialog: PropTypes.bool.isRequired,
  setOpenProfileDialog: PropTypes.func.isRequired,
};

export default UpdateProfileDialog;
