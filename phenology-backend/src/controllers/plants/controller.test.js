const createError = require("http-errors");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

const controller = require("./controller");
const service = require("./service");

jest.mock("./service");

describe("plant controller", () => {
  const mockData = [
    {
      id: 1,
      name: "Fehér akác",
      latin: "Robinia pseudoacacia",
      phase: [
        "rügyfakadás",
        "virágzás kezdete",
        "virágzás",
        "virágzás vége",
        "lombszíneződés kezdete",
        "lombhullás kezdete",
      ],
      image: "../../assets/image/Feher_akac.jpg",
      category: "Fák",
    },
    {
      id: 2,
      name: "Kislevelű hárs",
      latin: "Tilia cordata",
      phase: [
        "rügyfakadás",
        "virágzás kezdete",
        "virágzás",
        "virágzás vége",
        "lombszíneződés kezdete",
        "lombhullás kezdete",
      ],
      image: "../../assets/image/Feher_akac.jpg",
      category: "Fák",
    },
    {
      id: 3,
      name: "Közönséges nyír",
      latin: "Betula pendula",
      phase: [
        "rügyfakadás",
        "virágzás kezdete",
        "virágzás",
        "virágzás vége",
        "lombszíneződés kezdete",
        "lombhullás kezdete",
      ],
      image: "../../assets/image/Feher_akac.jpg",
      category: "Fák",
    },
  ];
  
  let response;
  const nextFunction = jest.fn();
  
  beforeEach(() => {
    service.__setMockData(mockData);
    response = mockResponse();
  });

  test("find one with valid id", () => {
    const PLANT_ID = 1;
  
    const request = mockRequest({
        params: {
            id: PLANT_ID
        }
    });
    return controller.findOne(request, response, nextFunction)
          .then( () => {
              expect(service.findOne).toBeCalledWith(PLANT_ID);
              expect(response.json).toBeCalledWith(
                  mockData.find(p => p.id === PLANT_ID)
              );             
          })
  });
});

