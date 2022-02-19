# Pretty modal

---

- TypeScript support
- Build with styled-components
- Light weight
- Custom styles
- CSS variables
- Accessibility
- FocusTrap
- Portal

## Installing

```shell
npm install pretty-modal
```

or

```shell
yarn add pretty-modal
```

> Note: below version 3 use default import `import Modal from 'pretty-modal'`

## Basic Example

```jsx
import React from 'react'
import {Modal} from 'pretty-modal'

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="App">
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Modal
      </button>
      <Modal
        onClose={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button
          onClick={() => {
            setIsOpen(false)
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  )
}

export default App
```

## CSS Variables

You can use the CSS variables for custom Style

```css
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
```

## Custom styles Example

```jsx
import React from 'react'
import {Modal} from 'pretty-modal'

import './App.css'

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="App">
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Modal
      </button>
      <Modal
        onClose={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium porro deleniti velit
        </p>
        <button
          onClick={() => {
            setIsOpen(false)
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  )
}

export default App
```

`App.css`

```css
:root {
  --pretty-modal-backdrop-background-color: ; /* any color you like */
}
```

## locked Modal example

```jsx
import React, {useState} from 'react'
import {Modal} from 'pretty-modal'

const App = () => {
  const [isLocked, setIsLocked] = useState(true)
  const [isLockedOpen, setIsLockedOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => {
          setIsLockedOpen(true)
        }}
      >
        Open Locked Modal
      </button>
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
        <p>
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
```

## Accessibility

```jsx
<Modal
  ariaLabelledby="modal1_label"
  ariaDescribedby="modal1_desc"
  onClose={() => {
    setIsOpen(false)
  }}
  open={isOpen}
>
  <h1 id="modal1_label">Your modal title</h1>
  <p id="modal1_desc">Your modal Description</p>
  <button
    onClick={() => {
      setIsOpen(false)
    }}
  >
    Close
  </button>
</Modal>
```

## Portal

Use `<Portal/>` separately

```jsx
import {Portal} from 'pretty-modal'
;<Portal>Hello, World</Portal>
```

## Props

| Name            | Type                | Default            | Description                                                                                                                                                                                                                                                |
| --------------- | ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children        | React.ReactNode     | `undefined`        | Where you can add the modal elements                                                                                                                                                                                                                       |
| open            | boolean             | `false`            | When it's true it will open the modal                                                                                                                                                                                                                      |
| onClose         | `() => void`        | `undefined`        | Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key                                                                                                                                               |
| locked          | boolean             | `false`            | When it's true it will prevent close the modal when you click on the backdrop of the close button                                                                                                                                                          |
| parent          | string              | `document.body`    | You can specify the parent of the modal where you can render it.                                                                                                                                                                                           |
| parentClass     | string              | `__pretty-modal__` | You change the parent dev className                                                                                                                                                                                                                        |
| ariaLabelledby  | string              | `undefined`        | Gives the dialog an accessible name by referring to the element that provides the dialog title                                                                                                                                                             |
| ariaDescribedby | string              | `undefined`        | Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog.                                                                                                                 |
| `initialFocus`  | `string` or `false` | undefined          | By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus. With this option you can specify a different element to receive that initial focus, or use `false` for no initially focused element at all. |
