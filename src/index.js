/**
 * A module to create structures using jsunpack
 *
 * By Fotis Loukos <me@fotisl.com>
 * @module jsunpack-struct
 */
import { jspack } from 'jspack';

/**
 * Get the format string that corresponds to a schema.
 * @param {Array.<Object>} schema - The schema.
 * @return {string} The format string.
 */
function getFmtString(schema) {
  let fmtStr = '<';

  schema.forEach(desc => {
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
export function objParse(buffer, schema, offset = 0) {
  const fmtStr = getFmtString(schema);

  const len = jspack.CalcLength(fmtStr);

  const ab = new ArrayBuffer(len);
  const targetView = new Uint8Array(ab);
  const sourceView = new Uint8Array(buffer);

  for(let i = 0; i < len; i++)
    targetView[i] = sourceView[offset + i];

  const arrObj = jspack.Unpack(fmtStr, targetView);

  const obj = {};
  for(let i = 0; i < schema.length; i++)
    obj[schema[i].name] = arrObj[i];

  return obj;
}

/**
 * Get the size of an object based on a schema.
 * @param {Array.<Object>} schema - The schema.
 * @return {number} The size of the object.
 */
export function objSize(schema) {
  const fmtStr = getFmtString(schema);

  return jspack.CalcLength(fmtStr);
}

/**
 * Get the offset of a field in a schema.
 * @param {Array.<Object>} schema - The schema.
 * @param {string} name - The name of the field.
 * @return {number} The offset of the field or -1 in case of an invalid field.
 */
export function objOffsetOf(schema, name) {
  let fmtStr = '<';

  let i;
  for(i = 0; i < schema.length; i++) {
    if(schema[i].name === name)
      break;
    fmtStr += schema[i].type;
  }

  if(i === schema.length)
    return -1;

  return jspack.CalcLength(fmtStr);
}

/**
 * Get the size of a field in a schema.
 * @param {Array.<Object>} schema - The schema.
 * @param {string} name - The name of the field.
 * @return {number} The offset of the field.
 */
export function objSizeOf(schema, name) {
  for(let i = 0; i < schema.length; i++) {
    if(schema[i].name === name)
      return jspack.CalcLength(schema[i].type);
  }

  return -1;
}
