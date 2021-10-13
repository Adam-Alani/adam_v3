export default function Words(words, prevWords, canvas, ctx) {

  let lines = getLines(ctx, canvas.width*3/4);
  if (prevWords.length > 0) {
      return [];
  }
  return mapWords(ctx, lines,canvas.width/8, canvas.height/3)

  function getLines(ctx, maxWidth) {
      let wordsArray = words.split(" ");
      let lines = [];
      let currentLine = wordsArray[0];
      for (let i = 1; i < wordsArray.length; i++) {
          let newWord = wordsArray[i];
          let width = ctx.measureText(currentLine + " " + newWord).width;
          if (width < maxWidth) {
              currentLine += " " + newWord;
          } else {
              lines.push(currentLine);
              currentLine = newWord;
          }
      }
      lines.push(currentLine);
      return lines;
  }


  function mapWords(ctx, lines, x ,y) {
      let wordsBB = [];
      for (let j = 0; j < lines.length; j++) {
          let input = lines[j]
          let canvasText = input.split(" ");

          let accumLength=0;
          for(let i=0;i<canvasText.length;i++){
              let length=ctx.measureText(" " + canvasText[i]).width;
              wordsBB.push({
                  x:accumLength+x,
                  y:y-16 + j * 40,
                  w:length,
                  h:16,
                  word: canvasText[i],
                  broke: false
              });
              accumLength+=length;
          }
      }
      return wordsBB
    }
}
