/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-cloudflare-api",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
    };
  },

  async run() {
    const bucket = new sst.cloudflare.Bucket("MyBucket");

    const api = new sst.cloudflare.Worker("Api", {
      handler: "index.ts",
      url: true,
      link: [bucket],
    });

    return {
      url: api.url,
    };
  },
});
