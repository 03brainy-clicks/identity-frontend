import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import zod from "zod";

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

const UpdateForm = () => {
  // Extracting parameters from the URL
  const { id } = useParams();

  // State variables
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

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Handle changes in the interest input field
  const handleInterestChange = useCallback((e) => {
    setInterest(e.target.value);
  }, []);

  // Handle changes in the social input fields
  const handleSocialChange = useCallback((key, value) => {
    setSocial((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Add interest to the list
  const handleAddInterest = useCallback(
    (e) => {
      e.preventDefault();
      setInterests([...interests, interest]);
      setInterest("");
    },
    [interest, interests]
  );

  // Reset all form fields
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
        await axios.put(
          `https://identity-production.up.railway.app/api/cards/${id}`,
          data
        );

        // Log success and navigate back to the home page
        console.log("Card updated successfully!");
        handleReset();
        navigate("/");
      } catch (error) {
        console.error("Validation error:", error.errors);
      }
    },
    [id, name, description, interests, social, handleReset, navigate]
  );

  // Fetch card data when the component mounts
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `https://identity-production.up.railway.app/api/cards/${id}`
        );
        const cardData = response.data.card;

        // Update state with fetched card data
        setDescription(cardData.description);
        setInterests(cardData.interest);
        setName(cardData.name);
        setSocial(cardData.social);
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching data");
      }
    };

    // Call the fetchCard function
    fetchCard();
  }, [id]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between sticky">
        <h3 className="text-lg font-bold ">IDENTITY</h3>
        <Link to={"/"}>
          <button
            type="submit"
            className="py-1 px-5 bg-black text-white rounded text-sm ml-auto"
          >
            Back
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="mx-auto p-5  shadow-md rounded">
          <h3 className="text-lg font-bold mb-3">Update</h3>
          <form className="text-sm space-y-3" onSubmit={handleSubmit}>
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
              <div className="mt-2 space-x-2">
                {interests &&
                  interests.map((items) => (
                    <span
                      className="p-1 text-xs bg-gray-100 rounded"
                      key={items}
                    >
                      {items}
                    </span>
                  ))}
              </div>
            </div>
            <div>
              <label htmlFor="social">Social</label> <br />
              <div className="space-y-1">
                <input
                  type="text"
                  value={social.linkedIn}
                  onChange={(e) =>
                    handleSocialChange("linkedIn", e.target.value)
                  }
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="LinkedIn"
                />
                <input
                  type="text"
                  value={social.github}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="GitHub"
                />
                <input
                  type="text"
                  value={social.instagram}
                  onChange={(e) =>
                    handleSocialChange("instagram", e.target.value)
                  }
                  className="py-1 px-2 rounded bg-gray-100 w-full"
                  placeholder="Instagram"
                />
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
            <div className="flex gap-3 ">
              {" "}
              <button
                type="submit"
                className="py-1 px-5 bg-black text-white rounded text-sm ml-auto"
              >
                Updata card
              </button>{" "}
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

export default UpdateForm;
