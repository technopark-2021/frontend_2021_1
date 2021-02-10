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
  if (typeof obj !== 'object') {
    throw "Input value is not an object!"
  }

  return Object.entries(obj).reduce(cutObjDepth, obj)
};

const cutObjDepth = (prev, [key, value]) => {
  if (typeof value === 'object' && value !== null) {
    value = Object.entries(value).reduce(
      (in_prev, [in_key, in_value]) => {
        in_prev[`${key}.${in_key}`] = in_value
        return in_prev
      }, 
      {}
    )

    delete prev[key]

    prev = Object.keys(prev).length === 0 ? {...value} : {...prev, ...value}

    prev = Object.entries(prev).reduce(cutObjDepth, prev)
  } else {
    prev[key] = value
  }
  
  return prev
}
