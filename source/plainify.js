'use strict';

const plainify = obj => {
  let inner_obj_exists = true

  while (inner_obj_exists) {
    let new_obj = Object()
    inner_obj_exists = false

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object') {
        inner_obj_exists = true
        Object.entries(value).forEach(([in_key, in_value]) => {
          let new_key = `${key}.${in_key}`
          new_obj[new_key] = in_value
        })
      } else {
        new_obj[key] = value
      }
    })

    obj = new_obj
  }

  return obj
};
