
/**
 * Create an object mapping project IDs to colors
 */
const createProjectIdColorMap = function() {
	const $labels = $('.vis-panel.vis-left > .vis-content > .vis-labelset > .vis-label');
	const map = {};
	$labels.each(function (index, $label) {
		const id = $($label).find('span.tipped-delegate:first').data('id');
		const color = $($label).find('.project-info:first').css('border-color');
		map[id] = color;
	})
	return map;
}

/**
 * Apply the color map to the matching bars in the chart
 * @param {object} colorMap 
 */
const applyColorsToChartBars = function(colorMap) {
	Object.keys(colorMap).forEach(function (id) {
		const color = colorMap[id];
		if (color.replace(/\s/g, "") === 'rgba(0,0,0,0)') return;
		const $el = $('.vis-tw-project#project-' + id);
		$el.css('border-color', color)
		$el.closest('.vis-item').css('border-color', color)
		$el.css('background', color)
		$el.closest('.vis-item').css('background', color)
		if ($el.hasClass('vis-tw-project-upcoming')) {
			$el.closest('.vis-item').css('opacity', 0.6)
		} else if ($el.hasClass('vis-tw-project-completed')) {
			$el.closest('.vis-item').css('opacity', 0.3)
		}
	})
}

function runChecker() {
	var done = false;
	var attempts = 0;

	function checkForElements() {

		attempts++;
		checkStopInterval();

		if ($('.vis-timeline .vis-item.vis-tw-project').length < 2) {
			return;
		}

		const colorMap = createProjectIdColorMap();
		// console.log(colorMap)

		if (Object.keys(colorMap).length > 0) {
			done = true;
			applyColorsToChartBars(colorMap);
		}
	}

	function checkStopInterval() {
		if (attempts > 10 || done) {
			clearInterval(checkInterval);
		}
	}

	const checkInterval = setInterval(checkForElements, 500);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// listen for messages sent from background.js
	if (request.message === 'new-chart-tab') {
		runChecker();
	}
});

runChecker();