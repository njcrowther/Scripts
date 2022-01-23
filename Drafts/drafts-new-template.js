// See online documentation for examples
// https://docs.getdrafts.com/docs/actions/scripting

// Created Date
let date = new Date();
var ds = date.toISOString().substring(0, 10);
// https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

// Create a checklist prompt
var prompt = new MGCheckListPrompt();
prompt.message = "What Template Should This Have?";
// var promptItems = ["UX Design","UX Research","Life","Hobby","Information Architecture","UI Design"];
var promptItems = [
	{ title: "Meeting", description: "Any kind of meeting" },
	{
		title: "Source",
		description:
			"Quotes and things I want to remember from videos, articles, or people",
	},
	{
		title: "Thought",
		description:
			"Any thoughts or impressions that I need to hang onto in Obsidian",
	},
	{
		title: "Scripture Study",
		description: "Notes from my study of the gospel",
	},
	{
		title: "Scripture Study | General Conference",
		description: "Notes from my study of the current general conference",
	},
	{
		title: "Book Review",
		description:
			"A review of books that I've read and things I want to remember about them",
	},
];

prompt.addItems(promptItems);
prompt.roundedCheckboxes = true;
prompt.singleSelectionMode = true;
prompt.selectsImmediately = false;
// prompt.allowsDoubleClickToSelect = true;
prompt.setSelectedItems([0, 2]); // will only preselect first.

// Show the prompt.
var selectedItems = prompt.show();
var template = "Empty Template";

// Get Template based on prompt.
var tag = "nothing";
if (prompt.didShow) {
	if (selectedItems != null) {
		if (promptItems[selectedItems].title == "Meeting") {
			template = createMeeting(ds);
			tag = "Meeting";
		} else if (promptItems[selectedItems].title == "Source") {
			template = createSource(ds);
			tag = "Source";
		} else if (promptItems[selectedItems].title == "Thought") {
			template = createSource(ds);
			tag = "Thought";
		} else if (promptItems[selectedItems].title == "Scripture Study") {
			template = createSource(ds);
			tag = "scripture-study";
		} else if (
			promptItems[selectedItems].title == "Scripture Study | General Conference"
		) {
			template = createSource(ds);
			tag = "general-conference";
		} else if (promptItems[selectedItems].title == "Book Review") {
			template = createBookReview(ds);
			tag = "book-review";
		}
	} else {
		app.displayInfoMessage("Prompt was cancelled.");
	}
} else {
	app.displayErrorMessage("Something went wrong.");
}

// create the draft
var d = Draft.create();
d.content = template;
d.addTag(tag);
d.update();

// load in editor and focus for editing
editor.load(d);
editor.activate();

function createMeeting(date) {
	const template =
		`---
created: ` +
		date +
		`
aliases: []
template: #meeting
tags:
---
# Meeting Notes ` +
		date +
		`
###### Metadata
navlink:
role:
project

## Notes

`;
	return template;
}

function createSource(date) {
	const template =
		`---
created: ` +
		date +
		`
aliases: []
template: #source
tags:
---
# Note from Source ` +
		date +
		`
###### Metadata
Links:
Tags:
Categories:
Topics: 
Source:
Author: [[@]]

## Notes

`;

	return template;
}

function createThought(date) {
	const template =
		`---
        created: ` + date +
		`
        aliases: []
        template: #thought
        tags:
        ---
        # 
        ###### Metadata
        Links:
        Tags:
        Categories: [[🧠 thoughts]]
        Topics: 
        Source:*

        ## Notes

        `;

        const templateMin="---\ncreated: "+date+"\naliases: []\ntemplate: #thought\ntags:\n---\n# \n###### Metadata\nLinks:\nTags:\nCategories: [[🧠 thoughts]]\nTopics: \nSource:*\n\n## Notes\n\n";
	return templateMin;
}

function createScriptureStudy(date) {
	const template =
		`---
created: ` +
		date +
		`
aliases: []
template: #scripture-study
tags:
---
#
###### Metadata
*Date: ` +
		date +
		`
Categories: [[scripture study]]
Topics: 
Readings:*

## Notes

`;

	return template;
}

function createGeneralConference(date) {
	const template =
		`---
created: ` +
		date +
		`
source: general conference
template: #general-conference
tags:
---
#
###### Metadata
*Date: ` +
		ds +
		`
Categories: #📖-Scripture-Study #🗓-General-Conference
Links: [[Spiritual Human/Gospel Study]] [[🗓-GC-10-21]]
Topics: 
Conference:
Speaker:
*
## Notes
`;
	return template;
}

function createBookReview(date) {
	const template =
		`---
created: ` +
		date +
		`
source: 
template: #book-review
tags:
---
#
###### Metadata
*Date: ` +
		ds +
		`
Title:
Author:
Categories: 
Links: [[Book Reviews]]
Topics: 
*
## Notes
`;
	return template;
}

//var selectedItemsIDs = [];
//for (item of selectedItems) {
// Set the posts draft tags
//draft.setTemplateTag("tags",promptItems[item].title);

//	var itemTitle = promptItems[item].title;
//	var itemID = getItemID()[itemTitle];
//	selectedItemsIDs.push(itemID);
//}
