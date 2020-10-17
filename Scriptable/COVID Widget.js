// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;


let w = new ListWidget()

w. setPadding(10,10,10,10)
w.spacing = 4

let titleStack = w.addStack()
let wtitle = titleStack.addText("COVID Daily Increase")

let row = w.addStack()

await addState("ar", "Arkansas", row)
row.addSpacer(20)
await addState("ut", "Utah", row)
row.addSpacer(20)
await addState("wa", "Washington", row)

w.presentMedium()

async function addState(state, stateName, row) {
    // Get State Information
    let url = "https://api.covidtracking.com/v1/states/" + state + "/current.json"
    // console.log("URL: " + url)
    let req = new Request(url)
    
    let result = await req.loadJSON()
    // console.log(result)

    // Create Stack
    let stack = row.addStack()
    stack.layoutVertically()

    // Add Title
    let sTitle = stack.addText(stateName)
    // cFont = new Font(Baskerville, 14)
    // sTitle.font = cFont
    sTitle.font = Font.semiboldRoundedSystemFont(14)
    sTitle.centerAlignText()
    stack.addSpacer(4)

    // Add Cases
    let cases = result.positiveIncrease
    let sCases = stack.addText(cases.toString())
    sCases.font = Font.semiboldRoundedSystemFont(14)
    sCases.centerAlignText()
}