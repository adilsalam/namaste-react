const ItemList = ({ itemData }) => {
  console.log(itemData);

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
        <button className="bg-black text-white text-nowrap p-1 rounded-lg p-2">
          Add +
        </button>
      </div>
    </div>
  );
};

export default ItemList;
