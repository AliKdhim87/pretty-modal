import React, {useEffect, useState, useRef} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'
import FocusTrap from 'focus-trap-react'

import {Portal} from '../portal'

const GlobalStyles = createGlobalStyle`
  html {
    --pretty-modal-backdrop-background-color: rgba(0, 0, 0, 0.5);
    --pretty-modal-backdrop-backdrop-filter: blur(1px);
    --pretty-modal-backdrop-transition: all 100ms;
    --pretty-modal-backdrop-transition-delay: 200ms;
    --pretty-modal-backdrop-display: flex;
    --pretty-modal-backdrop-align-items: center;
    --pretty-modal-backdrop-justify-content: center;
    --pretty-modal-backdrop-padding: 30px 0;

    --pretty-modal-modal-container-transform: translateY(-10rem);
    --pretty-modal-modal-container-transition: all 200ms;
    --pretty-modal-modal-container-padding: 20px;
    --pretty-modal-modal-container-min-height: 50px;
    --pretty-modal-modal-container-min-width: 50px;
    --pretty-modal-modal-container-max-width: 80%;
    --pretty-modal-modal-container-max-height: 100%;
    --pretty-modal-modal-container-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    --pretty-modal-modal-container-background-color: #fff;
    --pretty-modal-modal-container-border-radius: 2px;

    --pretty-modal-active-transition-duration: 250ms;
    --pretty-modal-active-transition-delay: 0ms;

    --pretty-modal-active-modal-container-transform: translateX(0);
    --pretty-modal-active-modal-container-transition-delay: 150ms;
    --pretty-modal-active-modal-container-transition-duration: 350ms;
  }
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--pretty-modal-backdrop-background-color);
  backdrop-filter: var(--pretty-modal-backdrop-backdrop-filter);
  opacity: 0;
  transition: var(--pretty-modal-backdrop-transition);
  transition-delay: var(--pretty-modal-backdrop-transition-delay);
  display: var(--pretty-modal-backdrop-display);
  align-items: var(--pretty-modal-backdrop-align-items);
  justify-content: var(--pretty-modal-backdrop-justify-content);
  padding: var(--pretty-modal-backdrop-padding);

  & .modal-container {
    transform: var(--pretty-modal-modal-container-transform);
    transition: var(--pretty-modal-modal-container-transition);
    opacity: 0;
  }

  &.active {
    transition-duration: var(--pretty-modal-active-transition-duration);
    transition-delay: var(--pretty-modal-active-transition-delay);
    opacity: 1;

    & .modal-container {
      transform: var(--pretty-modal-active-modal-container-transform);
      opacity: 1;
      transition-delay: var(--pretty-modal-active-modal-container-transition-delay);
      transition-duration: var(--pretty-modal-active-modal-container-transition-duration);
    }
  }
`

const ModalContainer = styled.div`
  position: relative;
  padding: var(--pretty-modal-modal-container-padding);
  box-sizing: border-box;
  min-height: var(--pretty-modal-modal-container-min-height);
  min-width: var(--pretty-modal-modal-container-min-width);
  max-width: var(--pretty-modal-modal-container-max-width);
  max-height: var(--pretty-modal-modal-container-max-height);
  box-shadow: var(--pretty-modal-modal-container-box-shadow);
  background-color: var(--pretty-modal-modal-container-background-color);
  border-radius: var(--pretty-modal-modal-container-border-radius);
  overflow-y: auto;
  overflow-x: hidden;
`
export interface ModalProps {
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
   * You can specify the parent of the modal where you can render it.
   */
  parent?: string
  /**
   * You can add class the the parent dev
   */
  parentClass?: string
  /**
   * Gives the dialog an accessible name by referring to the element that provides the dialog title
   */
  ariaLabelledby?: string
  /**
   * Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog.
   */
  ariaDescribedby?: string
  /**
   * By default, when a focus trap is activated the first element in the
   * focus trap's tab order will receive focus. With this option you can
   * specify a different element with using className, id, tag name to receive that initial focus,
   *  or use `false` for no initially focused element at all.
   *
   */
  initialFocus?: string | false
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  locked,
  parent,
  parentClass,
  ariaDescribedby,
  ariaLabelledby,
  initialFocus,
}: ModalProps) => {
  const [active, setActive] = useState<boolean | undefined>(false)
  const backdrop = useRef<HTMLDivElement | null>(null)

  const targetRef = React.useRef(null)
  let targetElement: Element | null = null

  useEffect(() => {
    const {current} = backdrop

    targetElement = targetRef.current
    const transitionEnd = () => setActive(open)

    const keyHandler = (event: {which: number}) => {
      if (!locked && [27].indexOf(event.which) >= 0 && onClose) {
        onClose()
        enableBodyScroll(targetElement as HTMLElement | Element)
      }
    }

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!locked && e.target === current && onClose) {
        onClose()
        enableBodyScroll(targetElement as HTMLElement | Element)
      }
    }

    if (current) {
      current && current.addEventListener('transitionend', transitionEnd)
      current.addEventListener('click', clickHandler as any)
      window.addEventListener('keyup', keyHandler)
    }

    if (open && targetElement) {
      setActive(open)
      disableBodyScroll(targetElement)
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd)
        current.removeEventListener('click', clickHandler as any)
      }
      if (targetElement) {
        clearAllBodyScrollLocks()
      }
      window.removeEventListener('keyup', keyHandler)
    }
  }, [open, locked, onClose, targetElement])

  const focusTrapOptions = {
    checkCanFocusTrap: (trapContainers: Element[]) => {
      const results = trapContainers.map(trapContainer => {
        return new Promise<void>(resolve => {
          const interval = setInterval(() => {
            if (getComputedStyle(trapContainer).opacity !== '0') {
              resolve()
              clearInterval(interval)
            }
          }, 10)
        })
      })
      // Return a promise that resolves when all the trap containers are able to receive focus
      return Promise.all(results)
    },
    initialFocus: initialFocus,
  } as any

  return (
    <React.Fragment>
      <GlobalStyles />
      {(open || active) && (
        <Portal parent={parent} className={parentClass}>
          <FocusTrap active={active} focusTrapOptions={focusTrapOptions}>
            <Backdrop
              ref={backdrop}
              className={active && open ? 'active' : ''}
              data-testid="backdrop"
            >
              <ModalContainer
                ref={targetRef}
                data-testid="modal-container"
                role="dialog"
                aria-modal={open}
                className="modal-container"
                aria-describedby={ariaDescribedby}
                aria-labelledby={ariaLabelledby}
              >
                {children}
              </ModalContainer>
            </Backdrop>
          </FocusTrap>
        </Portal>
      )}
    </React.Fragment>
  )
}
