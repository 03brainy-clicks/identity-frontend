import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchCards = async () => {
  try {
    const response = await axios.get(
      "https://identity-production.up.railway.app/api/cards"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
};

const Cards = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("name");
  const { isLoading, error, data } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  // Display loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex-1 space-y-5">
      <div className="flex items-center gap-3 sticky">
        <h3 className="text-lg font-bold text-center ">IDENTITY</h3>
        <Link to={"/create"}>
          <button className="py-1 px-3 bg-black text-white rounded text-sm">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>
        <div className="ml-auto">
          <div className="flex gap-3 items-center ">
            <select
              name="filter"
              className="text-sm bg-black py-1 rounded text-white px-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="interest">Interest</option>
              <option value="id">Id</option>
            </select>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-1 px-2 rounded bg-gray-100 w-full text-sm"
              placeholder="Search"
            />
            <button className="py-1 px-3 bg-black text-white rounded text-sm">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-5 bg-white pt-5">
        {data.cards.map((card) => {
          return <Card user={card} key={card._id} />;
        })}
      </div>
    </div>
  );
};

export default Cards;
