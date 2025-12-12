import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function createUser(email: string, password: string) {
  const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

  return {
    id: "temp-id",
    email,
    passwordHash
  };
}

