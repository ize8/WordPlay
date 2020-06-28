const URI = "https://donotpanic.cc/cedict/MatchOnly/";

export const searchDic = async list => {
  try {
    if (!navigator.onLine) {
      alert(`Unable to search dictionary,\nas You appear to be OFFLINE!`);
      throw "User Offline!";
    }
    const raw = await fetch(URI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(list)
    });
    const result = await raw.json();
    return result;
  } catch (error) {
    console.warn("API Error:", error);
    return list.map(e => {
      return { match: { simp: e, trad: "", pinyin: "", eng: "" } };
    });
  }
};
