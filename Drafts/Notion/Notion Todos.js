// See online documentation for examples
// https://docs.getdrafts.com/docs/actions/scripting
// This script requires the MGCheckListPrompt Library found at: 
// Notion API Test
// debug.js is optional (use it if you uncomment the console.log()). Instructions can be found here:
// require('debug.js');

// Notion Integration token: secret_VtUlD7ZxhSg8DzXoAbnEUj5RigERN5n5xdy40TqCE8d

// Test DB ID: d7c4541957ec419191710d147dd7aaa2

// Set up Notion API Details
var notionToken = "secret_VtUlD7ZxhSg8DzXoAbnEUj5RigERN5n5xdy40TqCE8d";
var dbID = "374640a484484e118e8669fa54563ee7";

// Get Created Date
let date = draft.createdAt;
var ds = date.toLocaleDateString("en-US");


// Note Content
var noteContent = draft.content;
var lines = draft.content.split("\n");

for (i=0; i<lines.length; i++) {
	sendToNotion(lines[i]);
}

function sendToNotion(line) {
	// Create HTTP Request
	var http = HTTP.create();

	// Notion Response
	var response = http.request({
		"url": "https://api.notion.com/v1/pages",
		"method": "POST",
		"data": {
     	   parent: {
     	       database_id: dbID,
     	   },
     	   properties: {
     	       "Action Item": {
     	           title: [
     	               {
     	                   text: {
     	                       content: line,
     	                   }, 
     	               },
     	           ],
     	       },
     	       'Status': {
     	           select: {
     	               name: 'Active',
     	           },
     	       },
				'Do Date': {
					"date": {
						"start": ds
					}
				}
     	   },
	 	},
		"headers": {
			"Authorization": "Bearer " + notionToken,
			"Content-Type": "application/json",
			"Notion-Version": "2021-05-13"
		}
	});
}