import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helpers.js";



function NavLinkItem({ icon, iconActive, title }) {
  const location = useLocation();

  // Check if the current location matches the NavLink's destination
  const isActive = location.pathname === `/${title}`;

  return (
    <>
      {isActive ? iconActive : icon}
      <span>{capitalizeFirstLetter(title) || "Home"}</span>
    </>
  );
}

export default NavLinkItem;
