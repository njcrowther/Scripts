// Defines the InvisibileBackground Object
class InvisibleBackground {
  constructor() {}
  
  static sayHi() {
    return "Hello!";
  }

  static getImage(scriptName) {
    let screen = await determineScreen(scriptName);
    // console.log("determineScreen returned" + screen);
    return screen;
    // return "Got an Image!";
  }
}

// Creates an instance of the InvisibleBackground Object
let IB = new InvisibleBackground();

// Defines what the object exports
module.exports = InvisibleBackground();


// Try doing this, but with everything around the file
// Don't create a class. 

// module.exports = {
//   sayHi: IB.sayHi.bind(IB),
//   getImage: IB.getImage.bind(IB)
// };


async function determineScreen(scriptName) {
  // Determine if user has taken the screenshot
  var message = "Before you start, go to your home screen and enter wiggle mode. Scroll to the empty page on the far right and take a screenshot."
  let exitOptions = ["Continue","Exit to Take Screenshot"]
  let shouldExit = await generateAlert(message,exitOptions)
  if (shouldExit) return

  // return "Yep, it's a screen";


  // Get screenshot and determine phone size.
  let img = await Photos.fromLibrary()
  let height = img.size.height
  let phone = phoneSizes()[height]
  if (!phone) {
    message = "It looks like you selected an image that isn't an iPhone screenshot, or your iPhone is not supported. Try again with a different image."
    await generateAlert(message,["OK"])
    return
  }


  // Prompt for widget size and position.
  message = "What size of widget are you creating?"
  let sizes = ["Small","Medium","Large"]
  let size = await generateAlert(message,sizes)
  let widgetSize = sizes[size]
  
  message = "What position will it be in?"
  message += (height == 1136 ? " (Note that your device only supports two rows of widgets, so the middle and bottom options are the same.)" : "")
  
  
  // Determine image crop based on phone size.
  let crop = { w: "", h: "", x: "", y: "" }
  if (widgetSize == "Small") {
    crop.w = phone.small
    crop.h = phone.small
    let positions = ["Top left","Top right","Middle left","Middle right","Bottom left","Bottom right"]
    let position = await generateAlert(message,positions)
    
    // Convert the two words into two keys for the phone size dictionary.
    let keys = positions[position].toLowerCase().split(' ')
    crop.y = phone[keys[0]]
    crop.x = phone[keys[1]]
    
  } else if (widgetSize == "Medium") {
    crop.w = phone.medium
    crop.h = phone.small
    
    // Medium and large widgets have a fixed x-value.
    crop.x = phone.left
    let positions = ["Top","Middle","Bottom"]
    let position = await generateAlert(message,positions)
    let key = positions[position].toLowerCase()
    crop.y = phone[key]
    
  } else if(widgetSize == "Large") {
    crop.w = phone.medium
    crop.h = phone.large
    crop.x = phone.left
    let positions = ["Top","Bottom"]
    let position = await generateAlert(message,positions)
    
    // Large widgets at the bottom have the "middle" y-value.
    crop.y = position ? phone.middle : phone.top

    // Crop image and finalize the widget.
    let imgCrop = cropImage(img, new Rect(crop.x,crop.y,crop.w,crop.h))
    
    // Widgets are unique based on the name of the script.
    const filename = scriptName
    const files = FileManager.local()
    const path = files.joinPath(files.documentsDirectory(), filename)
    files.writeImage(path,imgCrop)

    return path;
}


// MODULE HELPER FUNCTIONS
// Generate an alert with the provided array of options.
async function generateAlert(message,options) {
  
  let alert = new Alert()
  alert.message = message
  
  for (const option of options) {
    alert.addAction(option)
  }
  
  let response = await alert.presentAlert()
  return response
}

// Crop an image into the specified rect.
async function cropImage(img,rect) {
   
  let draw = new DrawContext()
  draw.size = new Size(rect.width, rect.height)
  
  draw.drawImageAtPoint(img,new Point(-rect.x, -rect.y))  
  return draw.getImage()
}

// Pixel sizes and positions for widgets on all supported phones.
async function phoneSizes() {
  let phones = {	
	"2688": {
			"small":  507,
			"medium": 1080,
			"large":  1137,
			"left":  81,
			"right": 654,
			"top":    228,
			"middle": 858,
			"bottom": 1488
	},
	
	"1792": {
			"small":  338,
			"medium": 720,
			"large":  758,
			"left":  54,
			"right": 436,
			"top":    160,
			"middle": 580,
			"bottom": 1000
	},
	
	"2436": {
			"small":  465,
			"medium": 987,
			"large":  1035,
			"left":  69,
			"right": 591,
			"top":    213,
			"middle": 783,
			"bottom": 1353
	},
	
	"2208": {
			"small":  471,
			"medium": 1044,
			"large":  1071,
			"left":  99,
			"right": 672,
			"top":    114,
			"middle": 696,
			"bottom": 1278
	},
	
	"1334": {
			"small":  296,
			"medium": 642,
			"large":  648,
			"left":  54,
			"right": 400,
			"top":    60,
			"middle": 412,
			"bottom": 764
	},
	
	"1136": {
			"small":  282,
			"medium": 584,
			"large":  622,
			"left": 30,
			"right": 332,
			"top":  59,
			"middle": 399,
			"bottom": 399
	},
        "1624": {
      		"small": 310,
      		"medium": 658,
      		"large": 690,	
			"left": 46,
      		"right": 394,
      		"top": 142,
      		"middle": 522,
      		"bottom": 902 
        }
  }
  return phones
}


// 
// importModule('date.format')
// const url = "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3?id=p7#p7"
// 
// let now = new Date()
// let df = new DateFormatter()
// df.useFullDateStyle()
// df.useShortTimeStyle()
// const strDate = df.string(now)
// 
// log("Date is: " + strDate)
// 
// 
// let wv = new WebView()
// await wv.loadURL(url)
// let js = `document.getElementById("p7").textContent`
// let verse = await wv.evaluateJavaScript(js)
// log("Verse says " + verse)
// 
// 
// const inspiration = "Ask and it shall be given unto you; seek, and ye shall find; knock, and it shall be opened unto you. For every one that asketh, receiveth; and he that seeketh, findeth; and to him that knocketh, it shall be opened." 
// 
// if (config.runsInWidget) {
//   let widget = createWidget()
//   Script.setWidget(widget)
//   Script.complete()  
// }
// 
// function createWidget() {
//   let widget = new ListWidget()
  // widget.backgroundColor = new Color("#ffffff")
  // widget.leftAlignText() 
//   
  //Add Widget URL
//   widget.url = url
// 
// 	// Date and Time
// 	let dateTxt = widget.addText(strDate)
// 	dateTxt.font = Font.systemFont(10)
// 	dateTxt.textColor = Color.black()
// 	dateTxt.leftAlignText()
// 		widget.addSpacer(2)	
// 	
// 	
// 
  // Inspirational Message
//   let inspirationTxt = widget.addText(verse)
//   inspirationTxt.font = Font.systemFont(10)
//   inspirationTxt.textColor = Color.black()
//   inspirationTxt.leftAlignText()
//   
//   widget.setPadding(8,15,10,5)
//   
//   return widget
// }






// Variables used by Scriptable.


// This widget was created by Max Zeryck @mzeryck

// Widgets are unique based on the name of the script.
// const filename = Script.name() + ".jpg"
// const files = FileManager.local()
// const path = files.joinPath(files.documentsDirectory(), filename)