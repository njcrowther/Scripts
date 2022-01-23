/*
    A script to upload notes from Drafts into Notion, adding the database items along with the note
*/


// PROMPT FOR TEMPLATE TYPE (CATEGORY)
var categoryPrompt = new MGCheckListPrompt();
categoryPrompt.message = "What Template Should This Have?";

var categoryType = [
	{   title: "Meeting", 
        description: "Any kind of meeting" 
    },
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
    {
        title: "Other",
        description: "Creates a new note Category"
    }
];

categoryPrompt.addItems(promptItems);
categoryPrompt.roundedCheckboxes = true;
categoryPrompt.singleSelectionMode = true;
categoryPrompt.selectsImmediately = false;
// prompt.allowsDoubleClickToSelect = true;
categoryPrompt.setSelectedItems([0, 2]); // will only preselect first.

// Show the prompt.
var selectedItems = categoryPrompt.show();
var template = "Empty Template";

// Get Template based on prompt.
var tag = "nothing";
if (categoryPrompt.didShow) {
	if (selectedItems != null) {
		/*if (promptItems[selectedItems].title == "Meeting") {
			template = createMeeting(ds);
			tag = "Meeting";
		} else if (promptItems[selectedItems].title == "Source") {
			template = createSource(ds);
			tag = "Source";
            */
		} if (promptItems[selectedItems].title == "Thought") {
			template = createSource(ds);
			tag = "Thought";
		} /* else if (promptItems[selectedItems].title == "Scripture Study") {
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
		} */
	} else {
		app.displayInfoMessage("Prompt was cancelled.");
	}
} else {
	app.displayErrorMessage("Something went wrong.");
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























// create the draft
var d = Draft.create();
d.content = template;
d.addTag(tag);
d.update();

// load in editor and focus for editing
editor.load(d);
editor.activate();