var response = http.request({
	"url": "https://api.notion.com/v1/pages",
	"method": "POST",
	"data": {
        parent: {
            database_id: dbID,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: title,
                        },
                    },
                ],
            },
            'Category': {
                multi_select: tags,
            },
            'Status': {
                select: {
                    name: 'Active',
                },
            },
        },
        children: [
        // {
        //     object: 'block',
        //     type: 'heading_2',
        //     heading_2: {
        //     text: [
        //         {
        //         type: 'text',
        //         text: {
        //             content: 'Lacinato kale',
        //         },
        //         },
        //     ],
        //     },
        // },
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    text: [
                        {
                        type: 'text',
                        text: {
                            content: 'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
                            link: {
                            url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
                            },
                        },
                        },
                    ],
                },
            },
        ],
	},
	"headers": {
		"Authorization": "Bearer " + notionToken,
		"Content-Type": "application/json",
		"Notion-Version": "2021-05-13"
	}
});



// var response = http.request({
// 	"url": "https://api.notion.com/v1/pages",
// 	"method": "POST",
// 	"data": {
// 		"parent": { "database_id": dbID },
//     	"properties": {
//       	"Name": {
//         		"title": [
//          		 {
//             		"text": {
//               		"content": "Yurts in Big Sur, California"
//             		}
//           	}]
//       	},
//       	"Tags": {
//       		select: { name: "tagName",},
//       	},
//     	}
// 	},
// 	"headers": {
// 		"Authorization": "Bearer " + notionToken,
// 		"Content-Type": "application/json",
// 		"Notion-Version": "2021-05-13"
// 	}
// });