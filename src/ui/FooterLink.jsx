function FooterLink({ link, name, handleClick }) {
  return (
    <li>
      <a
        href={link}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    </li>
  );
}

export default FooterLink;
