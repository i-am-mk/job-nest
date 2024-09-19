import { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../../common/Navbar";
import { Textarea, Button, Input, Label } from "../../ui";
import useCreateCompanyHandlers from "./hooks/useCreateCompanyHandler";

const CreateCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { handleInputChange, handleSubmit } = useCreateCompanyHandlers({
    companyData,
    setCompanyData,
    setValidationErrors,
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-20">
        <form onSubmit={handleSubmit}>
          <div>
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
            error={validationErrors.name}
            required
          />

          <FormField
            id="description"
            label="Description"
            type="textarea"
            placeholder="A short description of your company"
            value={companyData.description}
            onChange={handleInputChange}
            error={validationErrors.description}
          />

          <FormField
            id="website"
            label="Website"
            type="text"
            placeholder="https://yourcompany.com"
            value={companyData.website}
            onChange={handleInputChange}
            error={validationErrors.website}
          />

          <FormField
            id="location"
            label="Location"
            type="text"
            placeholder="City, Country"
            value={companyData.location}
            onChange={handleInputChange}
            error={validationErrors.location}
          />

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
              <p className="text-red-600">{validationErrors.logo}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Create Company</Button>
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
  <div className="my-6">
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
