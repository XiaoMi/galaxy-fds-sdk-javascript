GalaxyFDSClient = function (credential, config) {
  this.credential = credential;
  this.config = config;
};

GalaxyFDSClient.prototype = {

  constructor: GalaxyFDSClient,

  jquery: jQuery,

  delimiter: "/",

  maxKeys: 15,

  listBuckets: function (success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, "");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("List buckets failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  listAuthorizedBuckets: function (success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, "", "authorizedBuckets");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("List authorized buckets failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  createBucket: function (bucketName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Create bucket failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  deleteBucket: function (bucketName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "DELETE",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200 || xhr.status === 404) {
          success();
        } else {
          fail("Delete bucket failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  getBucket: function (bucketName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200 || xhr.status === 404) {
          success(xhr.responseJSON);
        } else {
          fail("Get bucket failed, status:" + xhr.status
          + ", error:" + xhr.responseText);
        }
      }
    })
  },

  doesBucketExist: function (bucketName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "HEAD",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 404) {
          success(false);
        } else if (xhr.status === 403 || xhr.status === 200) {
          success(true);
        } else {
          fail("Check bucket existence failed, status:" + xhr.status
          + ", error:" + xhr.responseText);
        }
      }
    });
  },

  getBucketAcl: function (bucketName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "acl");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("Get bucket acl failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  setBucketAcl: function (bucketName, acl, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "acl");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      data: JSON.stringify(acl),
      contentType: "application/json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Set bucket acl failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  deleteBucketAcl: function (bucketName, acl, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "acl", "action=delete");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      data: JSON.stringify(acl),
      contentType: "application/json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Delete bucket acl failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    })
  },

  listObjects: function (bucketName, prefix, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "prefix=" + prefix,
        "delimiter=" + this.delimiter, "maxKeys=" + this.maxKeys);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("List objects failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  listTrashObjects: function (prefix, success, fail) {
    return this.listObjects("trash", prefix, success, fail);
  },

  listNextBatchOfObjects: function (previousObjectListing, success, fail) {
    if (!previousObjectListing["truncated"]) {
      fail("The previous listObjects() response is complete, call" +
      " of listNextBatchOfObjects() will be ignored.");
      return;
    }

    var bucketName = previousObjectListing["name"];
    var prefix = previousObjectListing["prefix"];
    var marker = previousObjectListing["nextMarker"];

    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "prefix=" + prefix,
        "delimiter=" + this.delimiter, "maxKeys=" + this.maxKeys,
        "marker=" + marker);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("List objects failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  putObject: function (bucketName, objectName, content, metadata,
                       progressListener, success, fail) {
    var baseUri = this.config.getUploadBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName);
    var self = this;
    if (this.config.isMd5CalculateEnabled()) {
      if (metadata == null) {
        metadata = new FDSObjectMetadata();
      }
      metadata.addHeader(Common.get("CONTENT_MD5"), this.jquery.md5(content));
    }
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr, metadata);
      },
      dataType: "json",
      data: content,
      cache: false,
      processData: false,
      contentType: false,
      xhr: function () {
        var xhr = $.ajaxSettings.xhr();
        xhr.upload.onprogress = function (event) {
          var progress = Math.floor(event.loaded / event.total * 100);
          if (progressListener !== undefined && progressListener !== null) {
            progressListener(progress);
          }
        };
        return xhr;
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("Put object failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  postObject: function (bucketName, content, metadata, success, fail) {
    var baseUri = this.config.getUploadBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/");
    var self = this;
    if (this.config.isMd5CalculateEnabled()) {
      if (metadata == null) {
        metadata = new FDSObjectMetadata();
      }
      metadata.addHeader(Common.get("CONTENT_MD5"), this.jquery.md5(content));
    }
    return this.jquery.ajax({
      url: uri,
      type: "POST",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      data: content,
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("Put object failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  getObject: function (bucketName, objectName, success, fail) {
    var baseUri = this.config.getDownloadBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName);
    return this.jquery.fileDownload(uri + "&Authentication=SSO").
        done(function () {
          success();
        }).
        fail(function () {
          fail("Get object failed");
        });
  },

  getObjectMetadata: function (bucketName, objectName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName, "metadata");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          var metadata = self.parseMetadataFromHeaders(xhr.getAllResponseHeaders());
          success(metadata);
        } else {
          fail("Get object metadata failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  getObjectAcl: function (bucketName, objectName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName, "acl");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("Get object acl failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  setObjectAcl: function (bucketName, objectName, acl, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName, "acl");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      data: JSON.stringify(acl),
      contentType: "application/json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Set object acl failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  deleteObjectAcl: function (bucketName, objectName, acl, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName, "acl",
        "action=delete");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      data: JSON.stringify(acl),
      contentType: "application/json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Delete object acl failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  doesObjectExist: function (bucketName, objectName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "HEAD",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200 || xhr.status === 403) {
          success(true);
        } else if (xhr.status === 404) {
          success(false);
        } else {
          fail("Check object existence failed, status:" + xhr.status
          + ", error:" + xhr.responseText);
        }
      }
    });
  },

  deleteObject: function (bucketName, objectName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "DELETE",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Delete object failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  restoreObject: function (bucketName, objectName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName, "restore")
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Restore object failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    })
  },

  renameObject: function (bucketName, srcObjectName, destObjectName,
                          success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + srcObjectName,
        "renameTo=" + destObjectName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Rename object failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  prefetchObject: function (bucketName, objectName, presignedUrl, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName,
        "prefetch");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      data: presignedUrl,
      contentType: "text/plain",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Prefetch object failed, status:" + xhr.status + ", error:" +
          xhr.responseText);
        }
      }
    });
  },

  refreshObject: function (bucketName, objectName, presignedUrl, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName,
        "refresh");
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      data: presignedUrl,
      contentType: "text/plain",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Refresh object failed, status:" + xhr.status + ", error:" +
          xhr.responseText);
        }
      }
    });
  },

  addDomainMapping: function (bucketName, domainName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "domain=" + domainName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "PUT",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Add domain mapping failed, status:" + xhr.status + ", error:" +
          xhr.responseText);
        }
      }
    });
  },

  deleteDomainMapping: function (bucketName, domainName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "domain=" + domainName);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "DELETE",
      beforeSend: function (xhr) {
        self.prepareRequestUri(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("Delete domain mapping failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  listDomainMappings: function (bucketName, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "domain")
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestUri(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success();
        } else {
          fail("List domain mappings failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  getMetrics: function (bucketName, startTime, endTime, metricName, type,
      aggregator, downsampleAggregator, downsampleInterval, downsampleTimeUnit,
      calcRate, success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName, "tsd", "startTime=" + startTime,
        "endTime=" + endTime, "metric=" + metricName, "type=" + type,
        "aggregator=" + aggregator, "downsampleAggregator=" + downsampleAggregator,
        "downsampleInterval=" + downsampleInterval, "downsampleTimeUnit=" +
        downsampleTimeUnit, "calcRate=" + calcRate);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("Get metrics failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  getPresignedUrl: function(bucketName, objectName, subResources, expiration,
    httpMethod, enableCdn, enableHttps, signAlgorithm, success, fail) {
    var subResourcesString = "";
    if (subResources != null) {
      var count = 0;
      for (idx in subResources) {
        if (count === 0) {
          subResourcesString += subResources[idx];
        } else {
          subResourcesString += ":" + subResources[idx];
        }
        count++;
      }
    }

    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, bucketName + "/" + objectName, "presignedUrl",
        "subResources=" + subResourcesString, "expiration=" + expiration,
        "httpMethod=" + httpMethod, "enableCdn=" + enableCdn,
        "enableHttps=" + enableHttps, "signAlgorithm=" + signAlgorithm);
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseText)
        } else {
          fail("Get presigned url failed, status:" + xhr.status +
          ", error:" + xhr.responseText);
        }
      }
    });
  },

  getDownloadObjectUrl: function (bucketName, objectName, enableHttps, enableCdn, success, fail) {
    var configTmp = new ClientConfiguration();
    configTmp.enableHttps = enableHttps;
    configTmp.enableCdnForDownload = enableCdn;
    return configTmp.getDownloadBaseUri() + bucketName + "/" + objectName;
  },

  getDeveloperInfo: function (success, fail) {
    var baseUri = this.config.getBaseUri();
    var uri = this.formatUri(baseUri, "", "developerInfo")
    var self = this;
    return this.jquery.ajax({
      url: uri,
      type: "GET",
      beforeSend: function (xhr) {
        self.prepareRequestHeader(xhr);
      },
      dataType: "json",
      complete: function (xhr, status) {
        if (xhr.status === 200) {
          success(xhr.responseJSON);
        } else {
          fail("Get developer info failed, status:" + xhr.status
          + ", error:" + xhr.responseText);
        }
      }
    });
  },

  prepareRequestHeader: function (xhr, metadata) {
    this.credential.addHeader(xhr);
    if (metadata !== undefined && metadata !== null) {
      for (key in metadata.metadata) {
        xhr.setRequestHeader(key, metadata.metadata[key]);
      }
    }
  },

  prepareRequestUri: function (uri) {
    return this.credential.addParam(uri);
  },

  formatUri: function (baseUri) {
    if (arguments.length < 1) {
      throw "Invalid parameter for formatUri()";
    }

    var count = 0;
    var arg;
    var uri = baseUri;

    for (arg in arguments) {
      if (count === 1) {
        uri += arguments[arg];
      } else if (count == 2) {
        uri += "?" + arguments[arg];
      } else if (count > 2) {
        uri += "&" + arguments[arg];
      }
      ++count;
    }
    return this.prepareRequestUri(uri);
  },

  parseMetadataFromHeaders: function (headers) {
    var metadata = new FDSObjectMetadata();
    var headersArray = headers.split("\r\n");
    for (index in headersArray) {
      var key = headersArray[index].split(':')[0].toLowerCase();
      var value = headersArray[index].split(':')[1];
      metadata.addHeader(key, value);
      metadata.addUserMetadata(key, value);
    }
    return metadata;
  }
};
