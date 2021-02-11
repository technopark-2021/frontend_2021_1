"use strict";

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
    throw new Error("Input value is not an object!");
  }

  return Object.entries(obj).reduce(
    (acc, item) => ({ ...acc, ...cutObjDepth(item) }),
    {}
  );
};

const cutObjDepth = (item) => {
  const [key, value] = item;

  if (!isObject(value)) {
    return { [key]: value };
  }

  return Object.entries(plainify(value)).reduce(
    (acc, [in_key, in_value]) => ({ ...acc, [`${key}.${in_key}`]: in_value }),
    {}
  );
};

const isObject = (value) => {
  return value != null && value.constructor === Object;
};
