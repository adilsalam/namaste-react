import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ itemData }) => {
  const dispatch = useDispatch();

  const handleAddClick = (item) => {
    dispatch(addItem(item));
    console.log(item);
  };

  return (
    <div className="border-b-2 border-gray-50 flex p-4 justify-between text-sm items-center">
      <div className="text-left   p-2">
        <p>{itemData?.card?.info?.name}</p>
        <p>
          {itemData?.card?.info?.price / 100 ||
            itemData?.card?.info?.defaultPrice / 100}
        </p>
        <p>{itemData?.card?.info?.description}</p>
      </div>
      <div>
        <button
          className="bg-black text-white text-nowrap rounded-lg p-2"
          onClick={() => handleAddClick(itemData)}
        >
          Add +
        </button>
      </div>
    </div>
  );
};

export default ItemList;
