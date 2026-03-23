/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#003B73', // Azul del botón y logo
      }
    },
  },
  plugins: [],
};
/** Nuevo Dark Mode, borrar despues de aqui si da error */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'media', // Esto hace que cambie según el sistema operativo
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... resto de la configuración
};
export default config;
