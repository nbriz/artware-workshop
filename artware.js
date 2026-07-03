let drawing = false
let spin = 0

const types = ['Emojis', 'GIFs', 'Form UI']
const brushes = [
  ['🌺', '🌹', '🌸', '🌿', '🌱', '☘️', '🌊','🐳', '💧'],
  ['world', 'hotairballoon', 'dancing-girl', 'arrow', 'cd'],
  ['text', 'number', 'color', 'date', 'checkbox', 'radio', 'range']
]

const bPick = nn.get('#b-pick').set('options', brushes[0])

const bMode = nn.get('#b-mode')
  .set('options', ['default', 'spray', 'spin'])

const bType = nn.get('#b-type')
  .set('options', types)
  .on('input', function () {
    const i = types.indexOf(this.value)
    bPick.content(null)
    bPick.set('options', brushes[i])
  })


function drawEmoji (x,y) {
  const e = nn.create('h1')
    .content(bPick.value)
    .addTo('main')
    .css('pointer-events', 'none')
    .positionOrigin('center')
    .position(x, y)
  
  if (bMode.value === 'spray') {
    nn.times(10, () => {
      const rx = nn.random(-100, 100)
      const ry = nn.random(-100, 100)
      drawEmoji(x + rx, x + ry )
    })
  } else if (bMode.value === 'spin') {
    spin += 10
    e.rotate(spin)
  }
}

function drawGif (x, y) {
  const url = `gifs/${bPick.value}.gif`
  nn.create('img')
    .set('src', url)
    .addTo('main')
    .css('pointer-events', 'none')
    .positionOrigin('center')
    .position(x, y)
}

function drawUI (x, y) {
  nn.create('input')
    .set('type', bPick.value)
    .addTo('main')
    .css('pointer-events', 'none')
    .positionOrigin('center')
    .position(x, y)
}

function draw () {
  if (!drawing) return

  const x = nn.pointer.x
  const y = nn.pointer.y
  
  const top = nn.get('main').top
  if (y <= top) return
  
  if (bType.value === 'Emojis') drawEmoji(x, y)
  else if (bType.value === 'GIFs') drawGif(x, y)
  else if (bType.value === 'Form UI') drawUI(x, y)
}

function touch () {
  drawing = true
}

function release () {
  drawing = false
}

nn.on('pointerdown', touch)
nn.on('pointermove', draw)
nn.on('pointerup', release)
nn.on('pointercancel', release)
nn.getAll('nav > *').forEach(e => e.on('click', release))

