import React from "react";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({ user }) => {
  // Function to handle card deletion
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://identity-production.up.railway.app/api/cards/${user?._id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting card");
    }
  };

  return (
    <div className="p-5 text-sm shadow-md space-y-2 rounded">
      {/* Header with user name and edit link */}
      <div className="flex gap-1 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold font-lg ">{user.name}</h2>
          {/* Link to the update page */}
          <Link to={`/update/${user?._id}`}>
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer text-gray-700 hover:text-blue-500 animate"
            />
          </Link>
        </div>
        {/* Delete button */}
        <FontAwesomeIcon
          onClick={handleDelete}
          icon={faTrash}
          className="cursor-pointer text-gray-700 hover:text-red-500 animate"
        />
      </div>
      {/* Description section */}
      <p className="line-clamp-4 text-gray-700">{user.description}</p>
      {/* Interest section */}
      <div>
        <h4 className="font-medium">Interest</h4>
        <p className="line-clamp-2 text-gray-700 mt-1 space-y-1 space-x-1">
          {user.interest.map((item) => (
            <span className="p-1 text-xs bg-gray-100 rounded" key={item}>
              {item}
            </span>
          ))}
        </p>
      </div>
      {/* Social media links */}
      <div className="space-x-2 text-gray-700">
        {user.social.instagram && (
          <a href={user.social.instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="cursor-pointer"
            />
          </a>
        )}
        {user.social.linkedIn && (
          <a href={user.social.linkedIn} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faLinkedin}
              size="lg"
              className="cursor-pointer"
            />
          </a>
        )}
        {user.social.github && (
          <a href={user.social.github} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faGithub}
              size="lg"
              className="cursor-pointer"
            />
          </a>
        )}
        {user.social.twitter && (
          <a href={user.social.twitter} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faTwitter}
              size="lg"
              className="cursor-pointer"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
