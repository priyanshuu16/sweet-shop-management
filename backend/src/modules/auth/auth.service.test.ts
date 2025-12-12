import { AuthService } from "./auth.service";

describe("Auth Service - createUser", () => {
  const service = new AuthService();

  it("should hash the password before returning user object", async () => {
    const email = `service-${Date.now()}@example.com`;
    const password = "plain-password";

    const user = await service.createUser(email, password);

    expect(user).toHaveProperty("passwordHash");
    expect(user.passwordHash).not.toBe(password);
  });
});
