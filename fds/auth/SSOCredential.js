SSOCredential = function(appId, serviceToken, sid) {
  this.appId = appId;
  this.serviceToken = serviceToken;
  if (sid === undefined) {
    this.sid = "galaxy-fds";
  } else {
    this.sid = sid;
  }
};

SSOCredential.prototype = {

  AUTH_HEADER: "SSO",

  APP_ID: "appId",

  SERVICE_TOKEN: "serviceToken",

  SID: "sid",

  constructor: SSOCredential,

  addHeader: function(xhr) {
    var header = Common.get("AUTHORIZATION");
    xhr.setRequestHeader(header, this.AUTH_HEADER);
    return xhr;
  },

  addParam: function(uri) {
    if (uri.indexOf('?') >= 0) {
      uri += "&";
    } else {
      uri += "?";
    }

    uri += this.APP_ID + "=" + this.appId;
    uri += "&";
    uri += this.SERVICE_TOKEN + "=" + this.serviceToken;
    uri += "&";
    uri += this.SID + "=" + this.sid;
    return uri;
  }
};