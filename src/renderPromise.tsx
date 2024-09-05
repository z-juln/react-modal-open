import React, { useEffect } from "react";
import { render } from "rc-util/lib/React/render";

type PromiseFn<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

const renderPromise: PromiseFn<typeof render> = (node, container) =>
  new Promise<void>((resolve) => {
    const Root: React.FC<{
      onMount: () => void;
      children: React.ReactNode;
    }> = ({ onMount, children }) => {
      useEffect(() => {
        onMount();
      }, []);
      return <>{children}</>;
    };
    render(<Root onMount={resolve}>{node}</Root>, container);
  });

export default renderPromise;
