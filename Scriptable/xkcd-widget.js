// Get Latest XKCD Comic Information and request the JSON
const url = "https://xkcd.com/info.0.json"
const req = new Request(url)
const comicJSON = await req.loadJSON()

// Request the Image
const imgReq = await new Request(comicJSON.img)
const img = await imgReq.loadImage()

// Construct the URL to the comic (to open in browser)
// log("Comic Number: " + comicJSON.num)
const comicURL = "https://xkcd.com/" + comicJSON.num

// If you're running it in the widget, it will create the widget, otherwise open the URL to the comic in Safari
if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget(img)
  Script.setWidget(widget)
  Script.complete()
} else {
 Safari.open(comicURL)
}

// This is where you create and style the widget
function createWidget(img) {
  // CREATE WIDGET
  let widget = new ListWidget()
  
  // ADD WIDGET URL
  widget.url = comicURL
  
  // CREATE BACKGROUND IMAGE
  widget.backgroundImage = img
  widget.addSpacer()
  
  //SET GRADIENT BACKGROUND
  let startColor = new Color("#1c1c1c19")
  let endColor = new Color("#1c1c1cb4")
  let gradient = new LinearGradient()
  gradient.colors = [startColor, endColor]
  gradient.locations = [0.0, 1]
  widget.backgroundGradient = gradient
  widget.backgroundColor = new Color("1c1c1c")
  
  // ADD ALT and COMIC TITLE TEXT ON TOP
  let altText = comicJSON.alt
  let Title = comicJSON.safe_title
  
  let titleTxt = widget.addText(Title)
  titleTxt.font = Font.boldSystemFont(12)
  titleTxt.textColor = Color.white()
  titleTxt.leftAlignText()
  widget.addSpacer(2)
  
  
  let altTxt = widget.addText(altText)
  altTxt.font = Font.systemFont(10)
  altTxt.textColor = Color.yellow()
  altTxt.textOpactiy = 1
  altTxt.leftAlignText()
  
  widget.setPadding(8,15,10,5)
  
  return widget
}