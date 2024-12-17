import useHover from "../../../../hooks/useHover.js";
import OwnerImage from "../../../posts/ui/OwnerImage.jsx";
import UserProfileOnHover from "../../UserProfileOnHover.jsx";
import HoverableRow from "./HoverableRow.jsx";

const HoveredImg = ({ user, isSuggestedPage, left, haveBorder }) => {
  const {
    isHovered: isImageHovered,
    handleMouseEnter: handleImageMouseEnter,
    handleMouseLeave: handleImageMouseLeave,
  } = useHover();
  const { id, picture } = user || {};

  return (
    <HoverableRow
      handleMouseEnter={handleImageMouseEnter}
      handleMouseLeave={handleImageMouseLeave}
      isHovered={isImageHovered}
      hoverContent={
        <UserProfileOnHover
          user={user}
          left={left}
          isSuggestedPage={isSuggestedPage}
          haveBorder={haveBorder}
        />
      }
    >
      <OwnerImage ownerPicture={picture} id={id} haveBorder={haveBorder} />
    </HoverableRow>
  );
};

export default HoveredImg;
