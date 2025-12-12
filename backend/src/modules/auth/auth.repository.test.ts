import { AuthRepository } from "./auth.repository";

describe("Auth Repository", () => {
  const repository = new AuthRepository();

  it("should create a user and return a generated id", async () => {
    const uniqueEmail = `repo-${Date.now()}@example.com`;

    const user = await repository.createUser({
      email: uniqueEmail,
      passwordHash: "hashed-password"
    });

    expect(user).toHaveProperty("id");
    expect(user.id).toBeDefined();
    expect(user.email).toBe(uniqueEmail);
  });
});

