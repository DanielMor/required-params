const expect = require('chai').expect;

const requiredParams = require('../index');

describe('RequiredParams', () =>  {
  it('should update object to set the default value', () => {
    let props = {
      name: 'name',
      default: 'John',
    };
    let params = { };

    requiredParams(params, props);

    expect(params[props.name]).to.be.equal(props.default);
  });


  it('should update object to set the default value', () => {
    let propName = 'name';
    let propValue = 'Daniel';
    let props = {
      name: propName,
      default: 'John',
    };
    let params = {
      name: propValue,
    };

    requiredParams(params, props);

    expect(params[propName]).to.be.equal(propValue);
  });

  it('should update object with an array', () => {
    let propName1 = 'name';
    let propName2 = 'age';
    let propValue1 = 'Daniel';
    let propValue2 = '24';
    let props = [
      {
        name: propName1,
        default: 'John',
      },
      {
        name: propName2,
        default: propValue2,
      }
    ];
    let params = {
      name: propValue1,
    };

    requiredParams(params, props);
    expect(params[propName1]).to.be.equal(propValue1);
    expect(params[propName2]).to.be.equal(propValue2);
  });

  it('should throw error when prop is required', () => {
    let propName = 'name';
    let propValue = 'Daniel';
    let props = {
      name: propName,
      required: true,
    };

    let params = { };
    let fn = () => requiredParams(params, props);

    expect(fn).to.throw(Error, /{name}/);
  });

  it('should throw an error when multiply props is required', () => {
    let propName1 = 'name';
    let propName2 = 'age';
    let props = [
      {
        name: propName1,
        required: true,
      },
      {
        name: propName2,
        required: true,
      }
    ];
    let params = { };

    let fn = () => requiredParams(params, props);

    expect(fn).to.throw(Error, /{name} {age}/);
  });

  it('should throw an error when props string not exit', () => {
    let propName = 'name';

    let params = { };

    let fn = () => requiredParams(params, propName);

    expect(fn).to.throw(Error, /{name}/);
  });

  it('should not throw an error when props string exit', () => {
    let propName = 'name';
    let propValue = 'Daniel';
    let params = { };

    params[propName] = propValue;

    let fn = () => requiredParams(params, propName);

    expect(fn).to.not.throw(Error);
    expect(params[propName]).to.be.equal(propValue);
  });

  it('should throw an error when prop string is invalid', () => {
    let propName = '';

    let params = { };

    let fn = () => requiredParams(params, propName);

    expect(fn).to.throw(Error, /Invalid prop/);
  });

  it('should throw an error when prop string is invalid', () => {
    let propName = 'name';

    let props = {
      invalid: propName,
    }

    let params = { };

    let fn = () => requiredParams(params, props);

    expect(fn).to.throw(Error, /Invalid prop/);
  });
});
