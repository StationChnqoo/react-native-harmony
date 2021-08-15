import PropTyps from 'prop-types';
import Store from './Store';
var store = Store.getInstance();

/** GET 如果没有对应的 value，返回默认的 defaultValue */
const get = (key: string, defaultValue: any) => {
  return store.get(key, defaultValue);
};

/** SET 方法 */
const set = (key: string, value) => {
  store.set(key, value);
};

/** 整个数据的在闭包里缓存是一个 Object {}，该方法返回此 Objetc，一般用于调试 */
const getState = () => {
  return store.getState();
};

export default {get, set, getState};
