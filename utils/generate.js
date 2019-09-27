const { createCanvas, registerFont, loadImage } = require('canvas')
const { upload } = require('./cloudinary')

registerFont(`${__dirname}/../fonts/NotoSansCJKjp-Bold.otf`, {
  family: 'Noto Sans CJK JP Bold',
})

const fontStyle = (font, lineHeight, color, marginTop) => ({
  font,
  lineHeight,
  color,
  marginTop,
})

const titleFontStyle = fontStyle(
  'bold 59px "Noto Sans CJK JP Bold"',
  80,
  '#1a1a1a',
  40
)

const bodyFontStyle = fontStyle(
  '30px "Noto Sans CJK JP Bold"',
  38,
  '#1a1a1a',
  titleFontStyle.marginTop + 10
)

export const generate = async (title, body, fileName) => {
  const canvasWidth = 1200
  const canvasHeight = 630
  // text start position (x, y)
  const x = 180
  // text line width
  const lineWidth = canvasWidth - x * 2

  const canvas = createCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')
  await setBackgroundImage(ctx, canvasWidth, canvasHeight)

  const titleLines = textToLines(title, lineWidth, ctx, titleFontStyle)
  setText(ctx, titleLines, titleFontStyle, x)

  const bodyLines = textToLines(body, lineWidth, ctx, bodyFontStyle)
  const titleHeight = titleLines.length * titleFontStyle.lineHeight
  const sliceNum = 4 - titleLines.length
  const adjustedBodyLines =
    bodyLines.length > sliceNum
      ? bodyLines.slice(0, sliceNum).concat('...')
      : bodyLines.slice(0, sliceNum)

  setText(ctx, adjustedBodyLines, bodyFontStyle, x, titleHeight)

  return upload(canvas, fileName)
}

async function setBackgroundImage(ctx, canvasWidth, canvasHeight) {
  // Set Background Image
  const image = await loadImage('https://res.cloudinary.com/dgfiwgxrq/image/upload/v1569818659/background_hlabfd.png')
  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight)
}

const textToLines = (str, maxWidth, context, fontStyle) => {
  context.font = fontStyle.font
  const lines = []
  const lastLine = Array.from(str).reduce((line, char) => {
    if (maxWidth <= context.measureText(line + char).width) {
      lines.push(line)
      line = char
    } else {
      line += char
    }
    return line
  }, '')
  lines.push(lastLine)
  return lines
}

function setText(ctx, lines, fontStyle, x, marginTop = 0) {
  if (marginTop === 0) {
    ctx.textBaseline = 'top'
  }
  ctx.fillStyle = fontStyle.color
  ctx.font = fontStyle.font
  lines.forEach((text, index) => {
    const y = marginTop + fontStyle.marginTop + fontStyle.lineHeight * index
    ctx.fillText(text, x, y)
  })
}
