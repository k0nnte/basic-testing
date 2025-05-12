// Uncomment the code below and write your tests
// import axios from 'axios';
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');
const mAx = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const getMock = jest.fn().mockReturnValue({ data: {} });
    mAx.create.mockReturnValue({
      get: getMock,
    } as unknown as jest.Mocked<typeof axios>);
    throttledGetDataFromApi('s');
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(mAx.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockReturnValue({ data: {} });
    mAx.create.mockReturnValue({
      get: getMock,
    } as unknown as jest.Mocked<typeof axios>);
    throttledGetDataFromApi('s');
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(getMock).toHaveBeenCalledWith('s');
  });

  test('should return response data', async () => {
    const mockedData = { id: 2, title: 'test' };
    const getMock = jest.fn().mockReturnValue(mockedData);
    mAx.create.mockReturnValue({
      get: getMock,
    } as unknown as jest.Mocked<typeof axios>);
    throttledGetDataFromApi('s');
    jest.advanceTimersByTime(THROTTLE_TIME);
    const rez = await getMock.mock.results[0]?.value;
    expect(rez).toEqual(mockedData);
  });
});
