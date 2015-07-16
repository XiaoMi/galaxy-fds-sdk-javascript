ClientConfiguration = function() {};

ClientConfiguration.prototype = {

  constructor: ClientConfiguration,

  HTTP: "http://",

  HTTPS: "https://",

  baseHttpHost: "files.fds.api.xiaomi.com",

  baseCdnHttpHost: "cdn.fds.api.xiaomi.com",

  baseHttpsHost: "files.fds.api.xiaomi.com",

  baseCdnHttpsHost: "cdn.fds-ssl.api.xiaomi.com",

  regionName: "",

  enableCdnForDownload: true,

  enableCdnForUpload: false,

  enableHttps: true,

  enableMd5Calculate: false,

  getDownloadBaseUri: function() {
    return this.buildBaseUri(this.enableCdnForDownload);
  },

  getUploadBaseUri: function() {
    return this.buildBaseUri(this.enableCdnForUpload);
  },

  getBaseUri: function() {
    return this.buildBaseUri(false);
  },

  isMd5CalculateEnabled: function() {
    return this.enableMd5Calculate;
  },

  setMd5CalculateEnable: function(enable) {
    this.enableMd5Calculate = enable;
  },

  buildBaseUri: function(enableCdn) {
    var baseUri = "";
    if (this.enableHttps) {
      baseUri += this.HTTPS;
    } else {
      baseUri += this.HTTP;
    }

    if (this.regionName.length > 0) {
      baseUri += this.regionName + "-";
    }

    if (enableCdn) {
      if (this.enableHttps) {
        baseUri += this.baseCdnHttpsHost;
      } else {
        baseUri += this.baseCdnHttpHost;
      }
    } else {
      if (this.enableHttps) {
        baseUri += this.baseHttpsHost;
      } else {
        baseUri += this.baseHttpsHost;
      }
    }
    baseUri += "/";
    return baseUri;
  }
};