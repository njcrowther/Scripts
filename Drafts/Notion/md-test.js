// Set up Notion API Details
var notionToken = "secret_VtUlD7ZxhSg8DzXoAbnEUj5RigERN5n5xdy40TqCE8d";
var dbID = "6cd4cb04963e45aca4a656870db1b404";


// Note Content
var noteContent = draft.content;

// Send to Parser
// Parser returns Array of Objects
// Send array of objects to sendToNotion function (use in children section)
sendToNotion(noteContent);



function sendToNotion(noteContent) {
    //alert(noteContent);

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
     	       "Name": {
     	           title: [
     	               {
     	                   text: {
     	                       content: "API MD Test",
     	                   },
     	               },
     	           ],
     	       },
     	       'Status': {
     	           select: {
     	               name: 'Active',
     	           },
     	       },
                'Category': {
                    multi_select: [
                        {
                            "name": "apitest"
                        },
                    ],
                },
     	   },
            children: [
                // {
                //     "object": "block",
                //     "type": "paragraph",
                //     "paragraph": {
                //         "type": "text",
                //         "text": [{
                //             "content": "Hellow world",
                //             "link": null
                //         }],
                //     }
                // },

                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                      text: [
                        {
                          type: 'text',
                          text: {
                            content: noteContent,
                          },
                        },
                      ],
                    },
                }
                // {
                //     "object": "block",
                //     "type": "heading_2",
                //     "heading_2": {
                //         "text": [{ "type": "text", "text": { "content": "Lacinato kale" } }]
                //     }
                // },
            ],
	 	},
		"headers": {
			"Authorization": "Bearer " + notionToken,
			"Content-Type": "application/json",
			"Notion-Version": "2021-08-16"
		}
	});
}

{
    "object": "block",
    "type": "paragraph",
    "paragraph": {
        "text": [{
            "type": "text",
            "text": {
                "content": noteContent
            }
        }],
    }
}

{
    "text": [
        {
            "type": "text",
            "text": {
                "content": noteContent,
            },
        },
    ],
},

{
    "object": "block",
    "type": "rich_text",
    "rich_text": [
        {
            "type": "text",
            "text": { "content": noteContent}
        }
    ]
},

curl 'https://api.notion.com/v1/pages' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2021-08-16" \
  --data '{
	"parent": { "database_id": "48f8fee9cd794180bc2fec0398253067" },
	"properties": {
		"Name": {
			"title": [
				{
					"text": {
						"content": "Tuscan Kale"
					}
				}
			]
		},
		"Description": {
			"rich_text": [
				{
					"text": {
						"content": "A dark green leafy vegetable"
					}
				}
			]
		},
		"Food group": {
			"select": {
				"name": "Vegetable"
			}
		},
		"Price": { "number": 2.5 }
	},
	"children": [
		{
			"object": "block",
			"type": "heading_2",
			"heading_2": {
				"text": [{ "type": "text", "text": { "content": "Lacinato kale" } }]
			}
		},
		{
			"object": "block",
			"type": "paragraph",
			"paragraph": {
				"text": [
					{
						"type": "text",
						"text": {
							"content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
							"link": { "url": "https://en.wikipedia.org/wiki/Lacinato_kale" }
						}
					}
				]
			}
		}
	]
}'

{
    "object": "block",
    "type": "paragraph",
    "paragraph": {
        "text": [
            {
                "type": "text",
                "text": {
                    "content": "",
                }
            }
        ]
    }
}