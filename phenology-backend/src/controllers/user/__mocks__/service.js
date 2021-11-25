const userService = jest.mock('./service');

let mockData;

userService.findOne = jest.fn( id => Promise.resolve(
    mockData.find( p => p.id === id) ) 
);

userService.__setMockData = data => mockData = data;

module.exports = userService;
