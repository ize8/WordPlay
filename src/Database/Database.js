import { nanoid } from "nanoid";
import { BASE_URI, fetchPostWithBody } from "../Utils";
const CREATE_WORDLIST = `${BASE_URI}/create-wordlist`;
const UPDATE_WORDLIST = `${BASE_URI}/update-wordlist`;
const DELETE_WORDLIST = `${BASE_URI}/delete-wordlist`;
const GET_ALL_WORDLIST = `${BASE_URI}/get-all-wordlists`;

export const wordListDelete = async (list, token) =>
  await fetchPostWithBody(DELETE_WORDLIST, {
    token: token,
    id: list.id
  });

export const wordListAdd = async (list, token) =>
  await fetchPostWithBody(CREATE_WORDLIST, {
    token: token,
    label: list.label,
    list: list.list
  });

export const wordListGetAllForUser = async (userId, token) =>
  await fetchPostWithBody(GET_ALL_WORDLIST, {
    token: token,
    id: userId
  });

export const wordListUpdate = async (list, token) =>
  await fetchPostWithBody(UPDATE_WORDLIST, {
    token: token,
    id: list.id,
    label: list.label,
    list: list.list
  });

export const LoadSavedData = () => {
  const data = localStorage.getItem("VocabLists");
  console.assert(
    data != null,
    "No vocab found in LocalStorage, loading demo data..."
  );
  if (!data) return [listA, listB, listC];
  const parsedData = JSON.parse(data);
  console.log(
    `%cFound ${parsedData?.length} saved vocab lists!`,
    "color:green;background-color:lightblue"
  );
  return JSON.parse(data);
};

export const saveDatabase = data => {
  console.log(
    "%csaving database to LocalStorage",
    "color:green;background-color:lightblue"
  );
  localStorage.setItem("VocabLists", JSON.stringify(data));
};

const listA = {
  id: nanoid(10),
  label: "vocab A",
  created: new Date(),
  updated: new Date(),
  list: [
    {
      simp: "欢迎",
      trad: "歡迎",
      pinyin: "huan1 ying2",
      eng: "to welcome/welcome"
    },
    {
      simp: "你好",
      trad: "你好",
      pinyin: "ni3 hao3",
      eng: "hello/hi"
    },
    {
      simp: "促使",
      trad: "促使",
      pinyin: "cu4 shi3",
      eng:
        "to induce/to promote/to urge/to impel/to bring about/to provoke/to drive (sb to do sth)/to catalyze/to actuate/to contribute to (some development)"
    }
  ]
};

const listB = {
  id: nanoid(10),
  label: "vocab B",
  created: new Date(),
  updated: new Date(),
  list: [
    {
      simp: "欢迎",
      trad: "歡迎",
      pinyin: "huan1 ying2",
      eng: "to welcome/welcome"
    },
    {
      simp: "你好",
      trad: "你好",
      pinyin: "ni3 hao3",
      eng: "hello/hi"
    },
    {
      simp: "促使",
      trad: "促使",
      pinyin: "cu4 shi3",
      eng:
        "to induce/to promote/to urge/to impel/to bring about/to provoke/to drive (sb to do sth)/to catalyze/to actuate/to contribute to (some development)"
    }
  ]
};

const listC = {
  id: nanoid(10),
  label: "vocab C",
  created: new Date(),
  updated: new Date(),
  list: [
    {
      simp: "欢迎",
      trad: "歡迎",
      pinyin: "huan1 ying2",
      eng: "to welcome/welcome"
    },
    {
      simp: "你好",
      trad: "你好",
      pinyin: "ni3 hao3",
      eng: "hello/hi"
    },
    {
      simp: "促使",
      trad: "促使",
      pinyin: "cu4 shi3",
      eng:
        "to induce/to promote/to urge/to impel/to bring about/to provoke/to drive (sb to do sth)/to catalyze/to actuate/to contribute to (some development)"
    }
  ]
};
