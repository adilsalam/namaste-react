import ItemList from "./ItemList";

const ItemCategory = ({ data, showItems, setShowIndex }) => {
  return (
    <div className="bg-gray-200 w-2/4 mx-auto my-3 p-4 rounded-md  shadow-md  ">
      <div
        className="flex justify-between text-lg cursor-pointer"
        onClick={setShowIndex}
      >
        <span className="font-semibold">
          {data?.title} ({data?.categories[0].itemCards?.length})
        </span>
        <span>{!showItems ? "🔽" : "🔼"}</span>
      </div>
      {showItems &&
        data?.categories[0].itemCards?.map((item) => (
          <ItemList key={item?.card?.info?.id} itemData={item} />
        ))}
    </div>
  );
};

export default ItemCategory;
