import styled from "styled-components";

const StyledUser = styled.div``;

function UserLink({ user }) {
  const {
    firstName,
    id,
    lastName,
    title,
    picture = "../../../public/default-user.jpg",
  } = user;
  return <StyledUser>{firstName}</StyledUser>;
}

export default UserLink;
