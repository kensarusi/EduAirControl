import { useState, useRef } from "react";
import "./Tooltip.css";

const CURSOR_OFFSET = 16;
const CARD_GAP = 14; // separación mínima garantizada respecto al elemento
const TOOLTIP_WIDTH = 240;
const TOOLTIP_MAX_HEIGHT_GUESS = 110;

function Tooltip({ text, children, block = false }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef(null);

  const updatePosition = (clientX, clientY) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = wrapperRef.current?.getBoundingClientRect();

    let left = clientX + CURSOR_OFFSET;
    let top = clientY + CURSOR_OFFSET;

    if (left + TOOLTIP_WIDTH > vw) {
      left = clientX - TOOLTIP_WIDTH - CURSOR_OFFSET;
    }

    if (top + TOOLTIP_MAX_HEIGHT_GUESS > vh) {
      top = clientY - TOOLTIP_MAX_HEIGHT_GUESS - CURSOR_OFFSET;
    }

    // Garantiza una separación mínima respecto al borde real de la tarjeta,
    // sin importar en qué punto del elemento esté el cursor.
    if (rect) {
      const minTopIfBelow = rect.bottom + CARD_GAP;
      const maxTopIfAbove = rect.top - CARD_GAP - TOOLTIP_MAX_HEIGHT_GUESS;

      if (top < rect.bottom && top > rect.top) {
        // El cursor está "dentro" de la franja del elemento: fuerza abajo o arriba
        top = minTopIfBelow + TOOLTIP_MAX_HEIGHT_GUESS > vh ? maxTopIfAbove : minTopIfBelow;
      } else if (top >= rect.bottom && top < minTopIfBelow) {
        top = minTopIfBelow;
      } else if (top <= rect.top && top > maxTopIfAbove) {
        top = maxTopIfAbove;
      }
    }

    left = Math.max(8, left);
    top = Math.max(8, top);

    setCoords({ top, left });
  };

  const handleEnter = (e) => {
    updatePosition(e.clientX, e.clientY);
    setVisible(true);
  };

  const handleMove = (e) => {
    if (visible) updatePosition(e.clientX, e.clientY);
  };

  const handleLeave = () => setVisible(false);

  const handleFocus = () => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    updatePosition(rect.left, rect.bottom);
    setVisible(true);
  };

  if (!text) return children;

  return (
    <div
      ref={wrapperRef}
      className={`tooltip-wrapper ${block ? "block" : ""}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleLeave}
      tabIndex={0}
    >
      {children}

      {visible && (
        <div
          className="tooltip-box"
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;