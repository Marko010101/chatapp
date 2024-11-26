import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

  /* Sky */
  --color-sky-200: rgb(224 242 254); 
  --color-sky-600: #0284c7; 
  --text-blue-500: #3b82f6;
  --text-blue-600: #2F68C5;


  --text-cyan-800: #155E75;

  /* red */
  --color-red-400: #f87171;
  --color-red-600:#ee2e2e;

  /* Black */
  --color-black: #000;
  --color-solf-black: #282828;
  
  /* Stone */
  --text-stone-700: #443c3c;


  /* Neutral */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5; 
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-neutral-950: #0a0a0a;

  
  

  /* White */
  --color-text:#F5F5F5;
  --color-pink-logo: rgb(255,20,147);
  --color-blue-logo: rgb(0,0,255);

  /* gray */
  --color-gray-0: #fff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  /* --color-gray-400: #9ca3af; */
  /* --color-gray-500: #6b7280; */
  /* --color-gray-600: #4b5563; */
  /* --color-gray-700: #374151; */
  /* --color-gray-800: #1f2937; */
  --color-gray-900: #111827; 
  --color-gray-text:#A0A0A0;
  --color-gray-active: #696969;


  --backdrop-color: rgba(255, 255, 255, 0.1);

  /* Text shadow */

  --text-shadow: 1px 1px 1px var(--color-neutral-700);

  /* Font weights */
  --font-weight-extra-light: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;


  --font-size-mini: 1rem;
  --font-size-tiny: 1.2rem;
  --font-size-small: 1.4rem;
  --font-size-medium: 1.6rem;
  --font-size-big: 1.8rem;




  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border: 0.1px solid var(--color-solf-black);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* Width */
  --sidebar-width-medium: 24.45rem;
  --sidebar-width-shrunk: 7.2rem;


  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.2s, border 0.2s;
}

html {
  font-size: 62.5%;
}

body {
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  color: var(--color-text);
  background-color: var(--color-black);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 1.4rem;
}


  ::-webkit-scrollbar-corner,
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 0.65rem;
    background: var(--color-neutral-700);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.65rem;
    background: var(--color-neutral-500);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-neutral-400);
  }

  ::-webkit-scrollbar-thumb:active {
    background: var(--color-neutral-300);
  }

  ::-webkit-scrollbar-button {
    display: block;
    background-color: var(--color-neutral-700);
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;
  }



  ::-webkit-scrollbar-button:vertical:end:increment {
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/e/ee/Chevron-down.svg");
  }

  ::-webkit-scrollbar-button:vertical:end:decrement {
    display: none;
  }

  ::-webkit-scrollbar-button:vertical:start:increment {
    display: none;
  }

  ::-webkit-scrollbar-button:vertical:start:decrement {
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/7e/Chevron-up.svg");
  }
  ::-webkit-scrollbar-button:vertical:end:increment:hover,
  ::-webkit-scrollbar-button:vertical:start:decrement:hover {
    background-color: var(--color-neutral-500);
  }
  
  ::-webkit-scrollbar-button:vertical:end:increment:active,
  ::-webkit-scrollbar-button:vertical:start:decrement:active {
    background-color: var(--color-neutral-400);
  }



input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-gray-200);
  color: var(--color-gray-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* REUSABLE CLASSES */

.image-user{
  display: block;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center center;
  border-radius: 50%;
  cursor:pointer;
}

.scrollButtonDisappear::-webkit-scrollbar {
    width: 0.8rem;
}

.scrollButtonDisappear::-webkit-scrollbar-button {
    display: none;
}


@media (max-width: 1200px) {
  html {
    font-size: 60%;
  }
}
@media (max-width: 992px) {
  html {
    font-size: 55%;
  }
}

@media (max-width: 768px) {
  html {
    font-size: 52.5%;
  }
}

@media (max-width: 576px) {
  html {
    font-size: 50%;
  }
}



`;

export default GlobalStyles;
