'use strict';

var React = require('react');
var styled = require('styled-components');
require('wicg-inert');
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

const Portal = ({ children, parent, className }) => {
    const el = React.useMemo(() => document.createElement('div'), []);
    React.useEffect(() => {
        const target = parent && parent.appendChild ? parent : document.body;
        const classList = ['__pretty-modal__'];
        if (className)
            className.split(' ').forEach((item) => classList.push(item));
        classList.forEach(item => el.classList.add(item));
        target.appendChild(el);
        return () => {
            target.removeChild(el);
        };
    }, [el, parent, className]);
    return ReactDOM__default['default'].createPortal(children, el);
};

const GlobalStyles = styled.createGlobalStyle `
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
`;
const Backdrop = styled__default['default'].div `
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
`;
const ModalContainer = styled__default['default'].div `
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
`;
const Modal = ({ children, open, onClose, locked, parent, parentClass, }) => {
    const [active, setActive] = React.useState(false);
    const backdrop = React.useRef(null);
    const root = document.querySelector('#root');
    React.useEffect(() => {
        const { current } = backdrop;
        const transitionEnd = () => setActive(open);
        const keyHandler = (event) => !locked && [27].indexOf(event.which) >= 0 && onClose ? onClose() : undefined;
        const clickHandler = (e) => !locked && e.target === current && onClose ? onClose() : undefined;
        if (current) {
            current && current.addEventListener('transitionend', transitionEnd);
            current.addEventListener('click', clickHandler);
            window.addEventListener('keyup', keyHandler);
        }
        if (open) {
            window.setTimeout(() => {
                document.activeElement.blur();
                setActive(open);
                if (root) {
                    root.setAttribute('inert', 'true');
                }
            }, 10);
        }
        return () => {
            if (current) {
                current.removeEventListener('transitionend', transitionEnd);
                current.removeEventListener('click', clickHandler);
            }
            if (root) {
                root.removeAttribute('inert');
            }
            window.removeEventListener('keyup', keyHandler);
        };
    }, [open, locked, onClose]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(GlobalStyles, null),
        (open || active) && (React__default['default'].createElement(Portal, { parent: parent, className: parentClass },
            React__default['default'].createElement(Backdrop, { ref: backdrop, className: active && open ? 'active' : '' },
                React__default['default'].createElement(ModalContainer, { className: "modal-container" }, children))))));
};

module.exports = Modal;
//# sourceMappingURL=index.cjs.js.map
