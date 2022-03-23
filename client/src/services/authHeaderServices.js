// function to make request to backend using bearer token that is stored in localstorage

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user_data"));
  if (user && user.access_token) {
    return { Authorization: "Bearer " + user.access_token };
  } else {
    return { error: "token is not available!" };
  }
};

export const setToken = (tokenObj) => {
  localStorage.setItem("access_token", tokenObj.access_token);
  localStorage.setItem("refresh_token", tokenObj.refresh_token);
};

export const getRefreshToken = (tokenObj) => {
  const user = JSON.parse(localStorage.getItem("user_data"));
  return user.refresh_token;
};

export const clearToken = (tokenObj) => {
  localStorage.removeItem("user_data");
};
