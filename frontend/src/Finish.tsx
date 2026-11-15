import { useEffect, useRef, useState } from "react";

let triggerFinish: ((header: string, content: string) => void) | null = null;

export function finish(header: string, content: string) {
  triggerFinish?.(header, content);
}

export function Finish() {
  const [dialog, setDialog] = useState<{ header: string; content: string } | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    triggerFinish = (header, content) => setDialog({ header, content });
    return () => {
      triggerFinish = null;
    };
  }, []);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (dialog && !el.open) el.showModal();
    if (!dialog && el.open) el.close();
  }, [dialog]);

  return (
    <dialog ref={dialogRef} onClose={() => setDialog(null)}>
      {dialog && (
        <div>
          <h3>{dialog.header}</h3>
          <p>{dialog.content}</p>
          <button type="button" onClick={() => setDialog(null)}>
            OK
          </button>
        </div>
      )}
    </dialog>
  );
}
