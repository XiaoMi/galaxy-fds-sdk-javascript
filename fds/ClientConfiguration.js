ClientConfiguration = function() {};

ClientConfiguration.prototype = {

  constructor: ClientConfiguration,

  HTTP: "http://",

  HTTPS: "https://",

  URI_CDN : "cdn",

  URI_SUFFIX : "fds.api.xiaomi.com",

  URI_CDN_SUFFIX : "fds.api.mi-img.com",

  regionName: "cnbj0",

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

    if (enableCdn) {
      baseUri += URI_CDN + "." + this.regionName + "." + this.URI_CDN_SUFFIX;
    } else {
      baseUri += this.regionName + "." + this.URI_SUFFIX;
    }
    baseUri += "/";
    return baseUri;
  }
};