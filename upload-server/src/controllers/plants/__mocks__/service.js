const { data } = require("../../../config/logger");

const service = jest.mock('./service');

let mockData;

service.findOne = jest.fn( id => Promise.resolve(
    mockData.find( item => item.id === id) ) 
);

service.__setMockData = data => mockData = data;

module.exports = service;
