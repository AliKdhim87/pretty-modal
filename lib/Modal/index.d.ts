import React from 'react';
interface ModalProps {
    /**
     *  Where you can add the modal elements
     */
    children?: React.ReactNode;
    /**
     *  When it's true it will open the modal
     */
    open?: boolean;
    /**
     * Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key
     */
    onClose?: () => void;
    /**
     * When it's true it will prevent close the modal when you click on the backdrop of the close button
     */
    locked?: boolean;
    /**
     * You can specify the parent of the modal where you can render it.
     */
    parent?: string;
    /**
     * You can add class the the parent dev
     */
    parentClass?: string;
    /**
     * Gives the dialog an accessible name by referring to the element that provides the dialog title
     */
    ariaLabelledby?: string;
    /**
     * Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog.
     */
    ariaDescribedby?: string;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
//# sourceMappingURL=index.d.ts.map