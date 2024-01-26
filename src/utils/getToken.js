import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("authtoken");

  // Check if a token exists
  if (token) {
    return token;
  } else {
    return false;
  }
};
export const deleteToken = () => {
  Cookies.remove("authtoken");
};

export default getToken;
