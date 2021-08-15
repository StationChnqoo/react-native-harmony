import PropTyps from 'prop-types';

var Store = (function () {
  var StoreClass = function () {};
  StoreClass.prototype = {
    constructor: StoreClass,
    // 初始化 state
    initState: function () {
      this.state = {};
    },
    // 获取当前实例的 state
    getState: function () {
      return this.state;
    },
    // Get or set
    set: function (key: string, value: any) {
      this.state[key] = value;
    },
    get: function (key: string, defaultValue: any) {
      // 如果 state 里面没有缓存，则缓存 state[key] = defaultValue
      if (!this.state.hasOwnProperty(key)) {
        this.set(key, defaultValue);
      }
      return this.state[key];
    },
  };

  // StoreClass 实例
  var instance = null;
  return {
    getInstance: function () {
      if (instance == null) {
        instance = new StoreClass();
        // 对象被创建的时候，初始化 state = {}
        instance.initState();
      }
      return instance;
    },
  };
})();

export default Store;
