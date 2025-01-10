import styled, { css } from "styled-components";

import StyledModal from "../../ui/modal/StyledModal.jsx";
import StyledOverlay from "../../ui/modal/StyledOverlay.jsx";
import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import StyledButton from "../../ui/Buttons/StyledButton.jsx";
import { TbCalendarTime } from "react-icons/tb";
import defaultImage from "../../assets/default-user.jpg";
import Row from "../../ui/Row.jsx";
import { useUserById } from "./hooks/useUserById.js";
import SpinnerGrayMini from "../../ui/loaders/SpinnerGrayMini.jsx";
import { fixedSizeFullName } from "../../utils/fixedSizeFullName.js";
import { getFormattedDate } from "../../utils/getFormattedDate.js";
import useDisableScroll from "../../hooks/useDisableScroll.js";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";

const AccountDetailsModal = ({ onClose, ownerId }) => {
  const ref = useOutsideClick(onClose);
  useDisableScroll(true);
  const { userById, isLoading, error } = useUserById(ownerId);
  if (error) return <ErrorDisplay error={error} />;

  const {
    firstName,
    lastName,
    picture = defaultImage,
    email,
    registerDate,
  } = userById || {};

  const formattedDate = getFormattedDate(registerDate);

  return (
    <StyledOverlay>
      <StyledAccountDetails ref={ref} isLoading={isLoading}>
        {isLoading ? (
          <Row type="horizontal-center">
            <SpinnerGrayMini />
          </Row>
        ) : (
          <>
            <h3>About this account</h3>
            <Row type="vertical" padding="2rem" gap="1rem">
              <img src={picture} alt="User Profile" />
              <h3>{fixedSizeFullName(firstName, lastName, 50)}</h3>
              <h4>{email}</h4>
              <p>
                To help keep our community authentic, we’re showing information
                about accounts on Petfolio.
              </p>
              <Row type="horizontal-center" gap="1rem">
                <TbCalendarTime size={22} />
                <Row type="vertical">
                  <p>Date Joined</p>
                  <span>{formattedDate}</span>
                </Row>
              </Row>
            </Row>
            <StyledButton onClick={onClose}>Cancel</StyledButton>
          </>
        )}
      </StyledAccountDetails>
    </StyledOverlay>
  );
};

export default AccountDetailsModal;

const StyledAccountDetails = styled(StyledModal)`
  background-color: var(--color-neutral-800);
  text-align: center;
  width: 40rem;

  height: ${(props) => (props.isLoading ? "40rem" : "max-content")};

  ${(props) =>
    props.isLoading &&
    css`
      display: flex;
      background-color: var(--color-neutral-900);
      justify-content: center;
      align-items: center;
    `}

  & > h3 {
    padding: 1.5rem;
    font-weight: var(--font-weight-regular);
  }

  & > div {
    height: max-content;
    background-color: var(--color-neutral-900);
    border-radius: 1rem;
    align-items: center;

    & > img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      object-fit: cover;
    }

    & > h3 {
      font-weight: var(--font-weight-regular);
    }

    & > h4 {
      cursor: default;
      font-weight: var(--font-weight-regular);
    }

    & > p {
      margin-top: 1rem;
      font-size: var(--font-size-tiny);
      border-top: var(--border);
      border-bottom: var(--border);
      padding: 1rem 0rem;
    }

    & > div {
      align-self: flex-start;

      & > div {
        text-align: start;
        & > p {
        }
        & > span {
          font-size: var(--font-size-tiny);
          color: var(--color-neutral-400);
          letter-spacing: -0.5px;
          font-weight: var(--font-weight-medium);
        }
      }
    }
  }

  & button {
    padding: 1rem;
    color: var(--color-neutral-300);
    width: 100%;
  }
`;
