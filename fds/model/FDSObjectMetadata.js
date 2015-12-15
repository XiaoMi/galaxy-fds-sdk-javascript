FDSObjectMetadata = function() {
  this.metadata = {};
};

FDSObjectMetadata.prototype = {

  constructor: FDSObjectMetadata,

  PRE_DEFINED_METADATA: [
    Common.get("CACHE_CONTROL"),
    Common.get("CONTENT_ENCODING"),
    Common.get("CONTENT_LENGTH"),
    Common.get("CONTENT_MD5"),
    Common.get("CONTENT_TYPE"),
    Common.get("UPLOAD_TIME")
  ],

  USER_DEFINED_METADATA_PREFIX: Common.get("XIAOMI_HEADER_PREFIX") + "meta-",

  addHeader: function(key, value) {
    if (this.PRE_DEFINED_METADATA.indexOf(key) >= 0) {
      this.metadata[key] = value;
    }
  },

  addUserMetadata: function(key, value) {
    if (key && key.indexOf(this.USER_DEFINED_METADATA_PREFIX) == 0) {
      this.metadata[key] = value;
    }
  },

  setUserMetadata: function(metadata) {
    for (key in metadata) {
      if (key.indexOf(this.USER_DEFINED_METADATA_PREFIX) == 0) {
        this.metadata[key] = metadata[key];
      }
    }
  },

  fromJson: function(json) {
    for (key in json) {
      if (key.indexOf(this.USER_DEFINED_METADATA_PREFIX) ||
        this.PRE_DEFINED_METADATA.indexOf(key) >= 0) {
        this.metadata[key] = json[key];
      }
    }
  }
};