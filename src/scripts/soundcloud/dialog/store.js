const store = {
  get(dialogId) {
    return this[dialogId]
  },
  set(dialogId, dialog) {
    return (this[dialogId] = dialog)
  }
}

export default store
