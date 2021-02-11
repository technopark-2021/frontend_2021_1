'use strict';

/**
 * This function is flattening input object.
 * Returns flat object with depth equals one.
 *
 * @param {object} obj - Input object to be flattened
 * @return {object} Flattened object
 *
 * @example
 * // returns {'deep.a': 111, 'deep.b': 111}
 * 
 *        plainify({
 *          deep: {
 *            a: 111,
 *            b: 111,
 *          }
 *        })
 */

const plainify = (obj) => {
  if (!isObject(obj)) {
    throw "Input value is not an object!"
  }

  return Object.entries(obj).reduce((acc, item) => ({...acc, ...cutObjDepth(item)}), {})
};

const cutObjDepth = (item) => {
  const key = item[0]
  let value = item[1]

  if (isObject(value)) {
    value = plainify(value)

    Object.entries(value).forEach(
      (element) => {
        const [in_key, in_value] = element
        value[`${key}.${in_key}`] = in_value
        delete value[in_key]
      }
    )

    return value
  }

  return {[key]: value}
}

const isObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}
