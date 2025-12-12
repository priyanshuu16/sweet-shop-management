export function validateRegisterInput(email?: string, password?: string) {
  if (!email) {
    return "Email is required";
  }

  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  return null;
}

