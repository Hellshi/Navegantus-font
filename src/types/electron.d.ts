export {};

declare global {
  interface Window {
    electronStore: {
      get: (key: string) => T;
      set: (key: string, value: T) => void;
      delete: (key: string) => void;
      clear: () => void;
    };
  }
}