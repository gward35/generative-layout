function generative() {
  const colorSelect = document.getElementById("color");
  const patternSelect = document.getElementById("pattern");
  const widthInput = document.getElementById("width");
  const heightInput = document.getElementById("height");
  const tileSizeInput = document.getElementById("tilesize");
  const seedInput = document.getElementById("seed");
  const randomButton = document.getElementById("random");
  const saveButton = document.getElementById("save");
  const saveLink = document.querySelector(".save-link");
  const customColorCheckbox = document.getElementById("customColor");
  const customColorHiddenInput = document.querySelectorAll(".inputs.hidden");
  const firstCustomColorInput = document.getElementById("firstCustomColor");
  const middleCustomColorInput = document.getElementById("middleCustomColor");
  const lastCustomColorInput = document.getElementById("lastCustomColor");
  const image = document.querySelector(".big-canvas");
  let color,
    pattern,
    width,
    height,
    tilesize,
    seed,
    customColor,
    firstCustomColor,
    middleCustomColor,
    lastCustomColor,
    defaultImage;

  const setup = () => {
    width = "&width=" + widthInput.value;
    height = "&height=" + heightInput.value;
    tilesize = "&tileSize=" + tileSizeInput.value;
    seed = "&seed=" + seedInput.value;
    image.setAttribute("src", `/canvas?${width}${height}${tilesize}${seed}`);
  };

  const setImageParameters = () => {
    defaultImage = image.getAttribute("src");
    colorSelect.addEventListener("change", () => {
      color = colorSelect.value;
      if (image.getAttribute("src").indexOf("&pattern=") > -1) {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
        );
      } else {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${color}`
        );
      }
    });

    patternSelect.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      pattern = patternSelect.value;
      if (image.getAttribute("src").indexOf("&customColor=true") > -1) {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}${middleCustomColor}${lastCustomColor}`
        );
      } else {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
        );
      }
    });

    widthInput.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      width = "&width=" + widthInput.value;
      if (image.getAttribute("src").indexOf("&customColor=true") > -1) {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}${middleCustomColor}${lastCustomColor}`
        );
      } else {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
        );
      }
    });

    heightInput.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      height = "&height=" + heightInput.value;
      if (image.getAttribute("src").indexOf("&customColor=true") > -1) {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}${middleCustomColor}${lastCustomColor}`
        );
      } else {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
        );
      }
    });

    tileSizeInput.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      tilesize = "&tileSize=" + tileSizeInput.value;
      if (image.getAttribute("src").indexOf("&customColor=true") > -1) {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}${middleCustomColor}${lastCustomColor}`
        );
      } else {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
        );
      }
    });

    seedInput.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      seed = "&seed=" + seedInput.value;
      if (image.getAttribute("src").indexOf("&customColor=true") > -1) {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}${middleCustomColor}${lastCustomColor}`
        );
      } else {
        image.setAttribute(
          "src",
          `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
        );
      }
    });
    customColorCheckbox.addEventListener("click", () => {
      defaultImage = image.getAttribute("src");
      if (customColorCheckbox.checked) {
        colorSelect.disabled = true;
        colorSelect.parentElement.classList.add("disabled");
        customColor = "&customColor=true";

        customColorHiddenInput.forEach((hiddenInput) => {
          hiddenInput.classList.remove("hidden");
        });
      } else {
        colorSelect.disabled = false;
        colorSelect.parentElement.classList.remove("disabled");
        customColorHiddenInput.forEach((hiddenInput) => {
          hiddenInput.classList.add("hidden");
        });
      }
      image.setAttribute(
        "src",
        `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}`
      );
    });
    firstCustomColorInput.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      firstCustomColor =
        "&firstCustomColor=" + firstCustomColorInput.value.replace("#", "");
      image.setAttribute(
        "src",
        `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}`
      );
    });
    middleCustomColorInput.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      middleCustomColor =
        "&middleCustomColor=" + middleCustomColorInput.value.replace("#", "");
      image.setAttribute(
        "src",
        `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}${middleCustomColor}`
      );
    });
    lastCustomColorInput.addEventListener("change", () => {
      defaultImage = image.getAttribute("src");
      lastCustomColor =
        "&lastCustomColor=" + lastCustomColorInput.value.replace("#", "");
      image.setAttribute(
        "src",
        `/canvas?${width}${height}${tilesize}${seed}${pattern}${customColor}${firstCustomColor}${middleCustomColor}${lastCustomColor}`
      );
    });
  };

  const randomize = () => {
    randomButton.addEventListener("click", () => {
      const patterns = [
        "&pattern=triangle",
        "&pattern=circle",
        "&pattern=arc",
        "&pattern=line",
        "&pattern=mmm",
        "&pattern=false",
      ];
      let selectedPattern =
        patterns[Math.floor(Math.random() * patterns.length)];
      patternSelect.value = selectedPattern;
      pattern = selectedPattern;

      const colors = [
        "&color=red",
        "&color=brightred",
        "&color=orange",
        "&color=salmon",
        "&color=blue",
        "&color=slate",
        "&color=purple",
        "&color=myrtle",
        "&color=green",
        "&color=lime",
        "&color=coral",
        "&color=jade",
        "&color=grayscale",
      ];

      let selectedColor = colors[Math.floor(Math.random() * colors.length)];
      colorSelect.value = selectedColor;
      if (customColorCheckbox.checked) {
        colorSelect.value = "";
      } else {
        color = selectedColor;
      }

      let randomizeTilesize = Math.ceil(Math.random() * 100);
      tileSizeInput.value = randomizeTilesize;
      tilesize = "&tileSize=" + randomizeTilesize;

      let randomizeSeed = Math.ceil(Math.random() * 50000);
      seedInput.value = randomizeSeed;
      seed = "&seed=" + randomizeSeed;

      if (customColorCheckbox.checked) {
        image.setAttribute(
          "src",
          `/canvas?${pattern}${width}${height}${tilesize}${seed}${customColor}${firstCustomColor}${middleCustomColor}${lastCustomColor}`
        );
      } else {
        image.setAttribute(
          "src",
          `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}`
        );
      }
    });
  };

  const saveImage = () => {
    saveButton.addEventListener("click", () => {
      saveLink.setAttribute(
        "href",
        "https://gimmepatterns-staging.herokuapp.com" +
          image.getAttribute("src")
      );
      console.log(saveLink);
    });
  };

  setup();
  setImageParameters();
  randomize();
  saveImage();
}

generative();

export { generative };
