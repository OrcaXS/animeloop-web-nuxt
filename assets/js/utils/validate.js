const validate = {
  arr(arr) {
    return ((Array.isArray(arr) !== 'undefined') && arr.length);
  },

  obj(obj) {
    return (obj.constructor === Object && Object.keys(obj).length !== 0);
  },
};

export default validate;
