import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ItemCategory from "./ItemCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    costForTwoMessage,
    cuisines = [],
  } = resInfo?.data?.cards[2]?.card?.card?.info || {};

  const category =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (item) => item.card?.card?.["@type"]?.includes("NestedItemCategory")
    );

  return (
    <div className="text-center">
      <p className="font-bold text-lg">{name}</p>
      <span>
        {cuisines.join(", ")} - {costForTwoMessage}
      </span>
      {category.map((item, index) => (
        <ItemCategory
          key={item?.card?.card?.title}
          data={item?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
