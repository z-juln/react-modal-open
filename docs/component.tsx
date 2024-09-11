import React from 'react';
import { createModalComponent } from '../src';

const MyModal: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div>
    <button onClick={onClose}>close</button>
    MyModal
  </div>
);

const MyModalComponent = createModalComponent(MyModal);

const Component = () => {
  return <button onClick={() => MyModalComponent.open()}>open MyModal</button>;
};

export default Component;
