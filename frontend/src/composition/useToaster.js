import { toastStore } from "../store/ToastStore";

export function useToaster() {
  return {
    showError: (message) => toastStore.display(message, "error"),
    showSuccess: (message) => toastStore.display(message, "success"),
    showWarn: (message) => toastStore.display(message, "warn"),
  };
}
