import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter.js";

function NavLinkItem({ icon, iconActive, title }) {
  const location = useLocation();

  // Check if the current location matches the NavLink's destination
  const isActive =
    title.toLowerCase() === "home"
      ? location.pathname === "/"
      : location.pathname.includes(`/${title.toLowerCase()}`);

  return (
    <>
      {isActive ? iconActive : icon}
      <span>{capitalizeFirstLetter(title)}</span>
    </>
  );
}

export default NavLinkItem;
