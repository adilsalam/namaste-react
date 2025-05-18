import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, sla } = resData?.info;

  return (
    <div className="res-card p-4 w-[250px] rounded-lg  bg-slate-200 hover:bg-slate-400">
      <img
        className="rounded-lg object-cover h-48 w-56"
        src={CDN_URL + resData.info.cloudinaryImageId}
      />
      <div className="font-semibold py-2">{name}</div>
      <div>{cuisines.join(", ")}</div>
      <div>{avgRating}</div>
      <div>{sla.slaString}</div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="bg-green-600 text-white px-3 py-1 rounded-md absolute">
          Highly Rated
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
