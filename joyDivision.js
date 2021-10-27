var canvas = document.querySelector('canvas')
var context = canvas.getContext('2d')

var size = window.innerWidth
var dpr = window.devicePixelRatio

canvas.width = size * dpr
canvas.height = size * dpr
context.scale(dpr, dpr)
context.lineWidth = 8

let step = 40
let lines = []

for (let i = step; i <= size - step; i += step) {
    let line = []
    for (let j = step; j <= size - step; j += step) {
        let distanceToCenter = Math.abs(j - size / 2)
        let variance = Math.max(size / 2 - 50 - distanceToCenter, 0)
        let random = Math.random() * variance / 2 * -1
        let point = {x: j, y: i + random}
        line.push(point)
    }
    lines.push(line)
}

console.log(lines)

for(let i = 5; i < lines.length; i ++) {
    context.beginPath()
    context.moveTo(lines[i][0].x, lines[i][0].y)
    for(var j = 0; j < lines[i].length - 2; j++) {
        let xc = (lines[i][j].x + lines[i][j + 1].x) / 2
        let yc = (lines[i][j].y + lines[i][j + 1].y) / 2
        context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc)
    }
    context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y)
    context.save()
    context.globalCompositeOperation = 'destination-out'
    context.fill()
    context.restore()
    context.stroke()
}