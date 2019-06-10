export const ValidatorRegisterInput = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): any => {
  const errors: any = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "email must be a valid address";
    }
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password must match";
  }

  // @ts-ignore
  return { errors, valid: Object.keys(errors) < 1 };
};

export const ValidatorLoginInput = (username: string, password: string) => {
  const errors: any = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  // @ts-ignore
  return { errors, valid: Object.keys(errors) < 1 };
};
