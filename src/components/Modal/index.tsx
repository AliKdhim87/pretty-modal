import React, {useEffect, useState, useRef} from 'react'

import styled from 'styled-components'
import 'wicg-inert'

import Portal from '../portal'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  opacity: 0;
  transition: all 100ms;
  transition-delay: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;

  & .modal-content {
    transform: translateY(-10rem);
    transition: all 200ms;
    opacity: 0;
  }

  &.active {
    transition-duration: 250ms;
    transition-delay: 0ms;
    opacity: 1;

    & .modal-content {
      transform: translateX(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
  }
`

const Content = styled.div`
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  min-height: 50px;
  min-width: 50px;
  max-width: 80%;
  max-height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 2px;
  overflow-y: auto;
  overflow-x: hidden;
`

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

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  locked,
  parent,
  parentClass,
}: ModalProps) => {
  const [active, setActive] = useState<boolean | undefined>(false)

  const backdrop = useRef<HTMLDivElement | null>(null)

  const root = document.querySelector('#root')

  useEffect(() => {
    const {current} = backdrop

    const transitionEnd = () => setActive(open)

    const keyHandler = (event: {which: number}) =>
      !locked && [27].indexOf(event.which) >= 0 && onClose ? onClose() : undefined

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      !locked && e.target === current && onClose ? onClose() : undefined

    if (current) {
      current && current.addEventListener('transitionend', transitionEnd)
      current.addEventListener('click', clickHandler as any)
      window.addEventListener('keyup', keyHandler)
    }

    if (open) {
      window.setTimeout(() => {
        ;(document.activeElement as HTMLElement).blur()
        setActive(open)
        if (root) {
          root.setAttribute('inert', 'true')
        }
      }, 10)
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd)
        current.removeEventListener('click', clickHandler as any)
      }
      if (root) {
        root.removeAttribute('inert')
      }
      window.removeEventListener('keyup', keyHandler)
    }
  }, [open, locked, onClose])

  return (
    <React.Fragment>
      {(open || active) && (
        <Portal parent={parent} className={parentClass}>
          <Backdrop ref={backdrop} className={active && open ? 'active' : ''}>
            <Content className="modal-content">{children}</Content>
          </Backdrop>
        </Portal>
      )}
    </React.Fragment>
  )
}

export default Modal
