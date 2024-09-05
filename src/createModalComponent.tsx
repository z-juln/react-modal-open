import React from 'react';
import { HasRequiredKeys } from 'type-fest';
import { unmount } from 'rc-util/lib/React/render';
import renderPromise from './renderPromise';

type CloseFn = () => void;

interface ModalComponent<
  M,
  P,
  HasRequiredKeys,
  // @ts-ignore
> extends M {
  open: HasRequiredKeys extends true? ((props: P) => Promise<CloseFn>) : ((props?: P) => Promise<CloseFn>);
}

interface Config {
  singleton?: boolean;
}

interface Ref<T> {
  current: T;
}
const createRef = <T,>(v: T) => ({ current: v });

/**
 * @example
 * const MyModal: React.FC<{ onClose?: () => void; }> = ({
 *   onClose,
 * }) => (
 *   <div>
 *     <button onClick={onClose}>close</button>
 *     MyModal
 *   </div>
 * );
 * 
 * const MyModalComponent = createModalComponent(MyModal);
 * 
 * (async () => {
 *   const closeMyModal = await MyModalComponent.open();
 *   setTimeout(() => {
 *     closeMyModal();
 *   }, 3000);
 * })();
 */
function createModalComponent<
  M extends React.FC<any> | React.ComponentClass<any>,
  P extends object = React.ComponentProps<M>,
  H = HasRequiredKeys<P>,
>(Modal: M, cfg?: Config): ModalComponent<M, P, H>;
function createModalComponent<
  M extends React.FC<any> | React.ComponentClass<any>,
  P extends { onClose?: (...args: unknown[]) => unknown; } = React.ComponentProps<M>,
  H = HasRequiredKeys<P>,
>(Modal: M, cfg?: Config): ModalComponent<M, P, H>;
function createModalComponent<
  M extends React.FC<any> | React.ComponentClass<any>,
  P extends { onClose?: (...args: unknown[]) => unknown; } = React.ComponentProps<M>,
  H = HasRequiredKeys<P>,
>(Modal: M, cfg?: Config): ModalComponent<M, P, H> {
  const singletonElRef = createRef<HTMLDivElement | null>(null);

  const ModalComponent: ModalComponent<M, P, H> = Modal as any;

  ModalComponent.open = async (props?: P) => {
    const elRef = cfg?.singleton ? singletonElRef : createRef<HTMLDivElement | null>(null);

    const { onClose, ...restProps } = props ?? {};
    if (!elRef.current) {
      elRef.current = document.createElement('div');
    }
    document.body.appendChild(elRef.current);

    const rmModal = () => {
      if (elRef.current && elRef.current.parentNode) {
        unmount(elRef.current);
        elRef.current.parentNode.removeChild(elRef.current);
        elRef.current = null;
      }
    };

    await renderPromise(
      // @ts-ignore
      <Modal
        {...restProps}
        onClose={(...args: any[]) => {
          setTimeout(() => {
            rmModal();
          });
          return onClose?.(args);
        }}
      />,
      elRef.current,
    );
    return rmModal;
  };
  
  return ModalComponent;
};

export default createModalComponent;
