export const BASE_URI = "https://word-play-1.herokuapp.com";

export const fetchPostWithBody = (uri, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const raw = await fetch(uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const result = await raw.json();
      resolve(result);
    } catch (error) {
      console.warn("API Error:", error);
      reject(error);
    }
  });
