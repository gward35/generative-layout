const generative = require("./generative.js");
jest.mock("./generative.js", () => jest.fn());

document.body.innerHTML =
  '<img class="big-canvas" src="/canvas?" alt="generated pattern" />' +
  '<input name="width" id="width" type="number" min="100" max="5000" value="2000" />' +
  '<input name="height" id="height" type="number" min="100" max="5000" value="500" />' +
  '<input name="tilesize" id="tilesize" type="range" min="1" max="300" value="50" />' +
  '<input name="seed" id="seed" type="range" min="1" max="100000" value="50"/>' +
  '<select id="color" name="color">' +
  '<option value="">Please Select A Color</option>' +
  '<option value="&color=red">Red</option>' +
  '<option value="&color=brightred">BrightRed</option>' +
  '<option value="&color=orange">Orange</option>' +
  '<option value="&color=salmon">Salmon</option>' +
  '<option value="&color=blue">Blue</option>' +
  '<option value="&color=slate">Slate</option>' +
  '<option value="&color=purple">Purple</option>' +
  '<option value="&color=myrtle">Myrtle</option>' +
  '<option value="&color=green">Green</option>' +
  '<option value="&color=lime">Lime</option>' +
  '<option value="&color=coral">Coral</option>' +
  '<option value="&color=jade">Jade</option>' +
  '<option value="&color=grayscale">Grayscale</option>' +
  "</select>" +
  '<select id="pattern" name="pattern">' +
  '<option value="">Please Select A Pattern</option>' +
  '<option value="&pattern=false">Default (Square)</option>' +
  '<option value="&pattern=triangle">Triangle</option>' +
  '<option value="&pattern=circle">Circle</option>' +
  '<option value="&pattern=arc">Arc</option>' +
  '<option value="&pattern=line">Line</option>' +
  '<option value="&pattern=mmm">MMM</option>' +
  "</select>";

describe("width, height, tilesize, seed initial values in setup function", () => {
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

describe("test change handler to color, pattern, height, width, seed, and tilesize input", () => {
  let image = document.querySelector(".big-canvas");

  test("on change to color select", () => {
    let colorSelect = document.getElementById("color");
    let color = "&color=grayscale";

    function updateValue(cb, color) {
      colorSelect.value = color;
      cb(color);
    }

    const updateVal = jest.fn();
    colorSelect.addEventListener("change", updateValue(updateVal, color));
    image.setAttribute("src", `/canvas?${color}`);

    expect(updateVal).toBeCalled();
    expect(colorSelect.value).toBe("&color=grayscale");
    expect(image.src).toMatch("http://localhost/canvas?&color=grayscale");
  });

  test("on change to pattern select", () => {
    let patternSelect = document.getElementById("pattern");
    let pattern = "&pattern=false";

    function updateValue(cb, pattern) {
      patternSelect.value = pattern;
      cb(pattern);
    }

    const updateVal = jest.fn();
    patternSelect.addEventListener("change", updateValue(updateVal, pattern));
    image.setAttribute("src", `/canvas?${pattern}`);

    expect(updateVal).toBeCalled();
    expect(patternSelect.value).toBe("&pattern=false");
    expect(image.src).toMatch("http://localhost/canvas?&pattern=false");
  });

  test("on change to height input", () => {
    let heightInput = document.getElementById("height");
    let height = "500";

    function updateValue(cb, height) {
      heightInput.value = height;
      cb(width);
    }

    const updateVal = jest.fn();
    heightInput.addEventListener("change", updateValue(updateVal, height));
    image.setAttribute("src", `/canvas?&height=${height}`);

    expect(updateVal).toBeCalled();
    expect(heightInput.value).toBe("500");
    expect(image.src).toMatch("http://localhost/canvas?&height=500");
  });

  test("on change to width input", () => {
    let widthInput = document.getElementById("width");
    let width = "2000";

    function updateValue(cb, width) {
      widthInput.value = width;
      cb(width);
    }

    const updateVal = jest.fn();
    widthInput.addEventListener("change", updateValue(updateVal, width));
    image.setAttribute("src", `/canvas?&width=${width}`);

    expect(updateVal).toBeCalled();
    expect(widthInput.value).toBe("2000");
    expect(image.src).toMatch("http://localhost/canvas?&width=2000");
  });

  test("on change to seed input", () => {
    let seedInput = document.getElementById("seed");
    let seed = "50";

    function updateValue(cb, seed) {
      seedInput.value = seed;
      cb(seed);
    }

    const updateVal = jest.fn();
    seedInput.addEventListener("change", updateValue(updateVal, seed));
    image.setAttribute("src", `/canvas?&seed=${seed}`);

    expect(updateVal).toBeCalled();
    expect(seedInput.value).toBe("50");
    expect(image.src).toMatch("http://localhost/canvas?&seed=50");
  });

  test("on change to tilesize input", () => {
    let tilesizeInput = document.getElementById("tilesize");
    let tilesize = "50";

    function updateValue(cb, tilesize) {
      tilesizeInput.value = tilesize;
      cb(tilesize);
    }

    const updateVal = jest.fn();
    tilesizeInput.addEventListener("change", updateValue(updateVal, tilesize));
    image.setAttribute("src", `/canvas?&tilesize=${tilesize}`);

    expect(updateVal).toBeCalled();
    expect(tilesizeInput.value).toBe("50");
    expect(image.src).toMatch("http://localhost/canvas?&tilesize=50");
  });
});
