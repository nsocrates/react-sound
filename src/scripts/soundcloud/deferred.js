export default function deferred() {
  const deferredObj = {}

  deferredObj.promise = new Promise((resolve, reject) => {
    deferredObj.resolve = resolve
    deferredObj.reject = reject
  })

  return deferredObj
}
