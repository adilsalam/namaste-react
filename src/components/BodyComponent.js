import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const BodyComponent = () => {
  const [resList, setresList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const PromotedRestaurant = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.08950&lng=80.27390&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await response.json();
    setresList(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus !== true) {
    return <h1>Looks like you are offline!</h1>;
  }

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-4 m-4">
      <div>
        <input
          type="text"
          className="border border-solid border-black my-4 py-1 px-2"
          placeholder="Please type here"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="bg-orange-400 text-white rounded-md px-4 py-1 ml-4 my-4"
          type="submit"
          onClick={() => {
            const filteredList = resList.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Search
        </button>
        <button
          className="bg-orange-400 text-white rounded-md px-4 py-1 ml-4 my-4"
          onClick={() => {
            const newList = resList.filter((res) => res.info.avgRating > 4.5);
            setresList(newList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container  flex flex-wrap gap-5 mt-4">
        {filteredRestaurant.map((res) => (
          <Link to={"/restaurant/" + res.info.id} key={res.info.id}>
            {res.info.avgRating > 4.3 ? (
              <PromotedRestaurant resData={res} />
            ) : (
              <RestaurantCard resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BodyComponent;
