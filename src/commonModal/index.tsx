import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import './index.css';

export interface CommonModalProps {
  open?: boolean;
  wrapperProps?: Partial<
    React.HTMLAttributes<HTMLDivElement> & {
      [k in `data-${string}`]?: string | boolean;
    }
  >;
  maskProps?: Partial<
    React.HTMLAttributes<HTMLDivElement> & {
      [k in `data-${string}`]?: string | boolean;
    }
  >;
  children: React.ReactNode;
  zIndex?: number;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  onClose?: () => void;
}

const CommonModal: React.FC<CommonModalProps> = ({
  open = false,
  wrapperProps,
  maskProps,
  children,
  zIndex = 999,
  maskClosable = false,
  destroyOnClose = false,
  onClose,
}) => {
  useEffect(() => {
    return () => enableBodyScroll(document.body);
  }, []);

  useEffect(() => {
    if (open) {
      disableBodyScroll(document.body, {
        reserveScrollBarGap: true,
      });
      return () => {
        enableBodyScroll(document.body);
      };
    }
  }, [open]);

  if (!open && destroyOnClose) return null;

  return createPortal(
    <div
      {...wrapperProps}
      className={`rmo-CommonModal ${wrapperProps?.className}`}
      style={{
        // @ts-ignore
        '--zindex': zIndex,
        display: open ? undefined : 'none',
        ...wrapperProps?.style,
      }}
    >
      <div
        {...maskProps}
        className={`rmo-CommonModal__mask ${maskProps?.className}`}
        onClick={(e) => {
          if (maskClosable) {
            onClose?.();
          }
          return maskProps?.onClick?.(e);
        }}
      ></div>
      <div className="rmo-CommonModal__inner">{children}</div>
    </div>,
    document.body,
  );
};

export default CommonModal;
