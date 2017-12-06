'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objParse = objParse;
exports.objSize = objSize;
exports.objOffsetOf = objOffsetOf;
exports.objSizeOf = objSizeOf;

var _jspack = require('jspack');

/**
 * Get the format string that corresponds to a schema.
 * @param {Array.<Object>} schema - The schema.
 * @return {string} The format string.
 */
function getFmtString(schema) {
  var fmtStr = '<';

  schema.forEach(function (desc) {
    fmtStr += desc.type;
  });

  return fmtStr;
}

/**
 * Parse a buffer containing binary data based on a schema starting from an
 * offset and return everything as an object.
 * @param {ArrayBuffer} buffer - The buffer containing the binary data.
 * @param {Array.<Object>} schema - The schema.
 * @param {number} offset - The offset in the buffer to start parsing.
 * @return {object} The parsed data as an object.
 */
/**
 * A module to create structures using jsunpack
 *
 * By Fotis Loukos <me@fotisl.com>
 * @module jsunpack-struct
 */
function objParse(buffer, schema) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var fmtStr = getFmtString(schema);

  var len = _jspack.jspack.CalcLength(fmtStr);

  var ab = new ArrayBuffer(len);
  var targetView = new Uint8Array(ab);
  var sourceView = new Uint8Array(buffer);

  for (var i = 0; i < len; i++) {
    targetView[i] = sourceView[offset + i];
  }var arrObj = _jspack.jspack.Unpack(fmtStr, targetView);

  var obj = {};
  for (var _i = 0; _i < schema.length; _i++) {
    obj[schema[_i].name] = arrObj[_i];
  }return obj;
}

/**
 * Get the size of an object based on a schema.
 * @param {Array.<Object>} schema - The schema.
 * @return {number} The size of the object.
 */
function objSize(schema) {
  var fmtStr = getFmtString(schema);

  return _jspack.jspack.CalcLength(fmtStr);
}

/**
 * Get the offset of a field in a schema.
 * @param {Array.<Object>} schema - The schema.
 * @param {string} name - The name of the field.
 * @return {number} The offset of the field or -1 in case of an invalid field.
 */
function objOffsetOf(schema, name) {
  var fmtStr = '<';

  var i = void 0;
  for (i = 0; i < schema.length; i++) {
    if (schema[i].name === name) break;
    fmtStr += schema[i].type;
  }

  if (i === schema.length) return -1;

  return _jspack.jspack.CalcLength(fmtStr);
}

/**
 * Get the size of a field in a schema.
 * @param {Array.<Object>} schema - The schema.
 * @param {string} name - The name of the field.
 * @return {number} The offset of the field.
 */
function objSizeOf(schema, name) {
  for (var i = 0; i < schema.length; i++) {
    if (schema[i].name === name) return _jspack.jspack.CalcLength(schema[i].type);
  }

  return -1;
}
//# sourceMappingURL=index.js.map