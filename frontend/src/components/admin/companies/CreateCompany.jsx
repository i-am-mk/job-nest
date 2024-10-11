import { useState } from "react";
import PropTypes from "prop-types";
import { Textarea, Button, Input, Label } from "@/components/ui";
import { useCreateCompanyHandler } from "../hooks";

const CreateCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { handleInputChange, handleCancel, handleSubmit } =
    useCreateCompanyHandler({
      companyData,
      setCompanyData,
      validationErrors,
      setValidationErrors,
    });

  return (
    <div>
      <div className="max-w-4xl mx-auto my-20">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h1 className="font-bold text-2xl">Create Your Company</h1>
            <p>Fill in the details below to create your company.</p>
          </div>

          <FormField
            id="name"
            label="Company Name"
            type="text"
            placeholder="Google, Microsoft, etc"
            value={companyData.name}
            onChange={handleInputChange}
          />
          {validationErrors.name && (
            <p className="text-red-600 mt-1">{validationErrors.name}</p>
          )}

          <FormField
            id="description"
            label="Description"
            type="textarea"
            placeholder="A short description of your company"
            value={companyData.description}
            onChange={handleInputChange}
          />
          {validationErrors.description && (
            <p className="text-red-600 mt-1">{validationErrors.description}</p>
          )}

          <FormField
            id="website"
            label="Website"
            type="text"
            placeholder="https://yourcompany.com"
            value={companyData.website}
            onChange={handleInputChange}
          />
          {validationErrors.website && (
            <p className="text-red-600 mt-1">{validationErrors.website}</p>
          )}

          <FormField
            id="location"
            label="Location"
            type="text"
            placeholder="City, Country"
            value={companyData.location}
            onChange={handleInputChange}
          />
          {validationErrors.location && (
            <p className="text-red-600 mt-1">{validationErrors.location}</p>
          )}

          <div className="my-6">
            <Label htmlFor="companyLogo">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              name="logo"
              onChange={handleInputChange}
              className="max-w-1xl"
            />
            {validationErrors.logo && (
              <p className="text-red-600 mt-1">{validationErrors.logo}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              disabled={Object.values(validationErrors).some((e) => e != "")}
              type="submit"
            >
              Create Company
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
}) => (
  <div className="mt-5">
    <Label htmlFor={id}>{label}</Label>
    {type === "textarea" ? (
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="max-w-4xl"
        placeholder={placeholder}
        rows={4}
      />
    ) : (
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className="max-w-4xl"
        placeholder={placeholder}
        required={required}
      />
    )}
    {error && <p className="text-red-600">{error}</p>}
  </div>
);

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "textarea"]).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default CreateCompany;
