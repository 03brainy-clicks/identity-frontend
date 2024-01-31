import axios from "axios";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import zod from "zod";

// Define a Zod schema for form validation
const schema = zod.object({
  name: zod.string(),
  description: zod.string(),
  interest: zod.array(zod.string()),
  social: zod.object({
    github: zod.string(),
    instagram: zod.string(),
    linkedIn: zod.string(),
    twitter: zod.string(),
  }),
});

const Form = () => {
  // State variables for form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);
  const [social, setSocial] = useState({
    github: "",
    instagram: "",
    linkedIn: "",
    twitter: "",
  });

  // Navigation hook for redirecting after form submission
  const navigate = useNavigate();

  // Handle change in the Interest input field
  const handleInterestChange = useCallback((e) => {
    setInterest(e.target.value);
  }, []);

  // Handle change in the Social input fields
  const handleSocialChange = useCallback((key, value) => {
    setSocial((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Handle adding a new interest to the list
  const handleAddInterest = useCallback(
    (e) => {
      e.preventDefault();
      setInterests((prevInterests) => [...prevInterests, interest]);
      setInterest("");
    },
    [interest]
  );

  // Handle resetting the form
  const handleReset = useCallback(() => {
    setName("");
    setDescription("");
    setInterest("");
    setInterests([]);
    setSocial({
      github: "",
      instagram: "",
      linkedIn: "",
      twitter: "",
    });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const data = {
          name,
          description,
          interest: interests,
          social,
        };

        // Validate using Zod schema
        schema.parse(data);

        // Proceed with axios request if validation passes
        await axios.post("https://identity-production.up.railway.app/api/cards", data);

        // Reset the form and navigate back to the home page
        handleReset();
        navigate("/");
      } catch (error) {
        console.error("Validation error:", error.errors);
      }
    },
    [name, description, interests, social, handleReset, navigate]
  );

  // JSX structure for the form component
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between sticky">
        <h3 className="text-lg font-bold ">IDENTITY</h3>
        {/* Back button */}
        <Link to={"/"}>
          <button
            type="submit"
            className="py-1 px-5 bg-black text-white rounded text-sm ml-auto"
          >
            Back
          </button>
        </Link>
      </div>
      {/* Form Section */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="mx-auto p-5  shadow-md rounded">
          <h3 className="text-lg font-bold mb-3">Create</h3>
          {/* Actual Form */}
          <form className="text-sm space-y-3" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-1 px-2 rounded bg-gray-100 w-full"
                placeholder="Name"
                required
              />
            </div>
            {/* Interest Input */}
            <div className="">
              <label htmlFor="Interest">Interest</label> <br />
              <div className="flex gap-3 items-center ">
                <input
                  type="text"
                  value={interest}
                  onChange={handleInterestChange}
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="Interest"
                />
                <button
                  onClick={handleAddInterest}
                  className="py-1 px-5 bg-black text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
              {/* Display added interests */}
              <div className="mt-2 space-x-2">
                {interests.map((items) => (
                  <span className="p-1 text-xs bg-gray-100 rounded" key={items}>
                    {items}
                  </span>
                ))}
              </div>
            </div>
            {/* Social Input */}
            <div>
              <label htmlFor="social">Social</label> <br />
              <div className="space-y-1">
                {/* LinkedIn Input */}
                <input
                  type="text"
                  value={social.linkedIn}
                  onChange={(e) =>
                    handleSocialChange("linkedIn", e.target.value)
                  }
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="LinkedIn"
                />
                {/* GitHub Input */}
                <input
                  type="text"
                  value={social.github}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="GitHub"
                />
                {/* Instagram Input */}
                <input
                  type="text"
                  value={social.instagram}
                  onChange={(e) =>
                    handleSocialChange("instagram", e.target.value)
                  }
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="Instagram"
                />
                {/* Twitter Input */}
                <input
                  type="text"
                  value={social.twitter}
                  onChange={(e) =>
                    handleSocialChange("twitter", e.target.value)
                  }
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="Twitter"
                />
              </div>
            </div>
            {/* Description Input */}
            <div>
              <label htmlFor="description">Description</label> <br />
              <textarea
                type="text"
                value={description}
                required
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                className="py-1 px-2 rounded bg-gray-100 w-full "
                placeholder="Description"
              ></textarea>
            </div>
            {/* Form Actions */}
            <div className="flex gap-3 ">
              {/* Submit Button */}
              <button
                type="submit"
                className="py-1 px-5 bg-black text-white rounded text-sm ml-auto"
              >
                Add card
              </button>{" "}
              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="py-1 px-5 text-black border border-black rounded text-sm"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
