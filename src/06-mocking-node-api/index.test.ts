// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const a = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(a, 100);
    expect(spy).toHaveBeenCalledWith(a, 100);
  });

  test('should call callback only after timeout', () => {
    const a = jest.fn();
    doStuffByTimeout(a, 100);
    expect(a).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(a).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const a = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(a, 100);
    expect(spy).toHaveBeenCalledWith(a, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const a = jest.fn();
    doStuffByInterval(a, 100);
    jest.advanceTimersByTime(400);
    expect(a).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const fPath = 'q.txt';
    await readFileAsynchronously(fPath);
    expect(path.join).toHaveBeenCalledWith(__dirname, fPath);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const rez = await readFileAsynchronously('ss.txt');
    expect(rez).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const a = 'hi';
    (fsp.readFile as jest.Mock).mockReturnValue(Buffer.from(a));
    (path.join as jest.Mock).mockReturnValue('hi.txt');
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    const rez = await readFileAsynchronously('hi.txt');
    expect(rez).toBe(a);
  });
});
