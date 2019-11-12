const colorSelect = document.getElementById('color');
const patternSelect = document.getElementById('pattern');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height')
const tileSizeInput = document.getElementById('tilesize');
const seedInput = document.getElementById('seed')
const randomCheckbox = document.getElementById('random')
const image = document.querySelector('.big-canvas');
let color, pattern, tilesize, seed, random;
let width = "&width=" + widthInput.value;
let height = "&height=" + heightInput.value;

const setImage = () => {
  colorSelect.addEventListener('change', () => {
    color = colorSelect.value;
    image.setAttribute("src", `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`);
  });
  
  patternSelect.addEventListener('change', () => {
   pattern = patternSelect.value;
   image.setAttribute("src", `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`);
  });
  
  widthInput.addEventListener('change', () => {
      width = "&width=" + widthInput.value
      image.setAttribute("src", `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`);
  })
  
  heightInput.addEventListener('change', () => {
    console.log(height)
    height = "&height=" + heightInput.value
    image.setAttribute("src", `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`);
  })
  
  tileSizeInput.addEventListener('change', () => {
      tilesize = "&tileSize=" + tileSizeInput.value
      image.setAttribute("src", `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`);
  })

  seedInput.addEventListener('change', () => {
    seed = "&seed=" + seedInput.value
    image.setAttribute("src", `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`);
  })

  function randomize(callback){
    randomCheckbox.addEventListener('click', () => {
      random = randomCheckbox.value
      image.setAttribute("src", `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`);
    })
    callback()
  }

  function clearRandom() {
   image.setAttribute("src", image.src.replace(`&random=true`, ""))
  }

  randomize(clearRandom);
  
  

}

setImage()





