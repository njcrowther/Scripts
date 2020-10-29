// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;

// Check if files are in the right spot
let fm = FileManager.iCloud()
let modulePath = fm.documentsDirectory() + '/_modules/invisible-widget/index.js'
let exists = fm.fileExists(modulePath)

// if (exists) {
//     console.log("File Exists")
// } else if (!exists) {
//     console.log("File Doesn't Exist")
// }

// Create Path for Image
const filename = Script.name() + ".jpg"
const localFiles = FileManager.local()
const path = localFiles.joinPath(localFiles.documentsDirectory(), filename)

// Create Date
let today = new Date()
let df = new DateFormatter()
df.useFullDateStyle()
const strDate = df.string(today)

// Create Quote
const quote = "Ask and it shall be given unto you; seek, and ye shall find; knock, and it shall be opened unto you. For every one that asketh, receiveth; and he that seeketh, findeth; and to him that knocketh, it shall be opened."

if (config.runsInWidget) {
    let widget = createWidget()
    Script.setWidget(widget)
    Script.complete()
} else {
    // Create Image Path Object
    let iW = importModule(modulePath)

    // Call the getImage function of the object
    imgPath = await iW.getImage(localFiles, path)
    console.log("iW path: " + imgPath)

    Script.complete()
}



function createWidget() {
    let widget = new ListWidget()
    
    // Add Background
    widget.backgroundImage = localFiles.readImage(path)

    //Add Date
    let dateTxt = widget.addText(strDate)
    dateTxt.font = Font.systemFont(20)
    dateTxt.textColor = Color.black()
    dateTxt.rightAlignText()
    
    widget.addSpacer(4)

    // Quote
    let inspirationTxt = widget.addText(quote)
    inspirationTxt.font = Font.systemFont(10)
    inspirationTxt.textColor = Color.black()
    inspirationTxt.leftAlignText()
    
    widget.setPadding(8,15,10,5)
    
    return widget
}

// console.log("Say Hi: " + invisibleWidget.sayHi());


// let fn = Script.name() + ".jpg"
// let bgCropPath = invisibleWidget.getImage(iW.path)
// console.log("bgCropPath:" + bgCropPath)

// const files = FileManager.local()
// const path = files.joinPath(files.documentsDirectory(), filename)
// files.writeImage(path,bgCrop)

// console.log("bgCrop stored at: " + bgCropPath);

// if (config.runsInWidget) {
//     let widget = new ListWidget()
//     widget.backgroundImage = files.readImage(bgCropPath)

//     Script.setWidget(widget)
//     Script.complete()
//     widget.presentMedium()
// }
