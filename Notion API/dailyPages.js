// This script builds out the next week of Notion Daily Pages
// Notion Info
var notionToken = "secret_VtUlD7ZxhSg8DzXoAbnEUj5RigERN5n5xdy40TqCE8d";
var DailydbID = "4890dfc4a968432aa26ad21479177665";
var WeeklydbID = "";


// Calculate the next Sunday through Saturday
var dateArray = [];
for (i=0; i < 7; i++){
    var nextDate = nextDate(i);
    dateArray.push(nextDate);
}


// Create Weekly page in Notion
var 

// Create HTTP Request
var http = HTTP.create();

var response = http.request({
	"url": "https://api.notion.com/v1/pages",
	"method": "POST",
	"data": {
        parent: {
            database_id: WeeklydbID,
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
        }
	},
	"headers": {
		"Authorization": "Bearer " + notionToken,
		"Content-Type": "application/json",
		"Notion-Version": "2021-05-13"
	}
});

// Create daily pages in Notion 




function nextDate(dayIndex) {
    var today = new Date();
    var nextDate = today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
    return nextDate;
}

5/17/21 + (0-1-1+7) % 7 + 1
5/17/21 + (5) % 7 + 1





// Notion Response


if (response.success) {
	alert("Success " + response.statusCode + ": " + response.statusCode);
  var text = response.responseText;
  var data = response.responseData;
}
else {
	alert("Fail " + response.statusCode + ": " + response.responseText);
  console.log(response.statusCode);
  console.log(response.error);
}
