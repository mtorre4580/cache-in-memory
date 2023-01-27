class CacheInMemory {
  constructor() {
    this.store = {};
  }

  /**
   * Retrieve a value via key
   * @param {string} key
   * @returns
   */
  get(key) {
    const value = this.store[key] || null;

    if (value) {
      const { createdAt, expiration } = value;

      if (this.isExpiredKey(expiration, createdAt)) {
        this.del(key);
        return null;
      }
    }

    return value;
  }

  /**
   * Store the key with payload
   * @param {string} key
   * @param {object|number|string} value
   * @param {number} expirationMs
   * @returns string
   */
  set(key, value, expiration = null) {
    this.store[key] = { value, expiration, createdAt: new Date().getTime() };
    return "OK";
  }

  /**
   * Delete a key with the payload if exists
   * @param {string} key
   * @returns string
   */
  del(key) {
    delete this.store[key];
    return "OK";
  }

  /**
   * Clear all the keys in the memory
   */
  clear() {
    this.store = {};
  }

  /**
   * Retrieve all the keys stored has not expired
   * @returns array
   */
  keys() {
    return Object.keys(this.store).filter((key) => {
      const { expiration, createdAt } = this.store[key];
      return !this.isExpiredKey(expiration, createdAt);
    });
  }

  /**
   * Helper to check if the current expiration key is expired
   * @param {number} expiration
   * @param {number} createdAt
   * @returns boolean
   */
  isExpiredKey(expiration, createdAt) {
    if (!expiration) return false;
    const currentMs = new Date().getTime() - createdAt;
    return currentMs >= expiration;
  }
}

module.exports = CacheInMemory;
