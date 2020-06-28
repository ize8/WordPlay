import { nanoid } from "nanoid";

const uuid = () => nanoid(10);

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
  id: uuid(),
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
  id: uuid(),
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
  id: uuid(),
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
