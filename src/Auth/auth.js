const BASE_URI = "https://word-play-1.herokuapp.com";
const LOGIN_USER = `${BASE_URI}/login-user`;
const UPDATE_USER = `${BASE_URI}/update-user`;
const REGISTER_USER = `${BASE_URI}/register-new-user`;
const VALIDATE_TOKEN = `${BASE_URI}/refresh-token`;
const VALIDATE_EMAIL = `${BASE_URI}/validate-email`;
const SEND_VALIDATION_EMAIL = `${BASE_URI}/send-validation-email`;

export const loadSavedToken = () => {
  const data = localStorage.getItem("token");
  console.assert(data != null, "No user token found in LocalStorage...");
  if (!data) return null;
  console.log(
    `%cFound saved user token!`,
    "color:green;background-color:lightblue"
  );
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    console.log("Corrupt token!");
    return null;
  }
};

export const saveTokenToLocalStorage = token => {
  console.log(
    "%csaving user token to LocalStorage",
    "color:green;background-color:lightblue"
  );
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
  console.log(
    "%csaving user token to LocalStorage",
    "color:green;background-color:lightblue"
  );
  localStorage.setItem("token", null);
};

export const validateToken = token =>
  new Promise(async (resolve, reject) => {
    try {
      const raw = await fetch(VALIDATE_TOKEN, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token })
      });
      const result = await raw.json();
      if (result.error) reject(result.error);
      else resolve(result);
    } catch (err) {
      reject(err);
    }
  });

export const loginUser = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const raw = await fetch(LOGIN_USER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
      });
      const result = await raw.json();
      if (result.error) reject(result.error);
      else resolve(result);
    } catch (err) {
      reject(err);
    }
  });

export const updateUser = (token, id, toUpdate) =>
  new Promise(async (resolve, reject) => {
    try {
      const raw = await fetch(UPDATE_USER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token, id: id, ...toUpdate })
      });
      const result = await raw.json();
      if (result.error) reject(result.error);
      else resolve(result);
    } catch (err) {
      reject(err);
    }
  });

export const registerNewUser = (name, email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const raw = await fetch(REGISTER_USER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password
        })
      });
      const result = await raw.json();
      if (result.error) reject(result.error);
      else resolve(result);
    } catch (err) {
      reject(err);
    }
  });

export const validateEmail = code =>
  new Promise(async (resolve, reject) => {
    try {
      const raw = await fetch(`${VALIDATE_EMAIL}?code=${code}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const result = await raw.json();
      if (result.error) reject(result.error);
      else resolve(result);
    } catch (err) {
      reject(err);
    }
  });

export const sendValidationEmail = email =>
  new Promise(async (resolve, reject) => {
    try {
      const raw = await fetch(SEND_VALIDATION_EMAIL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          uri: "https://wordplay.donotpanic.cc/validate-email"
        })
      });
      const result = await raw.json();
      if (result.error) reject(result.error);
      else resolve(result);
    } catch (err) {
      reject(err);
    }
  });
