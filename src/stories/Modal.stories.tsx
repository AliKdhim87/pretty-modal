import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {useArgs} from '@storybook/client-api'
import {withTests} from '@storybook/addon-jest'

import results from '../../.jest-test-results.json'
import {Modal} from '../components/Modal'

export default {
  title: 'Pretty/Modal',
  component: Modal,
  docs: {inlineStories: false},
  argTypes: {onClose: {action: 'clicked'}},
  decorators: [withTests({results})],
} as ComponentMeta<typeof Modal>

export const DefaultModal: React.FC = ({...args}) => {
  const [{open}, updateArgs] = useArgs()

  return (
    <div className="App">
      <button onClick={() => updateArgs({open: true})}>Open Modal</button>
      <Modal onClose={() => updateArgs({open: false})} open={open} {...args}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium porro deleniti velit
          vel. Est error molestias corporis tenetur voluptatibus autem impedit dolore dolores
          accusamus inventore id vero quos, ut dicta.
        </p>
        <input type="text" />

        <p style={{textAlign: 'center'}}>
          <button onClick={() => updateArgs({open: false})}>Close</button>
        </p>
      </Modal>
    </div>
  )
}
