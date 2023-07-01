// Vuetify
// import 'vuetify/styles'
// import '@/assets/scss/variables.scss'
// import 'vuetify/styles'
import "@fortawesome/fontawesome-free/css/all.css";
import { createVuetify } from "vuetify";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const darkTheme = {
  dark: true,
  colors: {
    background: "#0f141a",
    surface: "#141a21",
    "surface-variant": "#ccc",
    primary: "#ff5522",
    "primary-darken-1": "#d13d10",
    "primary-darken-2": "#8d2d0f",
    secondary: "#032f53",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#fb8c00",
    yellow: "#facc07",
  },
};

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      darkTheme,
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify);
});
