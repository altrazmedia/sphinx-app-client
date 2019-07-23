import React from "react";
import PropTypes from "prop-types";

import { Button, Portal } from "components/common";

const Modal = props => {
  const { children, className, title, close, isOpen, ...rest } = props;

  if (!isOpen) {
    return null;
  }

  const _header =
    title || close ? (
      <header className="modal__header">
        {title && <h2 className="modal__title">{title}</h2>}
        {close && (
          <Button
            variant="icon"
            icon="times"
            color="default"
            onClick={close}
            size="small"
            className="modal__close-btn"
          />
        )}
      </header>
    ) : null;

  return (
    <Portal>
      <div className={`modal ${className || ""}`} {...rest}>
        <div className="modal__box">
          {_header}
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.defaultProps = {
  isOpen: true,
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  // Is modal open
  close: PropTypes.func,
  // function to close the modal; if provided, the closing button is displayed
  title: PropTypes.node,
};

export default Modal;
