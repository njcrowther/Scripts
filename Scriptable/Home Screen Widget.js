// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: sun;
importModule('date.format')
const url = "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3?id=p7#p7"

let now = new Date()
let df = new DateFormatter()
df.useFullDateStyle()
// df.useShortTimeStyle()
const strDate = df.string(now)

// log("Date is: " + strDate)


let wv = new WebView()
await wv.loadURL(url)
let js = `document.getElementById("p7").textContent`
let verse = await wv.evaluateJavaScript(js)
log("Verse says " + verse)


const inspiration = "Ask and it shall be given unto you; seek, and ye shall find; knock, and it shall be opened unto you. For every one that asketh, receiveth; and he that seeketh, findeth; and to him that knocketh, it shall be opened." 

if (config.runsInWidget) {
  let widget = createWidget()
  Script.setWidget(widget)
  Script.complete()  
}

function createWidget() {
  let widget = new ListWidget()
  // widget.backgroundColor = new Color("#ffffff")
  // widget.leftAlignText() 
  
  //Add Widget URL
  widget.url = url

	// Date and Time
	let dateTxt = widget.addText(strDate)
	dateTxt.font = Font.systemFont(10)
	dateTxt.textColor = Color.black()
	dateTxt.leftAlignText()
		widget.addSpacer(2)	
	
	

  // Inspirational Message
  let inspirationTxt = widget.addText(verse)
  inspirationTxt.font = Font.systemFont(10)
  inspirationTxt.textColor = Color.black()
  inspirationTxt.leftAlignText()
  
  widget.setPadding(8,15,10,5)
  
  return widget
}