import { useCallback, useState } from 'react';
import { type AppModalName } from '../config/modals';

export type ModalName = AppModalName;

export type ModalState = Partial<Record<ModalName, boolean>>;

export type UseModalManagerResult = {
  openModal: (modalName: ModalName) => void;
  closeModal: (modalName: ModalName) => void;
  isOpen: (modalName: ModalName) => boolean;
};

export function useModalManager(): UseModalManagerResult {
  const [state, setState] = useState<ModalState>({});

  const openModal = useCallback((modalName: ModalName): void => {
    setState((prevState) => ({ ...prevState, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName: ModalName): void => {
    setState((prevState) => ({ ...prevState, [modalName]: false }));
  }, []);

  const isOpen = useCallback(
    (modalName: ModalName): boolean => {
      return Boolean(state[modalName]);
    },
    [state]
  );

  return {
    openModal,
    closeModal,
    isOpen
  };
}
