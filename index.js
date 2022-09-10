const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");

module.exports = class PluginName extends Plugin {
	startPlugin() {
		const getNoiseCancellation = getModule(['getNoiseCancellation'], false);
		const getNoiseSuppression = getModule(['getNoiseSuppression'], false);
		const setNoiseSuppression = getModule(['setNoiseSuppression'], false);

		let allowChange = true;

		// Run whenever Krisp is changed
		getNoiseCancellation.addChangeListener(() => {
			if (
				getNoiseCancellation.getNoiseCancellation() === false &&
				getNoiseSuppression.getNoiseSuppression() === true &&
				allowChange
			) {
				// Disable noise suppression once
				setNoiseSuppression.setNoiseSuppression(false);
				allowChange = false
			} else if (getNoiseCancellation.getNoiseCancellation() === true) {
				// Krisp is back on, allow changes again
				allowChange = true
			}
		})
	}
	pluginWillUnload() { }
}