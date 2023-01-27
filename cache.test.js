const CacheInMemory = require("./cache");

const cache = new CacheInMemory();

const KEY_USER = "user";
const PAYLOAD_USER = { email: "hello@test.com", name: "John" };

const KEY_USER_DEVICES = "user_devices";
const PAYLOAD_USER_DEVICES = ["mobile", "desktop"];

const expirationMs = 1000;

describe("CacheInMemory", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2023, 1, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should set and get the key", () => {
    expect(cache.set(KEY_USER, PAYLOAD_USER)).toEqual("OK");

    expect(cache.get(KEY_USER)).toEqual({
      value: PAYLOAD_USER,
      createdAt: 1675220400000,
      expiration: null,
    });
  });

  test("should set the key with expiration 1s and retrieve the key after 1s and be null", () => {
    expect(cache.set(KEY_USER, PAYLOAD_USER, expirationMs)).toEqual("OK");

    jest.advanceTimersByTime(expirationMs);

    expect(cache.get(KEY_USER)).toBeNull();
  });

  test("should list all the keys", () => {
    expect(cache.set(KEY_USER, PAYLOAD_USER)).toEqual("OK");
    expect(cache.set(KEY_USER_DEVICES, PAYLOAD_USER_DEVICES)).toEqual("OK");
    expect(cache.keys()).toEqual([KEY_USER, KEY_USER_DEVICES]);
  });

  test("should clear the keys", () => {
    expect(cache.set(KEY_USER, PAYLOAD_USER)).toEqual("OK");
    expect(cache.set(KEY_USER_DEVICES, PAYLOAD_USER_DEVICES)).toEqual("OK");
    expect(cache.keys().length).toEqual(2);

    cache.clear();

    expect(cache.keys().length).toEqual(0);
  });
});
