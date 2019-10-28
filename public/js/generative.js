const colorAndPatternSelect = [].slice.call(document.querySelectorAll('select')) // color and pattern dropdown
const widthAndHeightInput = [].slice.call(
  document.querySelectorAll('.input input')
) // width and height inputs
const tileSizeAndSeedInput = [].slice.call(
  document.querySelectorAll('.range input')
) // tileSize and seed inputs
const randomCheckbox = document.querySelector('.checkbox button')
console.log(colorAndPatternSelect)
console.log(widthAndHeightInput)
console.log(tileSizeAndSeedInput)
console.log(randomCheckbox)

const getParams = async () => {
  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  try {
    const response = await fetch('http://localhost:8080/canvas', settings)
    const data = await response.text()
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

colorAndPatternSelect.forEach(select => {
  select.addEventListener('change', () => {
    getParams()
  })
})

widthAndHeightInput.forEach(input => {
  input.addEventListener('change', () => {
    getParams()
  })
})

tileSizeAndSeedInput.forEach(input => {
  input.addEventListener('change', () => {
    getParams()
  })
})

randomCheckbox.addEventListener('click', () => {
  getParams()
})

export default storeValues
