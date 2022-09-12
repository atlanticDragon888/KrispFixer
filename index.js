const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");

module.exports = class KrispFixer extends Plugin {
	startPlugin() {
		const { addChangeListener, getNoiseCancellation, getNoiseSuppression } = getModule(['getNoiseCancellation'], false);
		const { setNoiseSuppression } = getModule(['setNoiseSuppression'], false);

		let allowChange = true;

    this.handleChange = () => {
			if (
				getNoiseCancellation() === false &&
				getNoiseSuppression() === true &&
				allowChange
			) {
				// Disable noise suppression once
				setNoiseSuppression(false);
				allowChange = false
			} else if (getNoiseCancellation() === true) {
				// Krisp is back on, allow changes again
				allowChange = true
			}
		}

		// Run whenever Krisp is changed
		addChangeListener(this.handleChange)
	}
	pluginWillUnload() {
    const { removeChangeListener } = getModule(['getNoiseCancellation'], false);
    removeChangeListener(this.handleChange)
  }
}