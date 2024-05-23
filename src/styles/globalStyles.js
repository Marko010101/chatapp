import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


:root {
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81; 

  /* Black */
  --color-black: #000;
  --color-solf-black: #282828;

  /* White */
  --color-text-sidebar:#F5F5F5;


  /* gray */
  --color-gray-0: #fff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827; 


  --backdrop-color: rgba(255, 255, 255, 0.1);

  /* Font weights */
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;
  --font-weight-extra-light: 200;
  --font-weight-light: 300;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;


  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-sidebar: 0.1px solid var(--color-solf-black);

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
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  color: var(--color-text-sidebar);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  background-color:var(--color-gray-0);
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

/* @media (max-width: 992px) {
  html {
    font-size: 55%;
  }
}

@media (max-width: 768px) {
  html {
    font-size: 50%;
  }
}

@media (max-width: 576px) {
  html {
    font-size: 45%;
  }
} */



`;

export default GlobalStyles;
