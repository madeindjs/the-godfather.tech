const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);
const config = require("./webpack.config");
// TODO correct MFE plugin

config.plugins = [
  new ModuleFederationPlugin({
    // For remotes (please adjust)
    // name: "frontend",
    // filename: "remoteEntry.js",
    // exposes: {
    //     './Component': './/src/app/app.component.ts',
    // },

    // For hosts (please adjust)
    remotes: {
      kanban: "kanban@/kanban/remoteEntry.js",
    },

    shared: share({
      "@angular/core": {
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      },
      "@angular/common": {
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      },
      "@angular/common/http": {
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      },
      "@angular/router": {
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      },

      ...sharedMappings.getDescriptors(),
    }),
  }),
  sharedMappings.getPlugin(),
];

module.exports = config;
