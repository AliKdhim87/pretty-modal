import React from 'react'
import 'wicg-inert'
interface ModalProps {
  /**
   *  Where you can add the modal elements
   */
  children?: React.ReactNode
  /**
   *  When it's true it will open the modal
   */
  open?: boolean
  /**
   * Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key
   */
  onClose?: () => void
  /**
   * When it's true it will prevent close the modal when you click on the backdrop of the close button
   */
  locked?: boolean
  /**
   * You can specify the parent of the modal where you can render the portal by default it will create a div
   */
  parent?: HTMLElement
  /**
   * You can add class the the parent dev
   */
  parentClass?: string
}
declare const Modal: React.FC<ModalProps>
export default Modal
