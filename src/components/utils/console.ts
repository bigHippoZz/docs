let _globalThis: any = null;

function getGlobalThis() {
  return (
    _globalThis ||
    (_globalThis =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
        ? self
        : typeof window !== "undefined"
        ? window
        : {})
  );
}

const getConsole = () => getGlobalThis().console;

const $message: Console = getConsole();

export { $message };
