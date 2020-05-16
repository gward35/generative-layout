require("./generative.js");
jest.mock("./generative.js");

document.body.innerHTML =
  '<img class="big-canvas" src="/canvas?" alt="generated pattern" />' +
  '<input name="width" id="width" type="number" min="100" max="5000" value="2000" />' +
  '<input name="height" id="height" type="number" min="100" max="5000" value="500" />' +
  '<input name="tilesize" id="tilesize" type="range" min="1" max="300" value="50" />' +
  '<input name="seed" id="seed" type="range" min="1" max="100000" value="50"/>';

describe("width, height, tilesize, seed in setup function", () => {
  let width;
  let height;
  let tilesize;
  let seed;
  let image;

  test("set width input value", () => {
    let widthInput = document.getElementById("width");
    width = "&width=" + widthInput.value;
    expect(widthInput.value).toBe("2000");
  });

  test("set height input value", () => {
    let heightInput = document.getElementById("height");
    height = "&height=" + heightInput.value;
    expect(heightInput.value).toBe("500");
  });

  test("set tileSize input value", () => {
    let tileSizeInput = document.getElementById("tilesize");
    tilesize = "&tileSize=" + tileSizeInput.value;
    expect(tileSizeInput.value).toBe("50");
  });

  test("set seed input value", () => {
    let seedInput = document.getElementById("seed");
    seed = "&seed=" + seedInput.value;
    expect(seedInput.value).toBe("50");
  });

  test("set initial pattern src", () => {
    image = document.querySelector(".big-canvas");
    image.setAttribute("src", `/canvas?${width}${height}${tilesize}${seed}`);
    expect(image.src).toMatch(
      "http://localhost/canvas?&width=2000&height=500&tileSize=50&seed=50"
    );
  });
});
