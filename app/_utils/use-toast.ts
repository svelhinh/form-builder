"use client";

type ToastHandler = (message: string) => void;

type ToastApi = {
  error: ToastHandler;
  success: ToastHandler;
};

export const useToast = (): ToastApi => {
  const show = (type: "error" | "success") => (message: string) => {
    void import("sonner").then(({ toast }) => toast[type](message));
  };

  return {
    error: show("error"),
    success: show("success"),
  };
};
