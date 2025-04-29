import React from 'react';

interface ModalButtonProps {
  onOpen: () => void;
}

export const OneTenderExecutorAcceptBtn: React.FC<ModalButtonProps> = ({ onOpen }) => {
  return (
    <button onClick={onOpen}>Откликнуться на тендер</button>
  );
};

