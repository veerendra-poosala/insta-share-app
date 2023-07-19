import './index.css'
import '../Header/index.css'

export const PrimaryButton = props => {
  const {children, actionOnClick, type, className} = props

  const callActionOnClick = () => {
    actionOnClick()
  }

  const styling =
    className === undefined ? 'primary-button' : `primary-button ${className}`

  return (
    <button
      className={styling}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={actionOnClick !== undefined ? callActionOnClick : null}
    >
      <p className="button-text">{children}</p>
    </button>
  )
}

export const Defalut = {}
