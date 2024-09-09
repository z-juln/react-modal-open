# react-modal-open

[![NPM version](https://img.shields.io/npm/v/react-modal-open.svg?style=flat)](https://npmjs.org/package/react-modal-open) [![NPM downloads](http://img.shields.io/npm/dm/react-modal-open.svg?style=flat)](https://npmjs.org/package/react-modal-open)

react-modal-open

## Usage1 createModalComponent

```tsx
// MyModal.tsx
const MyModal: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div>
    <button onClick={onClose}>close</button>
    MyModal
  </div>
);

export const MyModalComponent = createModalComponent(MyModal);

// App.tsx
import { MyModalComponent } from './MyModal';

(async () => {
  const closeMyModal = await MyModalComponent.open();
  setTimeout(() => {
    closeMyModal();
  }, 3000);
})();
```

## Usage2 CommonModal

```tsx
import { CommonModal } from 'react-modal-open';

const MyModal: React.FC<{ onClose?: () => void; }> = ({
  onClose,
}) => (
  <CommonModal
    open
    wrapperProps={{
      id: 'xxx',
      className: 'xxx',
      data-xxx: 'xxx',
      style: {
        width: 500,
        // ...
      },
    }}
    maskProps={{
      id: 'xxx',
      className: 'xxx',
      data-xxx: 'xxx',
      style: {
        width: 500,
        // ...
      },
    }}
    zIndex={999}
    maskClosable
    destroyOnClose
    onClose={onClose}
  >
    <button onClick={onClose}>close</button>
    MyModal
  </CommonModal>
);
```
