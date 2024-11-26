import styled from "styled-components";

import ButtonNeutral from "../../../ui/Buttons/ButtonNeutral.jsx";
import Row from "../../../ui/Row.jsx";
import Heading from "../../../ui/Heading.jsx";
import Button from "../../../ui/Buttons/Button.jsx";
import PersonalInfo from "./PersonalInfo.jsx";

function UserDetails({
  firstName,
  lastName,
  postLength,
  registerDate,
  isCurrentUser,
  gender,
  dateOfBirth,
  title,
}) {
  return (
    <UserDetail isCurrentUser={isCurrentUser}>
      <Row type="horizontal-around">
        <StyledHeading as="h3">
          <span>{title}</span> {firstName}_{lastName}
        </StyledHeading>
        <RecreatedBtn isCurrentUser={isCurrentUser}>
          {isCurrentUser ? "Edit profile" : "Message"}
        </RecreatedBtn>
      </Row>
      <StyledRow>
        <PersonalInfo
          postLength={postLength}
          gender={gender}
          dateOfBirth={dateOfBirth}
          registerDate={registerDate}
        />
      </StyledRow>
    </UserDetail>
  );
}

export default UserDetails;

const UserDetail = styled.div`
  margin-top: 3rem;

  & h3 {
    font-weight: var(--font-weight-regular);
  }
`;

const RecreatedBtn = styled(({ isCurrentUser, ...props }) =>
  isCurrentUser ? <ButtonNeutral {...props} /> : <Button {...props} />
)`
  margin-left: 3rem;
`;

const StyledRow = styled(Row)`
  width: 100%;
  margin-top: 5rem;

  & h6 {
    font-size: var(--font-size-small);
  }
`;

const StyledHeading = styled(Heading)`
  & span {
    font-size: var(--font-size-small);
    color: var(--color-neutral-300);
  }
`;
