// Import necessary dependencies
assert = chai.assert;

// Define a test suite
describe('test function', () => {

  describe('test', () => {
    it('should return true if the each userNames has a corresponding passWord are equal', () => {

      const result = test(userNames, passWords);
      assert.strictEqual(result, true);
    });

    it('should return true if each username is unique', () => {
      const result = checkUniqueUsernames(userNames, username_length);
      assert.strictEqual(result, true);
    });

    it('should return true if each password has at least 8 characters', () => {
      const result = checkPasswordLength(passWords, passwords_length);
      assert.strictEqual(result, true);
    });
    
  });
});
