function sendContent() {
    const response = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        body: notionBody, // string or object
        headers: {
            "Authorization": "Bearer " + notionToken,
            "Content-Type": "application/json",
            "Notion-Version": "2021-05-13"
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
}


const userAction = async () => {
	console.log("inside userAction");
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    body: notionBody, // string or object
    headers: {
	    "Authorization": "Bearer " + notionToken,
		"Content-Type": "application/json",
		"Notion-Version": "2021-05-13"
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
}