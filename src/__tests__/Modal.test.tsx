import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import Modal from '../components/Modal'

afterEach(cleanup)

const onClose = jest.fn()
describe('modal', () => {
  describe('backdrop', () => {
    test('should fire the onClose function when clicking on the backdrop', () => {
      const {getByTestId} = render(
        <Modal open={true} onClose={onClose}>
          <div>Modal children</div>
        </Modal>,
      )
      fireEvent.click(getByTestId('backdrop'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    test('should disabled the onClose function when the locked property is true', () => {
      const {getByTestId} = render(
        <Modal open={true} onClose={onClose} locked>
          <div>Modal children</div>
        </Modal>,
      )
      fireEvent.click(getByTestId('backdrop'))
      expect(onClose).not.toHaveBeenCalled()
    })

    test('should disabled the onClose function when click inside the modal container', () => {
      const {getByTestId} = render(
        <Modal open={true} onClose={onClose}>
          <div>Modal children</div>
        </Modal>,
      )
      fireEvent.click(getByTestId('modal-container'))
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('kye event', () => {
    const eventKeys = {
      key: 'Escape',
      code: 'Escape',
      which: 27,
      charCode: 27,
    }

    test('should fire the onClose function when you press the esc key', () => {
      const {container} = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      )

      fireEvent.keyUp(container, eventKeys)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    test('ignore onClose function when it is locked', () => {
      const {container} = render(
        <Modal open locked onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      )

      fireEvent.keyUp(container, eventKeys)
      expect(onClose).not.toHaveBeenCalled()
    })

    test('ignore onClose function when provide an wrong key', () => {
      eventKeys.which = 13
      const {container} = render(
        <Modal open locked onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      )

      fireEvent.keyUp(container, eventKeys)
      expect(onClose).not.toHaveBeenCalled()
    })
  })
  describe('body scroll', () => {
    test('should not block the scroll when modal is rendered closed', () => {
      const {getByTestId} = render(
        <Modal open={true} onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      )
      fireEvent.click(getByTestId('backdrop'))
      expect(document.body.style.overflow).toBe('')
    })

    test('should block the scroll when modal is rendered', () => {
      render(
        <Modal open={true}>
          <div>modal content</div>
        </Modal>,
      )
      expect(document.body.style.overflow).toBe('hidden')
    })
  })
})
