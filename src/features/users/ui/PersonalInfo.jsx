import styled from "styled-components";
import Heading from "../../../ui/Heading.jsx";
import Row from "../../../ui/Row.jsx";
import { calculateAge } from "../../../utils/calculateAge.js";

function PersonalInfo({ postLength, gender, dateOfBirth, registerDate }) {
  return (
    <StyledPersonalInfo type="horizontal-around">
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

const StyledPersonalInfo = styled(Row)`
  & span {
    font-size: var(--font-size-small);
    color: var(--color-neutral-200);
  }
`;
