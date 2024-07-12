import { titleFix } from "../../../utils/helpers.js";

function Title({ text }) {
  return <span>{titleFix(text)}</span>;
}

export default Title;
