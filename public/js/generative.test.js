require("./generative.js");

describe("width, height, tilesize, seed in setup function", () => {
  let widthObj = {
    string: "&width=",
    value: 2000,
  };

  let heightObj = {
    string: "&height=",
    value: 500,
  };

  let tilesizeObj = {
    string: "&tileSize=",
    value: 50,
  };

  let seedObj = {
    string: "&seed=",
    value: 50,
  };

  let width = "&width=2000";
  let height = "&height=500";
  let tilesize = "&tileSize=50";
  let seed = "&seed=50";
  let image = document.createElement("img");
  image.setAttribute("src", "/canvas" + width + height + tilesize + seed);

  test("set width input value", () => {
    expect(width).toMatch(widthObj.string + widthObj.value);
  });

  test("set height input value", () => {
    expect(height).toMatch(heightObj.string + heightObj.value);
  });

  test("set tileSize input value", () => {
    expect(tilesize).toMatch(tilesizeObj.string + tilesizeObj.value);
  });

  test("set seed input value", () => {
    expect(seed).toMatch(seedObj.string + seedObj.value);
  });

  test("set initial pattern src", () => {
    expect(image.src).toMatch("/canvas" + width + height + tilesize + seed);
  });
});
