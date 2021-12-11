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
var dbID = "6cd4cb04963e45aca4a656870db1b404";

// body.data.properties.Name.title[0].text.content
// Set up Request Body
var body = {
	"url": "https://api.notion.com/v1/pages",
	"method": "POST",
	"data": {
        parent: {
            database_id: dbID,
        },
        properties: {
            'Name': {
                title: [
                    {
                        text: {
                            content: "title"
                        },
                    },
                ],
            },
            'Category': {
                multi_select: "tags",
            },
            'Status': {
                select: {
                    name: 'Active',
                },
            },
            'Date': {
            	date: {
            		start: "2021-05-11T11:00:00.000-04:00",
            	}
            }
        },
        children: [
            {
                object: 'block',
                type: 'heading_2',
                heading_2: {
                    text: [{type: 'text',text:{content: "title"}}]
                }
            }
        ],
	},
	"headers": {
		"Authorization": "Bearer " + notionToken,
		"Content-Type": "application/json",
		"Notion-Version": "2021-05-13"
	}
}

// Note Date
body.data.properties.Date.date.start = draft.createdAt;

// Note Content
var noteContent = draft.content;
var lines = draft.content.split("\n");
body.data.properties.Name.title[0].text.content = lines[0];


var tags = formatTags(draft.tags);
// alert(tags);

// Check Content Length
var contentBlocks = checkContentLength(noteContent);
var content1 = contentBlocks[0];
var content2 = contentBlocks[1];

body.data.children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
        text: [
            {
            type: 'text',
            text: {
                content: content1,                        },
            },
        ],
}});

if (contentBlocks.length > 1){
    body.data.children.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
            text: [
                {
                type: 'text',
                text: {
                    content: content2,                        },
                },
            ],
    }});
}


// Create HTTP Request
var http = HTTP.create();

// Notion Response
var response = http.request(body);

if (response.success) {
	alert("Success " + response.statusCode + ": " + response.statusCode);
  var text = response.responseText;
  var data = response.responseData;
}
else {
	alert("Fail " + response.responseText);
  console.log(response.statusCode);
  console.log(response.error);
}

function formatTags(tagList) {
	//alert(tagList);
	var multiSelectArray = [];
	for (i=0; i < tagList.length; i++) {
//		var currentItem = '{\"name\":\"'+tagList[i]+'\"}';
		var currentItem = {"name": tagList[i]};		
		multiSelectArray.push(currentItem);
	}
	// alert(multiSelectArray);
	return multiSelectArray;
}


function checkContentLength(content) {
    var contentLength = Math.max(content.length/2,1);
    alert("contentLength: " + contentLength);
    var contentBlocksArray = [];

    if (content.length > 2000) {
        for (var i=0; i<2; i++) {
            if (contentLength*(i+1)<=content.length)contentBlocksArray.push(content.slice(contentLength*i, contentLength*(i+1)));
        }
    }
    else {
        contentBlocksArray.push(content);
    }

    alert("Content Block Array: " + contentBlocksArray);
    return contentBlocksArray;
}








