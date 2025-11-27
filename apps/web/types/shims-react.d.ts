declare namespace React {
  type FC<P = {}> = (props: P & { children?: any }) => any;
  function createElement(type: any, props?: any, ...children: any[]): any;
}

declare module 'react' {
  export function useState<S = any>(initial?: S | (() => S)) : [S, (s: S) => void];
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T;
  export const useEffect: any;
  const React: typeof globalThis & { FC: typeof React['FC'] };
  export default React;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export const Fragment: any;
}
