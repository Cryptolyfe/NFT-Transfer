// src/components/Toast.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

type Toast = { type: 'success' | 'error' | 'info'; msg: React.ReactNode };

// context gives you a push({type,msg}) function anywhere in the app
const ToastCtx = createContext<(t: Toast) => void>(() => {});

export function useToast() {
  return useContext(ToastCtx);
}

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /** push toast and auto-dismiss after 4 s */
  const push = (t: Toast) => {
    setToasts((arr) => [...arr, t]);
    setTimeout(() => setToasts((arr) => arr.slice(1)), 4000);
  };

  return (
    <ToastCtx.Provider value={push}>
      {children}

      {/* Toast portal */}
      <div className="fixed bottom-4 right-4 space-y-2 z-[999]">
        {toasts.map((t, idx) => (
          <div
            key={idx}
            role="alert"
            className={`alert shadow-lg max-w-xs ${
              t.type === 'success'
                ? 'alert-success'
                : t.type === 'error'
                ? 'alert-error'
                : 'alert-info'
            }`}
          >
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
