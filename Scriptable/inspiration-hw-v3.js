// const invisibleWidget = importModule('_modules/invisible-widget.js');
// // console.log("Say Hi: " + invisibleWidget.sayHi());

// const filename = Script.name() + ".jpg"
// let bgCropPath = invisibleWidget.getImage(filename);

// // const files = FileManager.local()
// // const path = files.joinPath(files.documentsDirectory(), filename)
// // files.writeImage(path,bgCrop)

// console.log("bgCrop stored at: " + bgCropPath);

// if (config.runsInWidget) {
//     let widget = new ListWidget()
//     widget.backgroundImage = files.readImage(bgCropPath)

//     Script.setWidget(widget)
//     Script.complete()
//     widget.presentMedium()
// }

importModule('_modules/invisible-widget-v2')

console.log(sayHi())
