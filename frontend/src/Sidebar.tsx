import { useState, PropsWithChildren } from "react";

type SidebarProps = {
  defaultWidth?: number;
  maxRatio?: number;
  minRatio?: number;
};

export function Sidebar({
  defaultWidth = 280,
  maxRatio = 0.7,
  minRatio = 0.3,
  children,
}: PropsWithChildren<SidebarProps>) {
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const root = document.getElementById("root");
    return root ? root.getBoundingClientRect().width * 0.5 : 280;
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>): void => {
    event.preventDefault();

    const divider = event.currentTarget;
    divider.setPointerCapture(event.pointerId);
    setIsDragging(true);

    const onPointerMove = (moveEvent: PointerEvent): void => {
      const root = document.getElementById("root");

      if (!root) return;

      const { right, width: rootWidth } = root.getBoundingClientRect();

      const minWidth = Math.min(rootWidth * minRatio);
      const maxWidth = Math.min(rootWidth * maxRatio);

      const nextWidth = right - moveEvent.clientX;
      const clampedWidth = Math.min(Math.max(nextWidth, minWidth), maxWidth);

      setSidebarWidth(clampedWidth);
    };

    const onPointerUp = (upEvent: PointerEvent): void => {
      if (divider.hasPointerCapture(upEvent.pointerId)) {
        divider.releasePointerCapture(upEvent.pointerId);
      }

      setIsDragging(false);
      divider.removeEventListener("pointermove", onPointerMove);
      divider.removeEventListener("pointerup", onPointerUp);
      divider.removeEventListener("pointercancel", onPointerUp);
    };

    divider.addEventListener("pointermove", onPointerMove);
    divider.addEventListener("pointerup", onPointerUp);
    divider.addEventListener("pointercancel", onPointerUp);
  };

  return (
    <>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize right sidebar"
        aria-valuenow={Math.round(sidebarWidth)}
        tabIndex={0}
        id="divider"
        onPointerDown={handlePointerDown}
        onDoubleClick={() => setSidebarWidth(defaultWidth)}
      />

      <aside id="sidebar" style={{ width: `${sidebarWidth}px` }}>
        {children}
      </aside>
    </>
  );
}
