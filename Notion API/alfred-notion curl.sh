curl -X POST https://api.notion.com/v1/pages \
  -H "Authorization: Bearer secret_VtUlD7ZxhSg8DzXoAbnEUj5RigERN5n5xdy40TqCE8d" \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2021-05-13" \
  --data '{
    "parent": { "database_id": "6cd4cb04963e45aca4a656870db1b404" },
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": "Yurts in Big Sur, California"
            }
          }
        ]
      },
	 "Category": {
		"name": "apitest"
	 },
	 "Status": {
		"name": "Active"
	 }
    }
  }'