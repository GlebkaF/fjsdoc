'use strict';

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Initial test', () => {
    it('Should import filte', () => {
        (0, _chai.expect)((0, _index2.default)()).to.be.equal(4);
    });
});