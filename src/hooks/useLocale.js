import { createStore, useStore } from "../store/stores";
import axios from "../utils/axios";

const initialState = {
  messages: {},
  locale: "",
  loading: true,
  locales: [],
};

const store = createStore(initialState);

const useLocale = () => {
  return useStore(store);
};

export const fetchLocales = async () => {
  store.set({
    ...store.state,
    loading: true,
    error: false,
  });

  try {
    const res = await axios.get("/api/public/locales");
    const locales = res.data;
    const result = {};
    const fetchedLocales = [];

    locales.forEach((locale) => {
      fetchedLocales.push({ key: locale.code, name: locale.name });
      result[locale.code] = flattenLocales(locale);
    });

    store.set({
      messages: result,
      locale: Object.keys(result)[0],
      locales: fetchedLocales,
      loading: false,
      error: false,
    });
  } catch (error) {
    store.set({
      ...store.state,
      localeCodes: [],
      isLoading: false,
      error: true,
    });
  }
};

export const setLocale = (languageKey) => {
  store.set({
    ...store.state,
    locale: languageKey,
  });
  document.documentElement.lang = languageKey;
};

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

export default useLocale;
