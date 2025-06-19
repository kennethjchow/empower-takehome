import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
   fetchMock.doMock(); // Reset fetch mock before each test
});

afterEach(() => {
   fetchMock.resetMocks(); // Clear all mocks after each test
});
