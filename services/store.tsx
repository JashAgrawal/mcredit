import * as SecureStore from "expo-secure-store";

export async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}