require("./generative.js");

describe("width, height, tilesize, seed in setup function", () => {
  let widthObj = {
    string: "&width=",
    value: 2000,
  };

  let width = "&width=2000";

  test("width string", () => {
    expect(widthObj.string).toBe("&width=");
  });

  test("width value", () => {
    expect(widthObj.value).toEqual(2000);
  });

  test("complete width value", () => {
    expect(width).toMatch(widthObj.string + widthObj.value);
  });
});
