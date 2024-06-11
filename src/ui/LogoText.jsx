import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";

const StyledLogo = styled.header`
  border-top: var(--border);
  border-bottom: var(--border);
  margin: 0 auto;
  font-weight: var(--font-weight-medium);
  margin-bottom: 6rem;
  background: linear-gradient(
    to bottom right,
    rgb(0, 0, 255) 0%,
    rgb(255, 20, 147) 90%
  );
  font-family: Arvo;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

function LogoText() {
  return (
    <StyledLogo>
      <TypeAnimation
        sequence={["Pet", 700, "Folio", 700, "PetFolio", 3000]}
        speed={5}
        style={{ fontSize: "2em" }}
        repeat={Infinity}
      />
    </StyledLogo>
  );
}

export default LogoText;
