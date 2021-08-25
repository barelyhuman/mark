const cssnano = require("cssnano");

module.exports = {
  plugins: [
    cssnano({
      preset: "default",
    }),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
