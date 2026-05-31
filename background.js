browser.menus.create({
	id: "copy-as-markdown",
	title: "Copy email as Markdown",
	contexts: ["page"],
	documentUrlPatterns: ["https://mail.google.com/*"],
});

browser.menus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "copy-as-markdown") {
		browser.tabs.sendMessage(tab.id, { action: "copyMarkdown" });
	}
});