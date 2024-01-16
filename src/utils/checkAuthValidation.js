export const validateForm = (
  email,
  password,
  isLogin = true,
  username = null
) => {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.]{4,12}$/;
  if (!isLogin) {
    const isUsernameValid = usernameRegex.test(username);
    if (!isUsernameValid) return "Please enter valid username";
  }

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!isEmailValid) return "Please enter valid email";
  if (!isPasswordValid) return "Please enter strong password";

  return null;
};
