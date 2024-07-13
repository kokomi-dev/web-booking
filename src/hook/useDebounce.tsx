const useDebounce = (callback: () => void, timeDelay: number) => {
  let timer: any;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeDelay);
  };
};
export default useDebounce;
