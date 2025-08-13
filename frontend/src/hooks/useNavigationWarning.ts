import { useEffect, useContext } from "react";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";

export const useNavigationWarning = (
  shouldWarn: boolean,
  message: string,
  onLeave?: () => void
) => {
  const { navigator } = useContext(UNSAFE_NavigationContext) as any;
  const navigate = useNavigate();

  useEffect(() => {
    if (!shouldWarn) return;

    // Warn on browser/tab close or refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Warn on in-app navigation
    const originalNavigate = navigator.navigate;
    navigator.navigate = (...args: any[]) => {
      if (window.confirm(message)) {
        if (onLeave) onLeave();
        originalNavigate.apply(navigator, args);
      }
    };

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      navigator.navigate = originalNavigate;
    };
  }, [shouldWarn, message, onLeave, navigator, navigate]);
};
