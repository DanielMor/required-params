module.exports = function(params, props) {
  let errors = [];
  if(Array.isArray(props)) {
    props.forEach(checkProp.bind(null, params));

  } else if(typeof props === 'object') {
    checkProp(params, props);
  } else if(typeof props === 'string') {
    checkProp(params, { name: props, required: true });
  }

  if(errors.length) {
    throw new Error(buildErrorMessage(errors));
  }

  function checkProp(params, prop) {
    let propName = prop.name && prop.name.trim() || '';
    if(propName.length) {
      if(!params[propName] && prop.required) {
        errors.push(prop);
      } else if(!params[propName] && prop.default) {
        params[propName] = prop.default;
      }
    } else {
      throw new Error('Invalid prop ' + JSON.stringify(prop));
    }
  }
};

function buildErrorMessage(errors) {
  let message = '';
  errors.forEach((prop) => {
    message += '{' + prop.name + '} ';
  });
  message += 'must be set';
  return message;
}
