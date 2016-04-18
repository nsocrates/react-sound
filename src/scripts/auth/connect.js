import dialogFactory from './dialog/factory'

export default function connect() {
  const dialog = dialogFactory()
  return dialog.open()
}
