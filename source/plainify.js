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

  return Object.entries(obj).reduce(
    cutObjDepth,
    {}
  )
};

const cutObjDepth = (prev, curr) => {
  const key = curr[0]
  let value = curr[1]
  
  if (isObject(value)) {
    value = plainify(value)

    Object.entries(value).forEach(
      (element) => {
        const [in_key, in_value] = element
        value[`${key}.${in_key}`] = in_value
        delete value[in_key]
      }
    )

    prev = Object.keys(prev).length === 0 ? {...value} : {...prev, ...value}
  } else {
    prev[key] = value
  }

  return prev
}

const isObject = (value) => {
  return typeof value === 'object' && value !== null
}
