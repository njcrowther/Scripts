// let background = importModule('invisible-widget')

var updateChoice = "What would you like to update?"
let updateOptions = ["Background","Inspiration","Cancel"]
let updateSelection = await generateAlert(updateChoice,updateOptions)

if (updateSelection == "Background") {
    generateAlert("UPDATE BACKGROUND",["Yep!", "Nope!"])
    return
} else if (updateSelection == "Inspiration") {
    generateAlert("UPDATE INSPIRATION",["Yep!", "Nope!"])
    return
} else {
    generateAlert("DO NOTHING!",["Yep!", "Nope!"])
    return
}



// const url = "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/3?id=p7#p7"
	
// let now = new Date()
// let df = new DateFormatter()
// df.useFullDateStyle()
// // 	df.useShortTimeStyle()
// const strDate = df.string(now)

// let wv = new WebView()
// await wv.loadURL(url)
// let js = `document.getElementById("p7").textContent`
// let verse = await wv.evaluateJavaScript(js)
// log("Verse says " + verse)


// const inspiration = "Ask and it shall be given unto you; seek, and ye shall find; knock, and it shall be opened unto you. For every one that asketh, receiveth; and he that seeketh, findeth; and to him that knocketh, it shall be opened." 

// widget.url = url







// if (config.runsInWidget) {
//     let widget = new ListWidget()
//     widget.backgroundImage = files.readImage(path)
  
    
  
//       // Date and Time
//       let dateTxt = widget.addText(strDate)
//       dateTxt.font = Font.boldSystemFont(18)
//       dateTxt.textColor = Color.black()
//       dateTxt.rightAlignText()
//           widget.addSpacer(2)	
      
      
  
//   // Inspirational Message
//     let inspirationTxt = widget.addText(verse)
//     inspirationTxt.font = Font.systemFont(18)
//     inspirationTxt.textColor = Color.black()
//     inspirationTxt.rightAlignText()
    
//     widget.setPadding(0,15,10,5)
  
    
//     // You can your own code here to add additional items to the "invisible" background of the widget.
    
//     Script.setWidget(widget)
//     Script.complete()
  
//   /*
//    * The code below this comment is used to set up the invisible widget.
//    * ===================================================================
//    */
//   } else {