const { Plugin } = require("powercord/entities");

module.exports = class PluginName extends Plugin {
  startPlugin() {
    // Initializing Here
  }
  pluginWillUnload() {
    // Unloading Here
  }
}