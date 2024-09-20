import { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../../../common/Navbar";
import { Textarea, Button, Input, Label, Badge } from "../../../ui";
import useCreateJobHandlers from "./hooks/useCreateJobHandler";
import { useSelector } from "react-redux";

const CreateJob = () => {
  const { companies } = useSelector((store) => store.company);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    companyId: "",
    jobType: "",
    experienceLevel: "",
    applicationDeadline: "",
    requirements: [],
    skills: [],
    createdBy: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [requirementInput, setRequirementInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const {
    addRequirement,
    removeRequirement,
    addSkill,
    removeSkill,
    handleInputChange,
    handleCancel,
    handleSubmit,
  } = useCreateJobHandlers({
    jobData,
    setJobData,
    validationErrors,
    setValidationErrors,
    requirementInput,
    setRequirementInput,
    skillInput,
    setSkillInput,
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-20">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="mb-6 col-span-2">
            <h1 className="font-bold text-2xl">Create Your Job</h1>
            <p className="text-base">
              Fill in the details below to create your job.
            </p>
          </div>

          <div className="col-span-2 mb-4">
            <FormField
              id="title"
              label="Job Title"
              type="text"
              placeholder="Software Engineer, Product Manager, etc"
              value={jobData.title}
              onChange={handleInputChange}
              error={validationErrors.title}
            />
          </div>

          <div className="col-span-2 mb-4">
            <FormField
              id="description"
              label="Description"
              type="textarea"
              placeholder="A short description of your job"
              value={jobData.description}
              onChange={handleInputChange}
              error={validationErrors.description}
            />
          </div>

          <FormField
            id="salary"
            label="Salary"
            type="number"
            placeholder="100000"
            value={jobData.salary}
            onChange={handleInputChange}
            error={validationErrors.salary}
          />

          <FormField
            id="location"
            label="Location"
            type="text"
            placeholder="City, Country"
            value={jobData.location}
            onChange={handleInputChange}
            error={validationErrors.location}
          />

          <FormField
            id="companyId"
            label="Company"
            type="select"
            options={(companies || []).map((company) => ({
              value: company._id,
              label: company.name,
            }))}
            value={jobData.companyId}
            onChange={handleInputChange}
            error={validationErrors.companyId}
          />

          <FormField
            id="jobType"
            label="Job Type"
            type="select"
            options={[
              { value: "FULL-TIME", label: "Full-Time" },
              { value: "PART-TIME", label: "Part-Time" },
              { value: "CONTRACT", label: "Contract" },
              { value: "INTERNSHIP", label: "Internship" },
            ]}
            value={jobData.jobType}
            onChange={handleInputChange}
            error={validationErrors.jobType}
          />

          <FormField
            id="experienceLevel"
            label="Experience Level"
            type="number"
            placeholder="3"
            value={jobData.experienceLevel}
            onChange={handleInputChange}
            error={validationErrors.experienceLevel}
          />

          <FormField
            id="applicationDeadline"
            label="Application Deadline"
            type="date"
            value={jobData.applicationDeadline}
            onChange={handleInputChange}
            error={validationErrors.applicationDeadline}
          />

          <div className="col-span-2 mb-4">
            <Label htmlFor="requirements">Requirements</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="text"
                id="requirements"
                name="requirements"
                value={requirementInput}
                onChange={(e) => {
                  const { name } = e.target;
                  setValidationErrors({ ...validationErrors, [name]: "" });
                  setRequirementInput(e.target.value);
                }}
                className="flex-grow rounded-md"
                placeholder="Add a requirement"
              />
              <Button type="button" variant="outline" onClick={addRequirement}>
                Add Requirement
              </Button>
            </div>
            {validationErrors.requirements && (
              <p className="text-red-600 mt-1">
                {validationErrors.requirements}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {jobData.requirements.map((requirement, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center"
                >
                  {requirement}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeRequirement(requirement)}
                  >
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="col-span-2 mb-4">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="text"
                id="skills"
                name="skills"
                value={skillInput}
                onChange={(e) => {
                  const { name } = e.target;
                  setValidationErrors({ ...validationErrors, [name]: "" });
                  setSkillInput(e.target.value);
                }}
                className="flex-grow rounded-md"
                placeholder="Add a skill"
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                Add Skill
              </Button>
            </div>
            {validationErrors.skills && (
              <p className="text-red-600 mt-1">{validationErrors.skills}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {jobData.skills.map((skill, index) => (
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

          <div className="flex justify-end gap-4 col-span-2 mt-6 mb-6">
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              disabled={Object.values(validationErrors).some((e) => e !== "")}
              type="submit"
            >
              Create Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  required,
  options,
}) => (
  <div className="mt-2">
    <Label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </Label>
    {type === "textarea" ? (
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        rows={4}
      />
    ) : type === "select" ? (
      <div className="relative mt-1">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    ) : (
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
      />
    )}
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "textarea", "select", "date"]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default CreateJob;
