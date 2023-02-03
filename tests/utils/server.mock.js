var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');

chai.use(chaiHttp);
module.exports = chai.request(server).keepOpen();
