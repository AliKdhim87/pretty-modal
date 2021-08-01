# Pretty modal

----

- Support typescript
- Build with styled-components
- light weight

## Installing

```shell
npm install pretty-modal
```

or

```shell
yarn add pretty-modal
```

## Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'pretty-modal'

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
    </div>
  )
}

export default App

```

| Name           | Type          | Default       | Description                        |
|----------------|---------------|---------------|------------------------------------|
|children        |React.ReactNode|`undefined`    |Where you can add the modal elements|
|open            |boolean        |`false`        |When it's true it will open the modal|
|onClose         |`() => void`   |`undefined`    |Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key|
|locked          |boolean        |`false`        | When it's true it will prevent close the modal when you click on the backdrop of the close button|
|parent          |HTMLElement    |`document.body`|You can specify the parent of the modal where you can render the portal by default it will create a div|
|parentClass     |string         |`__pretty-modal__`|You change the parent dev className
