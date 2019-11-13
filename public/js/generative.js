const colorSelect = document.getElementById('color')
const patternSelect = document.getElementById('pattern')
const widthInput = document.getElementById('width')
const heightInput = document.getElementById('height')
const tileSizeInput = document.getElementById('tilesize')
const seedInput = document.getElementById('seed')
const randomCheckbox = document.getElementById('random')
const image = document.querySelector('.big-canvas')
let color, pattern, width, height, tilesize, seed, random, defaultImage

const setup = () => {
  width = '&width=' + widthInput.value
  height = '&height=' + heightInput.value
  tilesize = '&tileSize=' + tileSizeInput.value
  seed = '&seed=' + seedInput.value
  image.setAttribute('src', `/canvas?${width}${height}${tilesize}${seed}`)
}

const setImage = () => {
  defaultImage = image.getAttribute('src')
  colorSelect.addEventListener('change', () => {
    color = colorSelect.value
    image.setAttribute(
      'src',
      `/canvas?${width}${height}${tilesize}${seed}${color}`
    )
  })

  patternSelect.addEventListener('change', () => {
    defaultImage = image.getAttribute('src')
    pattern = patternSelect.value
    image.setAttribute(
      'src',
      `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
    )
  })

  widthInput.addEventListener('change', () => {
    console.log(`${width}`)
    defaultImage = image.getAttribute('src')
    width = '&width=' + widthInput.value
    image.setAttribute(
      'src',
      `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
    )
  })

  heightInput.addEventListener('change', () => {
    defaultImage = image.getAttribute('src')
    height = '&height=' + heightInput.value
    image.setAttribute(
      'src',
      `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
    )
  })

  tileSizeInput.addEventListener('change', () => {
    defaultImage = image.getAttribute('src')
    tilesize = '&tileSize=' + tileSizeInput.value
    image.setAttribute(
      'src',
      `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
    )
  })

  seedInput.addEventListener('change', () => {
    defaultImage = image.getAttribute('src')
    seed = '&seed=' + seedInput.value
    image.setAttribute(
      'src',
      `/canvas?${width}${height}${tilesize}${seed}${color}${pattern}`
    )
  })
}

const randomize = () => {
  randomCheckbox.addEventListener('click', () => {
    const patterns = [
      '&pattern=triangle',
      '&pattern=circle',
      '&pattern=arc',
      '&pattern=line',
      '&pattern=mmm',
      '&pattern=false',
    ]
    let selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
    patternSelect.value = selectedPattern
    console.log(selectedPattern)
    pattern = selectedPattern

    const colors = [
      '&color=red',
      '&color=brightred',
      '&color=orange',
      '&color=salmon',
      '&color=blue',
      '&color=slate',
      '&color=purple',
      '&color=myrtle',
      '&color=green',
      '&color=lime',
      '&color=coral',
      '&color=jade',
      '&color=grayscale',
    ]
    let selectedColor = colors[Math.floor(Math.random() * colors.length)]
    colorSelect.value = selectedColor
    console.log(selectedColor)
    color = selectedColor

    image.setAttribute(
      'src',
      `/canvas?${color}${pattern}${width}${height}${tilesize}${seed}${random}`
    )
  })
}

setup()
setImage()
randomize()
