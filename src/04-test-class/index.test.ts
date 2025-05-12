// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const rez = getBankAccount(1);
    expect(rez.getBalance()).toEqual(1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(1);
    expect(() => acc.withdraw(2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(1);
    const acc2 = getBankAccount(2);
    expect(() => acc.transfer(20, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(1);
    expect(() => acc.transfer(1, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(1);
    expect(acc.getBalance()).toBe(1);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(10);
    acc.withdraw(5);
    expect(acc.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const acc = getBankAccount(10);
    const acc2 = getBankAccount(10);
    acc.transfer(5, acc2);
    expect(acc.getBalance()).toBe(5);
    expect(acc2.getBalance()).toBe(15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(10);
    jest.spyOn(lodash, 'random').mockReturnValue(41);
    const balanse = await acc.fetchBalance();

    expect(typeof balanse).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(10);
    jest.spyOn(lodash, 'random').mockReturnValue(41);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(41);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(10);
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
