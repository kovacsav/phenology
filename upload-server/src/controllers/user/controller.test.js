const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const userController = require('./controller');
const userService = require('./service');

jest.mock('./service');

describe("user controler", () => {
    const mockData = [{
        "id": 1,
        "firstName": "Vitéz",
        "lastName": "Viola",
        "email": "vitez@gmail.com",
        "active": true,
        "password": "vitez",
        "role": 3
      },
      {
        "id": 2,
        "firstName": "Kérő",
        "lastName": "Károly",
        "email": "kero@gmail.com",
        "active": true,
        "password": "kero",
        "role": 2
      },
      {
        "id": 3,
        "firstName": "Sass",
        "lastName": "Csaba",
        "email": "sass@gmail.com",
        "active": true,
        "password": "sass",
        "role": 1
      },
      {
        "id": 4,
        "firstName": "Siket",
        "lastName": "Sándor",
        "email": "siket@gmail.com",
        "active": true,
        "password": "siket",
        "role": 2
      }];

    let response;
    const nextFunction = jest.fn();

    beforeEach(() => {
        userService.__setMockData(mockData);
        response = mockResponse();
    });

    test("find one with valid id", () => {
        const USER_ID = 1;

        const request = mockRequest({
            params: {
                id: USER_ID
            }
        });

        return userController.findOne(request, response, nextFunction)
            .then( () => {
                expect(userService.findOne).toBeCalledWith(USER_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(p => p.id === USER_ID)
                );                
            })
    });
});