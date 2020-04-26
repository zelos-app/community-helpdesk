import axios from "./axios";

const flattenLocales = (ob) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) {
      continue;
    }

    if (typeof ob[i] === "object") {
      const flatObject = flattenLocales(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }
        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const loadLocales = async (lang) => {
  const res = await axios.get("/api/public/locales");

  return flattenLocales(res.data[0]);
};
