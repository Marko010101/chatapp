import styled from "styled-components";

import Row from "../../ui/Row.jsx";
import defaultImage from "../../assets/default-user.jpg";
import { fixedSizeFullName } from "../../utils/fixedSizeFullName.js";
import { getFormattedDate } from "../../utils/getFormattedDate.js";
import ButtonNeutral from "../../ui/Buttons/ButtonNeutral.jsx";
import { useNavigate } from "react-router-dom";

const EmptyChat = ({ user }) => {
  const navigate = useNavigate();
  const { firstName, lastName, email, registerDate, id } = user;
  const picture = user?.picture || defaultImage;
  const formattedDate = getFormattedDate(registerDate);
  return (
    <StyledEmptyChat>
      <img src={picture} alt={`${firstName}'s image`} />
      <h3>{fixedSizeFullName(firstName, lastName, 50)}</h3>
      <h4>{email}</h4>
      <h5>{formattedDate}</h5>
      <ButtonNeutral onClick={() => navigate(`/profile/${id}`)}>
        View Profile
      </ButtonNeutral>
    </StyledEmptyChat>
  );
};

export default EmptyChat;

const StyledEmptyChat = styled(Row)`
  align-items: center;
  margin-top: 3rem;
  gap: 0.5rem;
  & img {
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
  }

  & h3 {
    margin-top: 1rem;
    font-weight: var(--font-weight-regular);
  }
  & h4 {
    font-weight: var(--font-weight-regular);
    color: var(--color-neutral-300);
  }
  & h5 {
    font-weight: var(--font-weight-regular);
    color: var(--color-neutral-500);
  }
  & > button {
    font-size: var(--font-size-small);
  }
`;
