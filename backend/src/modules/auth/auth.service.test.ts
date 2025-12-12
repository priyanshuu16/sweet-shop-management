import { createUser } from "./auth.service";

describe("Auth Service - createUser", () => {
  it("should hash the password before returning user object", () => {
    const email = "test@example.com";
    const password = "StrongPass123!";

    const user = createUser(email, password);

    expect(user).toHaveProperty("passwordHash");
    expect(user.passwordHash).not.toBe(password);
  });
});

