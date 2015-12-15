var Common = (function() {
  var constants = {
    XIAOMI_HEADER_PREFIX: "x-xiaomi-",
    XIAOMI_HEADER_DATE: "x-xiaomi-date",

    // Required query parameters for pre-signed uri
    GALAXY_ACCESS_KEY_ID: "GalaxyAccessKeyID",
    SIGNATURE: "signature",
    EXPIRES: "Expires",

    // Http headers used for authentication
    AUTHORIZATION: "authorization",
    CONTENT_MD5: "content-md5",
    CONTENT_TYPE: "content-type",
    DATE: "date",

    REQUEST_TIME_LIMIT: 900000, // 15min

    // Pre-defined object metadata headers
    CACHE_CONTROL: "cache-control",
    CONTENT_ENCODING: "content-encoding",
    CONTENT_LENGTH: "content-length",
    LAST_MODIFIED: "last-modified",
    UPLOAD_TIME: "upload-time",

    DEFAULT_FDS_SERVICE_BASE_URI: "http://files.fds.api.xiaomi.com/",
    DEFAULT_CDN_SERVICE_URI: "http://cdn.fds.api.xiaomi.com/"
  };

  return { get: function(name) { return constants[name]; }};
})();

