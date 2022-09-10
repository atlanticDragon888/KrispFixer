const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");

module.exports = class PluginName extends Plugin {
	startPlugin() {
		let allowChange = true;

		// Run whenever Krisp is changed
		getModule(['getNoiseCancellation'], false).addChangeListener(() => {
			if (
				getModule(['getNoiseCancellation'], false).getNoiseCancellation() === false &&
				getModule(['getNoiseSuppression'], false).getNoiseSuppression() === true &&
				allowChange
			) {
				// Disable noise suppression once
				getModule(['setNoiseSuppression'], false).setNoiseSuppression(false);
				allowChange = false
			} else if (getModule(['getNoiseCancellation'], false).getNoiseCancellation() === true) {
				// Krisp is back on, allow changes again
				allowChange = true
			}
		})
	}
	pluginWillUnload() { }
}