import { useEffect } from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = userState(null);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    const response = await fetch(MENU_URL + resId);
    const data = await response.json();
    setResInfo(data);
  };

  return resInfo;
};

export default useRestaurantMenu;
