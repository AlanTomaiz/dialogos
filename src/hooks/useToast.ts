import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react';
import type { ToastItem, ToastType } from '../components/toast';

type ToastContextValue = {
  toasts: ToastItem[];
  show: (message: string, type?: ToastType, duration?: number) => void;
  hide: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastProviderProps = {
  children: React.ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(1);

  const show = useCallback(
    (message: string, type: ToastType = 'info', duration?: number) => {
      const id = nextIdRef.current;
      nextIdRef.current += 1;

      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const hide = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, show, hide } },
    children
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}
