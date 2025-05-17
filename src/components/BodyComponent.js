import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import _ from "lodash";

const BodyComponent = () => {
  const count = 8;
  const [resList, setresList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const PromotedRestaurant = withPromotedLabel(RestaurantCard);
  const dataPost = {
    lat: "13.08950",
    lng: "80.27390",
    nextOffset: "CJhlELQ4KIDI252siZDcGTCnEzgD",
    widgetOffset: {
      NewListingView_category_bar_chicletranking_TwoRows: "",
      NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
      Restaurant_Group_WebView_PB_Theme: "",
      Restaurant_Group_WebView_SEO_PB_Theme: "",
      collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "9",
      inlineFacetFilter: "",
      restaurantCountWidget: "",
    },
    filters: {},
    seoParams: {
      seoUrl: "https://www.swiggy.com/restaurants",
      pageType: "FOOD_HOMEPAGE",
      apiName: "FoodHomePage",
      businessLine: "FOOD",
    },
    page_type: "DESKTOP_WEB_LISTING",
    _csrf: "WaN9ZfU8W3BJ-a0uDqQx2lT8poqjOax03MGVNRhM",
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - 5) {
        updateData();
      }
    };
    const throttedScroll = _.throttle(handleScroll, 1000);

    window.addEventListener("scroll", throttedScroll);
  }, []);

  const updateData = async () => {
    const response = await fetch(
      "http://localhost:8080/https://www.swiggy.com/dapi/restaurants/list/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      }
    );
    const data = response.json();
    console.log(data);
  };

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
          className="bg-green-200 px-4 py-1 ml-4 my-4"
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
          className="bg-green-200 px-4 py-1 ml-4 my-4"
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
            {resList.aggregatedDiscountInfoV3 ? (
              <RestaurantCard resData={res} />
            ) : (
              <PromotedRestaurant resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BodyComponent;
