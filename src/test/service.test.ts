import { token } from "../service/service.js";

describe("product", () => {
  describe("let the", () => {
    it("should retun the product", () => {
      expect(token.createToken).toBe(3);
    });
  });
});
