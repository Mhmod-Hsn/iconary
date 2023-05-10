module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false, // opposite of removeDimensions
        },
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [
          {
            "data-icon": "chs2020-icon",
          },
        ],
      },
    },
    "removeDimensions",
    "removeOffCanvasPaths",
    "removeRasterImages",
  ],
};
