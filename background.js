

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// console.log(2, tabId, changeInfo, tab)
	if (!changeInfo.url || !changeInfo.url.includes('teamwork.com/#/planning/chart')) return;
	chrome.tabs.sendMessage(tabId, {
		message: 'new-chart-tab',
	})
});

