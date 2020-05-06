require("./generative.js");

describe("width, height, tilesize, seed in setup function", () => {
  let widthObj = {
    string: "&width=",
    value: 2000,
  };

  let width = "&width=2000";

  test("complete width value", () => {
    expect(width).toMatch(widthObj.string + widthObj.value);
  });
});
