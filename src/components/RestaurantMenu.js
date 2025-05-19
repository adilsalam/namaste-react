import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ItemCategory from "./ItemCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

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
      {category.map((item) => (
        <ItemCategory key={item?.card?.card?.title} data={item?.card?.card} />
      ))}
    </div>
  );
};

export default RestaurantMenu;
