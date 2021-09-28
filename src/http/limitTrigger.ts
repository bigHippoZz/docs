const limitTrigger = (func: any, timeInterval: number) => {
  let running = false;
  return (...args: any[]) => {
    if (running) {
      return;
    }
    running = true;
    setTimeout(() => {
      func(...args);
      running = false;
    }, timeInterval);
  };
};

export default limitTrigger
