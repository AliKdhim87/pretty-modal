import React from 'react'
import Modal, {Backdrop, ModalContainer} from '../src/components/Modal'
import styled from 'styled-components'

const StyledBackdrop = styled(Backdrop)`
  background-color: rgb(188 230 243 / 50%);
`
const StyledModalContainer = styled(ModalContainer)`
  padding: 20px;
  background-color: #3575c5;
  color: #fff;
  button {
    border: none;
    outline: none;
    border-radius: 8px;
    width: 100%;
    background-color: #fff;
    padding: 10px;
  }
`

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLocked, setIsLocked] = React.useState(true)
  const [isLockedOpen, setIsLockedOpen] = React.useState(false)
  return (
    <div className="App">
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Modal
      </button>
      <button
        onClick={() => {
          setIsLockedOpen(true)
        }}
      >
        Open Locked Modal
      </button>
      <Modal
        StyledBackdrop={StyledBackdrop}
        StyledModalContainer={StyledModalContainer}
        onClose={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium porro deleniti velit
          vel. Est error molestias corporis tenetur voluptatibus autem impedit dolore dolores
          accusamus inventore id vero quos, ut dicta.
        </p>

        <p style={{textAlign: 'center'}}>
          <button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Close
          </button>
        </p>
      </Modal>
      <Modal
        locked={isLocked}
        onClose={() => {
          setIsLockedOpen(false)
          setIsLocked(true)
        }}
        open={isLockedOpen}
      >
        <p>s no escaping me.</p>
        <p>Once unlocked clicking outside or pressing esc will close me.</p>
        <p style={{textAlign: 'center'}}>
          <button
            onClick={() => {
              setIsLocked(!isLocked)
            }}
          >
            {isLocked ? 'Unlock' : 'Lock'}
          </button>
        </p>
      </Modal>
    </div>
  )
}

export default App
