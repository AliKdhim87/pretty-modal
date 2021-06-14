import React, {useMemo, useEffect} from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children?: React.ReactNode
  parent?: HTMLElement
  className?: string
}

const Portal: React.FC<PortalProps> = ({children, parent, className}) => {
  const el = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body

    const classList = ['__pretty-modal__']
    if (className) className.split(' ').forEach((item: string) => classList.push(item))

    classList.forEach(item => el.classList.add(item))

    target.appendChild(el)
    return () => {
      target.removeChild(el)
    }
  }, [el, parent, className])
  return ReactDOM.createPortal(children, el)
}

export default Portal
