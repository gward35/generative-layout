# Generative Pattern Service

You can pick a specific color scheme, pattern, width, height, tilesize, and generate random patterns. You can also have a reference to a pattern you like that was generated by passing it a random seed. NEW! You can now pass a custom color scheme via the API endpoint!

## Relevant URLs

API: https://gimmiepatterns.com/canvas  
Front End: https://gimmiepatterns.com

## Sample URL To Generate Pattern

`/canvas?pattern=triangle&color=seafoam`

## Patterns

### Default (Square)

usage: `pattern=false`

### Triangle

usage: `pattern=triangle`

### Circle

usage: `pattern=circle`

### Arc

usage: `pattern=arc`

### Line

usage: `pattern=line`

### MMM

usage: `pattern=mmm`

## Color Schemes

### Default (Grayscale)

hex values: `['#7A7D7D','#D0CFCF','#565254']`\
usage: omit color param from url

### Red

hex values: `['#C75146','#AD2E24','#81171B']`\
usage: `color=red`

### BrightRed

hex values: `['#FF220C','#333745','#FF4B3E']`\
usage: `color=brightred`

### Orange

hex values: `['#F08700', '#EFCA08', '#F49F0A']`\
usage: `color=orange`

### Salmon

hex values: `['#FFAF87','#FF8E72','#ED6A5E']`\
usage: `color=salmon`

### Blue

hex values: `['#006BA6', '#0496FF', '#1D3461']`\
usage: `color=blue`

### Slate

hex values: `['#495867','#577399','#BDD5EA']`\
usage: `color=slate`

### Purple

hex values: `['#2B193D', '#5D4E6D', '#8A7090']`\
usage: `color=purple`

### Myrtle

hex values: `['#413C58','#967AA1','#ACACDE']`\
usage: `color=myrtle`

### Green

hex values: `['#1E441E','#2A7221','#119822']`\
usage: `color=green`

### Lime

hex values: `['#629460', '#96BE8C', '#ACECA1']`\
usage: `color=lime`

### Coral

hex values: `['#F6C28B','#5296A5','82DDF0']`\
usage: `color=coral`

### Jade

hex values: `['#476A6F','#519E8A','#7EB09B']`\
usage: `color=jade`

### Grayscale

hex values: `['#7A7D7D', '#D0CFCF', '#565254']`\
usage: `color=grayscale`

## Custom Color Scheme

Using the gimmepatterns `/canvas` endpoint you can pass a custom color scheme query string to define a custom color scheme. Its value must be set to `true`.

usage: `customColor=true`

To pass your custom colors into the color scheme you will need to use an additional three query string parameters.

`firstCustomColor`
`middleCustomColor`
`lastCustomColor`

Using these query strings pass your custom hex values:

usage: `&customColor=true&firstCustomColor=E0D0C1&middleCustomColor=F7F9F9&lastCustomColor=00A676`

Try playing around with the order of your hex values (first, middle, last) to get different results!

(2/6/2020) Adding custom color scheme was just added for the front end site and should be considered in Beta as it is improved.

## Canvas Size

### Width

sets the width of the generated canvas (if not passed into url the default is `500`)\
usage: `width=700`

### Height

sets the height of the generated canvas (if not passed into url the default is `500`)\
usage: `height=500`

## Tile Size

sets height and width dimensions of "tiles" in canvas (if not passed into url the default is `53.33`)\
usage: `tileSize=60`

## The Seed Param

provides an identifier or reference to a generated pattern. By default a `seed=0` is passed to the url. Accessing a pattern url with a defined seed will always return the associated pattern unless the `random` param is set.

## The Random Param

allows generation of random patterns everytime the user makes a request to the url (if not passed into url the default is `false`). If a parameter is not set such as `pattern` or `color` that will be randomized too. Note: if `customColor` is set to true `color` will not be added to the query string\
usage: `random=true`
