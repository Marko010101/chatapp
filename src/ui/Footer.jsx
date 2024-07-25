import styled from "styled-components";
import { StyledTooltip } from "../features/posts/ui/PostFormatedDate.jsx";
import toast from "react-hot-toast";
import FooterLink from "./FooterLink.jsx";

const StyledFooter = styled.footer`
  padding: 3rem;
  display: grid;
  grid-template-rows: repeat(3, 1.5rem);
  row-gap: 1rem;
  text-transform: uppercase;
  font-size: var(--font-size-tiny);
  font-weight: var(--font-weight-semibold);
  color: var(--color-sky-200);
  place-items: center;
  align-self: end;

  & div {
    & ul {
      display: flex;
      gap: 2rem;

      & li {
        position: relative;
        cursor: pointer;

        &:hover::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-sky-200);
        }
      }
    }

    & span {
      color: var(--color-neutral-400);
    }
  }
`;

function Footer() {
  const creatorNumber = "+995 599 99 21 09";
  const creatorEmail = "baghashvilimarko@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(creatorNumber).then(() => {
      toast.success("Phone number copied 🤙🏽");
    });
  };

  const openGmail = (email) => {
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(email);
    window.open(gmailUrl, "_blank");
  };

  return (
    <StyledFooter>
      <div>
        <ul>
          <FooterLink name={"Github"} link={"https://github.com/Marko010101"} />
          <FooterLink
            name={"Creator"}
            link={"https://www.instagram.com/marko_baghashvili/"}
          />
          <li>
            <a
              data-tooltip-id="CreatorPhoneNumber"
              data-tooltip-content={creatorNumber}
              onClick={copyToClipboard}
            >
              Contact
            </a>
            <StyledTooltip
              id="CreatorPhoneNumber"
              place={"top"}
              effect="solid"
              delayShow={200}
            />
          </li>
          <FooterLink
            name={"Linkdin"}
            link={"https://www.linkedin.com/in/markoz-baghashvili/"}
          />
          <FooterLink
            name={"Email"}
            handleClick={() => openGmail(creatorEmail)}
          />
        </ul>
      </div>
      <div>
        <ul>
          <FooterLink name={"Api"} link={"https://dummyapi.io/"} />
        </ul>
      </div>
      <div>
        <span>© {new Date().getFullYear()} Petfolio by Marko</span>
      </div>
    </StyledFooter>
  );
}

export default Footer;
