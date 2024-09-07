import styled from "styled-components";
import { calculateAge } from "../../../utils/helpers.js";
import Heading from "../../../ui/Heading.jsx";

const StyledPersonalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  & span {
    font-size: var(--font-size-small);
    color: var(--color-neutral-200);
  }
`;

function PersonalInfo({ postLength, gender, dateOfBirth, registerDate }) {
  return (
    <StyledPersonalInfo>
      <Heading as="h6">
        {postLength > 0 ? (
          <span>Posts {postLength}</span>
        ) : (
          <span>No posts</span>
        )}
      </Heading>
      {gender && dateOfBirth ? (
        <>
          <span>{gender}</span>
          <span>{calculateAge(dateOfBirth)} Years old</span>
        </>
      ) : (
        <p>Registered: {new Date(registerDate).toLocaleDateString()}</p>
      )}
    </StyledPersonalInfo>
  );
}

export default PersonalInfo;
