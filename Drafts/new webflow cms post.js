// See online documentation for examples
// https://docs.getdrafts.com/docs/actions/scripting
// This script requires the MGCheckListPrompt Library found at: 
// Webflow API documentation can be found here: 
// debug.js is optional (use it if you uncomment the console.log()). Instructions can be found here:
// require('debug.js');

// Set up Webflow CMS
var webflowToken = "6674068aee1a48dcf990eeba7c3986d92b559c6ead4c44398c500bc5f447944c";
var collectionID = "5f5a9748a45e27c7a4e37f54";

// Create a checklist prompt
var prompt = new MGCheckListPrompt();
prompt.message = "What Categories Should Be Added?";
// var promptItems = ["UX Design","UX Research","Life","Hobby","Information Architecture","UI Design"];
var promptItems = [{title: "UX Design",
					description: "An explanation goes here."},
					{title: "UX Research",
						description: "An explanation goes here."},						
					{title: "Life",
						description: "An explanation goes here."},
					{title: "Hobby",
						description: "An explanation goes here."},
					{title: "Information Architecture",
						description: "An explanation goes here."},
					{title: "UI Design",
						description: "An explanation goes here."}
					];
prompt.addItems(promptItems);
prompt.roundedCheckboxes = true;

// Show the prompt.
var selectedItems = prompt.show();
// console.log(46, "Selected Item Numbers: ", selectedItems);

// Convert Categories to IDs
var selectedItemsIDs = [];
for (item of selectedItems) {
	// Set the posts draft tags
	draft.setTemplateTag("tags",promptItems[item].title);

	var itemTitle = promptItems[item].title;
	var itemID = getItemID()[itemTitle];
	selectedItemsIDs.push(itemID);
}

// console.log(42, selectedItemsIDs.toString());

var title = draft.processTemplate("[[title]]");
var body = draft.processTemplate("[[body]]");

// Create HTTP Request
var http = HTTP.create();

var response = http.request({
	"url": "https://api.webflow.com/collections/" + collectionID + "/items?limit=1",
	"method": "POST",
	"data": {
		"fields": {
        "name": title,
        //"slug": safeTitle,
        "_archived": false,
        "_draft": false,
        "layout": "No Header Img – Short Post",
        "content": body,
        "categories": selectedItemsIDs
    }
	},
	"headers": {
		"Authorization": "Bearer " + webflowToken,
		"accept-version": "1.0.0",
		"Content-Type": "application/json"
	}
});

if (response.success) {
  var text = response.responseText;
  var data = response.responseData;
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}


// Returns category number for webflow multi-reference item
function getItemID() {
	let ids = {
		"UX Design":"5f97128eae39917327e25428",
		"UX Research":"5f971388e107a65709fb3470",
		"Life":"5f9712af657265f5379139af",
		"Hobby":"5f9712a0ea00ab578a1a1d04",
		"Information Architecture":"5f97129941cd8e2b77eca50c",
		"UI Design":"5f9712bbecd4e6303cc1f2c5",
		"LEGO":"5f9712a66954696b4a10a7a4"
	}
	return ids;
}