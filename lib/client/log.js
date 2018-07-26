/* eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
'use strict';

var $protobuf = require('protobufjs/minimal');

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots.default || ($protobuf.roots.default = {});

$root.Log = (function() {

  /**
     * Properties of a Log.
     * @exports ILog
     * @interface ILog
     * @property {number} time Log time
     * @property {Array.<Log.IContent>|null} [contents] Log contents
     */

  /**
     * Constructs a new Log.
     * @exports Log
     * @classdesc Represents a Log.
     * @implements ILog
     * @constructor
     * @param {ILog=} [properties] Properties to set
     */
  function Log(properties) {
    this.contents = [];
    if (properties) {
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]]; }
      }
    }
  }

  /**
     * Log time.
     * @member {number} time
     * @memberof Log
     * @instance
     */
  Log.prototype.time = 0;

  /**
     * Log contents.
     * @member {Array.<Log.IContent>} contents
     * @memberof Log
     * @instance
     */
  Log.prototype.contents = $util.emptyArray;

  /**
     * Creates a new Log instance using the specified properties.
     * @function create
     * @memberof Log
     * @static
     * @param {ILog=} [properties] Properties to set
     * @return {Log} Log instance
     */
  Log.create = function create(properties) {
    return new Log(properties);
  };

  /**
     * Encodes the specified Log message. Does not implicitly {@link Log.verify|verify} messages.
     * @function encode
     * @memberof Log
     * @static
     * @param {ILog} message Log message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @return {$protobuf.Writer} Writer
     */
  Log.encode = function encode(message, writer) {
    if (!writer) { writer = $Writer.create(); }
    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.time);
    if (message.contents != null && message.contents.length) {
      for (var i = 0; i < message.contents.length; ++i) { $root.Log.Content.encode(message.contents[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim(); }
    }
    return writer;
  };

  /**
     * Encodes the specified Log message, length delimited. Does not implicitly {@link Log.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Log
     * @static
     * @param {ILog} message Log message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @return {$protobuf.Writer} Writer
     */
  Log.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
     * Decodes a Log message from the specified reader or buffer.
     * @function decode
     * @memberof Log
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @return {Log} Log
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Log.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader); }
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Log();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = reader.uint32();
          break;
        case 2:
          if (!(message.contents && message.contents.length)) { message.contents = []; }
          message.contents.push($root.Log.Content.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    if (!message.hasOwnProperty('time')) { throw $util.ProtocolError("missing required 'time'", { instance: message }); }
    return message;
  };

  /**
     * Decodes a Log message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Log
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @return {Log} Log
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  Log.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader); }
    return this.decode(reader, reader.uint32());
  };

  /**
     * Verifies a Log message.
     * @function verify
     * @memberof Log
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @return {string|null} `null` if valid, otherwise the reason why it is not
     */
  Log.verify = function verify(message) {
    if (typeof message !== 'object' || message === null) { return 'object expected'; }
    if (!$util.isInteger(message.time)) { return 'time: integer expected'; }
    if (message.contents != null && message.hasOwnProperty('contents')) {
      if (!Array.isArray(message.contents)) { return 'contents: array expected'; }
      for (var i = 0; i < message.contents.length; ++i) {
        var error = $root.Log.Content.verify(message.contents[i]);
        if (error) { return 'contents.' + error; }
      }
    }
    return null;
  };

  /**
     * Creates a Log message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Log
     * @static
     * @param {Object.<string,*>} object Plain object
     * @return {Log} Log
     */
  Log.fromObject = function fromObject(object) {
    if (object instanceof $root.Log) { return object; }
    var message = new $root.Log();
    if (object.time != null) { message.time = object.time >>> 0; }
    if (object.contents) {
      if (!Array.isArray(object.contents)) { throw TypeError('.Log.contents: array expected'); }
      message.contents = [];
      for (var i = 0; i < object.contents.length; ++i) {
        if (typeof object.contents[i] !== 'object') { throw TypeError('.Log.contents: object expected'); }
        message.contents[i] = $root.Log.Content.fromObject(object.contents[i]);
      }
    }
    return message;
  };

  /**
     * Creates a plain object from a Log message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Log
     * @static
     * @param {Log} message Log
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @return {Object.<string,*>} Plain object
     */
  Log.toObject = function toObject(message, options) {
    if (!options) { options = {}; }
    var object = {};
    if (options.arrays || options.defaults) { object.contents = []; }
    if (options.defaults) { object.time = 0; }
    if (message.time != null && message.hasOwnProperty('time')) { object.time = message.time; }
    if (message.contents && message.contents.length) {
      object.contents = [];
      for (var j = 0; j < message.contents.length; ++j) { object.contents[j] = $root.Log.Content.toObject(message.contents[j], options); }
    }
    return object;
  };

  /**
     * Converts this Log to JSON.
     * @function toJSON
     * @memberof Log
     * @instance
     * @return {Object.<string,*>} JSON object
     */
  Log.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  Log.Content = (function() {

    /**
         * Properties of a Content.
         * @memberof Log
         * @interface IContent
         * @property {string} key Content key
         * @property {string} value Content value
         */

    /**
         * Constructs a new Content.
         * @memberof Log
         * @classdesc Represents a Content.
         * @implements IContent
         * @constructor
         * @param {Log.IContent=} [properties] Properties to set
         */
    function Content(properties) {
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]]; }
        }
      }
    }

    /**
         * Content key.
         * @member {string} key
         * @memberof Log.Content
         * @instance
         */
    Content.prototype.key = '';

    /**
         * Content value.
         * @member {string} value
         * @memberof Log.Content
         * @instance
         */
    Content.prototype.value = '';

    /**
         * Creates a new Content instance using the specified properties.
         * @function create
         * @memberof Log.Content
         * @static
         * @param {Log.IContent=} [properties] Properties to set
         * @return {Log.Content} Content instance
         */
    Content.create = function create(properties) {
      return new Content(properties);
    };

    /**
         * Encodes the specified Content message. Does not implicitly {@link Log.Content.verify|verify} messages.
         * @function encode
         * @memberof Log.Content
         * @static
         * @param {Log.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @return {$protobuf.Writer} Writer
         */
    Content.encode = function encode(message, writer) {
      if (!writer) { writer = $Writer.create(); }
      writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
      writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
      return writer;
    };

    /**
         * Encodes the specified Content message, length delimited. Does not implicitly {@link Log.Content.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Log.Content
         * @static
         * @param {Log.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @return {$protobuf.Writer} Writer
         */
    Content.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
         * Decodes a Content message from the specified reader or buffer.
         * @function decode
         * @memberof Log.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @return {Log.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    Content.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader); }
      var end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.Log.Content();
      while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.key = reader.string();
            break;
          case 2:
            message.value = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      if (!message.hasOwnProperty('key')) { throw $util.ProtocolError("missing required 'key'", { instance: message }); }
      if (!message.hasOwnProperty('value')) { throw $util.ProtocolError("missing required 'value'", { instance: message }); }
      return message;
    };

    /**
         * Decodes a Content message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Log.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @return {Log.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
    Content.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader); }
      return this.decode(reader, reader.uint32());
    };

    /**
         * Verifies a Content message.
         * @function verify
         * @memberof Log.Content
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @return {string|null} `null` if valid, otherwise the reason why it is not
         */
    Content.verify = function verify(message) {
      if (typeof message !== 'object' || message === null) { return 'object expected'; }
      if (!$util.isString(message.key)) { return 'key: string expected'; }
      if (!$util.isString(message.value)) { return 'value: string expected'; }
      return null;
    };

    /**
         * Creates a Content message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Log.Content
         * @static
         * @param {Object.<string,*>} object Plain object
         * @return {Log.Content} Content
         */
    Content.fromObject = function fromObject(object) {
      if (object instanceof $root.Log.Content) { return object; }
      var message = new $root.Log.Content();
      if (object.key != null) { message.key = String(object.key); }
      if (object.value != null) { message.value = String(object.value); }
      return message;
    };

    /**
         * Creates a plain object from a Content message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Log.Content
         * @static
         * @param {Log.Content} message Content
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @return {Object.<string,*>} Plain object
         */
    Content.toObject = function toObject(message, options) {
      if (!options) { options = {}; }
      var object = {};
      if (options.defaults) {
        object.key = '';
        object.value = '';
      }
      if (message.key != null && message.hasOwnProperty('key')) { object.key = message.key; }
      if (message.value != null && message.hasOwnProperty('value')) { object.value = message.value; }
      return object;
    };

    /**
         * Converts this Content to JSON.
         * @function toJSON
         * @memberof Log.Content
         * @instance
         * @return {Object.<string,*>} JSON object
         */
    Content.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Content;
  })();

  return Log;
})();

$root.LogGroup = (function() {

  /**
     * Properties of a LogGroup.
     * @exports ILogGroup
     * @interface ILogGroup
     * @property {Array.<ILog>|null} [logs] LogGroup logs
     * @property {string|null} [reserved] LogGroup reserved
     * @property {string|null} [topic] LogGroup topic
     * @property {string|null} [source] LogGroup source
     */

  /**
     * Constructs a new LogGroup.
     * @exports LogGroup
     * @classdesc Represents a LogGroup.
     * @implements ILogGroup
     * @constructor
     * @param {ILogGroup=} [properties] Properties to set
     */
  function LogGroup(properties) {
    this.logs = [];
    if (properties) {
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]]; }
      }
    }
  }

  /**
     * LogGroup logs.
     * @member {Array.<ILog>} logs
     * @memberof LogGroup
     * @instance
     */
  LogGroup.prototype.logs = $util.emptyArray;

  /**
     * LogGroup reserved.
     * @member {string} reserved
     * @memberof LogGroup
     * @instance
     */
  LogGroup.prototype.reserved = '';

  /**
     * LogGroup topic.
     * @member {string} topic
     * @memberof LogGroup
     * @instance
     */
  LogGroup.prototype.topic = '';

  /**
     * LogGroup source.
     * @member {string} source
     * @memberof LogGroup
     * @instance
     */
  LogGroup.prototype.source = '';

  /**
     * Creates a new LogGroup instance using the specified properties.
     * @function create
     * @memberof LogGroup
     * @static
     * @param {ILogGroup=} [properties] Properties to set
     * @return {LogGroup} LogGroup instance
     */
  LogGroup.create = function create(properties) {
    return new LogGroup(properties);
  };

  /**
     * Encodes the specified LogGroup message. Does not implicitly {@link LogGroup.verify|verify} messages.
     * @function encode
     * @memberof LogGroup
     * @static
     * @param {ILogGroup} message LogGroup message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @return {$protobuf.Writer} Writer
     */
  LogGroup.encode = function encode(message, writer) {
    if (!writer) { writer = $Writer.create(); }
    if (message.logs != null && message.logs.length) {
      for (var i = 0; i < message.logs.length; ++i) { $root.Log.encode(message.logs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim(); }
    }
    if (message.reserved != null && message.hasOwnProperty('reserved')) { writer.uint32(/* id 2, wireType 2 =*/18).string(message.reserved); }
    if (message.topic != null && message.hasOwnProperty('topic')) { writer.uint32(/* id 3, wireType 2 =*/26).string(message.topic); }
    if (message.source != null && message.hasOwnProperty('source')) { writer.uint32(/* id 4, wireType 2 =*/34).string(message.source); }
    return writer;
  };

  /**
     * Encodes the specified LogGroup message, length delimited. Does not implicitly {@link LogGroup.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LogGroup
     * @static
     * @param {ILogGroup} message LogGroup message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @return {$protobuf.Writer} Writer
     */
  LogGroup.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
     * Decodes a LogGroup message from the specified reader or buffer.
     * @function decode
     * @memberof LogGroup
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @return {LogGroup} LogGroup
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  LogGroup.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader); }
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.LogGroup();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.logs && message.logs.length)) { message.logs = []; }
          message.logs.push($root.Log.decode(reader, reader.uint32()));
          break;
        case 2:
          message.reserved = reader.string();
          break;
        case 3:
          message.topic = reader.string();
          break;
        case 4:
          message.source = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
     * Decodes a LogGroup message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LogGroup
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @return {LogGroup} LogGroup
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  LogGroup.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader); }
    return this.decode(reader, reader.uint32());
  };

  /**
     * Verifies a LogGroup message.
     * @function verify
     * @memberof LogGroup
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @return {string|null} `null` if valid, otherwise the reason why it is not
     */
  LogGroup.verify = function verify(message) {
    if (typeof message !== 'object' || message === null) { return 'object expected'; }
    if (message.logs != null && message.hasOwnProperty('logs')) {
      if (!Array.isArray(message.logs)) { return 'logs: array expected'; }
      for (var i = 0; i < message.logs.length; ++i) {
        var error = $root.Log.verify(message.logs[i]);
        if (error) { return 'logs.' + error; }
      }
    }
    if (message.reserved != null && message.hasOwnProperty('reserved')) {
      if (!$util.isString(message.reserved)) { return 'reserved: string expected'; }
    }
    if (message.topic != null && message.hasOwnProperty('topic')) {
      if (!$util.isString(message.topic)) { return 'topic: string expected'; }
    }
    if (message.source != null && message.hasOwnProperty('source')) {
      if (!$util.isString(message.source)) { return 'source: string expected'; }
    }
    return null;
  };

  /**
     * Creates a LogGroup message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LogGroup
     * @static
     * @param {Object.<string,*>} object Plain object
     * @return {LogGroup} LogGroup
     */
  LogGroup.fromObject = function fromObject(object) {
    if (object instanceof $root.LogGroup) { return object; }
    var message = new $root.LogGroup();
    if (object.logs) {
      if (!Array.isArray(object.logs)) { throw TypeError('.LogGroup.logs: array expected'); }
      message.logs = [];
      for (var i = 0; i < object.logs.length; ++i) {
        if (typeof object.logs[i] !== 'object') { throw TypeError('.LogGroup.logs: object expected'); }
        message.logs[i] = $root.Log.fromObject(object.logs[i]);
      }
    }
    if (object.reserved != null) { message.reserved = String(object.reserved); }
    if (object.topic != null) { message.topic = String(object.topic); }
    if (object.source != null) { message.source = String(object.source); }
    return message;
  };

  /**
     * Creates a plain object from a LogGroup message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LogGroup
     * @static
     * @param {LogGroup} message LogGroup
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @return {Object.<string,*>} Plain object
     */
  LogGroup.toObject = function toObject(message, options) {
    if (!options) { options = {}; }
    var object = {};
    if (options.arrays || options.defaults) { object.logs = []; }
    if (options.defaults) {
      object.reserved = '';
      object.topic = '';
      object.source = '';
    }
    if (message.logs && message.logs.length) {
      object.logs = [];
      for (var j = 0; j < message.logs.length; ++j) { object.logs[j] = $root.Log.toObject(message.logs[j], options); }
    }
    if (message.reserved != null && message.hasOwnProperty('reserved')) { object.reserved = message.reserved; }
    if (message.topic != null && message.hasOwnProperty('topic')) { object.topic = message.topic; }
    if (message.source != null && message.hasOwnProperty('source')) { object.source = message.source; }
    return object;
  };

  /**
     * Converts this LogGroup to JSON.
     * @function toJSON
     * @memberof LogGroup
     * @instance
     * @return {Object.<string,*>} JSON object
     */
  LogGroup.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return LogGroup;
})();

$root.LogGroupList = (function() {

  /**
     * Properties of a LogGroupList.
     * @exports ILogGroupList
     * @interface ILogGroupList
     * @property {Array.<ILogGroup>|null} [logGroupList] LogGroupList logGroupList
     */

  /**
     * Constructs a new LogGroupList.
     * @exports LogGroupList
     * @classdesc Represents a LogGroupList.
     * @implements ILogGroupList
     * @constructor
     * @param {ILogGroupList=} [properties] Properties to set
     */
  function LogGroupList(properties) {
    this.logGroupList = [];
    if (properties) {
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]]; }
      }
    }
  }

  /**
     * LogGroupList logGroupList.
     * @member {Array.<ILogGroup>} logGroupList
     * @memberof LogGroupList
     * @instance
     */
  LogGroupList.prototype.logGroupList = $util.emptyArray;

  /**
     * Creates a new LogGroupList instance using the specified properties.
     * @function create
     * @memberof LogGroupList
     * @static
     * @param {ILogGroupList=} [properties] Properties to set
     * @return {LogGroupList} LogGroupList instance
     */
  LogGroupList.create = function create(properties) {
    return new LogGroupList(properties);
  };

  /**
     * Encodes the specified LogGroupList message. Does not implicitly {@link LogGroupList.verify|verify} messages.
     * @function encode
     * @memberof LogGroupList
     * @static
     * @param {ILogGroupList} message LogGroupList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @return {$protobuf.Writer} Writer
     */
  LogGroupList.encode = function encode(message, writer) {
    if (!writer) { writer = $Writer.create(); }
    if (message.logGroupList != null && message.logGroupList.length) {
      for (var i = 0; i < message.logGroupList.length; ++i) { $root.LogGroup.encode(message.logGroupList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim(); }
    }
    return writer;
  };

  /**
     * Encodes the specified LogGroupList message, length delimited. Does not implicitly {@link LogGroupList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LogGroupList
     * @static
     * @param {ILogGroupList} message LogGroupList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @return {$protobuf.Writer} Writer
     */
  LogGroupList.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
     * Decodes a LogGroupList message from the specified reader or buffer.
     * @function decode
     * @memberof LogGroupList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @return {LogGroupList} LogGroupList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  LogGroupList.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader); }
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.LogGroupList();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.logGroupList && message.logGroupList.length)) { message.logGroupList = []; }
          message.logGroupList.push($root.LogGroup.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
     * Decodes a LogGroupList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LogGroupList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @return {LogGroupList} LogGroupList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
  LogGroupList.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader); }
    return this.decode(reader, reader.uint32());
  };

  /**
     * Verifies a LogGroupList message.
     * @function verify
     * @memberof LogGroupList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @return {string|null} `null` if valid, otherwise the reason why it is not
     */
  LogGroupList.verify = function verify(message) {
    if (typeof message !== 'object' || message === null) { return 'object expected'; }
    if (message.logGroupList != null && message.hasOwnProperty('logGroupList')) {
      if (!Array.isArray(message.logGroupList)) { return 'logGroupList: array expected'; }
      for (var i = 0; i < message.logGroupList.length; ++i) {
        var error = $root.LogGroup.verify(message.logGroupList[i]);
        if (error) { return 'logGroupList.' + error; }
      }
    }
    return null;
  };

  /**
     * Creates a LogGroupList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LogGroupList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @return {LogGroupList} LogGroupList
     */
  LogGroupList.fromObject = function fromObject(object) {
    if (object instanceof $root.LogGroupList) { return object; }
    var message = new $root.LogGroupList();
    if (object.logGroupList) {
      if (!Array.isArray(object.logGroupList)) { throw TypeError('.LogGroupList.logGroupList: array expected'); }
      message.logGroupList = [];
      for (var i = 0; i < object.logGroupList.length; ++i) {
        if (typeof object.logGroupList[i] !== 'object') { throw TypeError('.LogGroupList.logGroupList: object expected'); }
        message.logGroupList[i] = $root.LogGroup.fromObject(object.logGroupList[i]);
      }
    }
    return message;
  };

  /**
     * Creates a plain object from a LogGroupList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LogGroupList
     * @static
     * @param {LogGroupList} message LogGroupList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @return {Object.<string,*>} Plain object
     */
  LogGroupList.toObject = function toObject(message, options) {
    if (!options) { options = {}; }
    var object = {};
    if (options.arrays || options.defaults) { object.logGroupList = []; }
    if (message.logGroupList && message.logGroupList.length) {
      object.logGroupList = [];
      for (var j = 0; j < message.logGroupList.length; ++j) { object.logGroupList[j] = $root.LogGroup.toObject(message.logGroupList[j], options); }
    }
    return object;
  };

  /**
     * Converts this LogGroupList to JSON.
     * @function toJSON
     * @memberof LogGroupList
     * @instance
     * @return {Object.<string,*>} JSON object
     */
  LogGroupList.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return LogGroupList;
})();

module.exports = $root;
