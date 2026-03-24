import { useEffect } from "react";

export default function Toast({ type = "success", message, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <div className="toast-title">{type === "success" ? "Success" : "Error"}</div>
      <div className="toast-msg">{message}</div>
      <button className="toast-x" onClick={onClose} aria-label="Close">×</button>
    </div>
  );
}