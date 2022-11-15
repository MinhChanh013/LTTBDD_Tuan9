import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveObjectOrder = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    const valueOrder = await AsyncStorage.getItem(value.name);
    if (valueOrder !== null) {
      await AsyncStorage.setItem(
        value.name,
        JSON.stringify({
          ...JSON.parse(valueOrder),
          total: JSON.parse(valueOrder).total + 1,
        })
      );
    } else {
      await AsyncStorage.setItem(value.name, jsonValue);
    }
  } catch (e) {}
};

export const decreaseOrder = async (value) => {
  try {
    const valueOrder = await AsyncStorage.getItem(value.name);
    await AsyncStorage.setItem(
      value.name,
      JSON.stringify({
        ...JSON.parse(valueOrder),
        total: JSON.parse(valueOrder).total - 1,
      })
    );
  } catch (error) {}
};

export const getAllOrder = async (value) => {
  let list_order;
  try {
    list_order = await AsyncStorage.multiGet(value);
    // await AsyncStorage.multiRemove(value);
  } catch (e) {
    console.log(e);
  }
  // console.log(list_order);
  return list_order;
};
