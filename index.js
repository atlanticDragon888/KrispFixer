const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
module.exports = class PluginName extends Plugin {
  startPlugin() {
    getModule(['getNoiseCancellation'], false).addChangeListener(() => {
      if (getModule(['getNoiseCancellation'], false).getNoiseCancellation() === false && getModule(['getNoiseSuppression'], false).getNoiseSuppression() === true ){ getModule(['setNoiseSuppression'], false).setNoiseSuppression(false) }
    })
  }
  pluginWillUnload () {
  }
}