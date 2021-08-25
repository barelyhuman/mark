export async function copy (text) {
  if (!navigator.clipboard) {
    return _copyDeprecated(text)
  }
  await navigator.clipboard.writeText(text)
}

function _copyDeprecated (text) {
  const copyTextarea = document.createElement('textarea')
  copyTextarea.style.position = 'fixed'
  copyTextarea.style.opacity = '0'
  copyTextarea.textContent = text

  document.body.appendChild(copyTextarea)
  copyTextarea.select()
  document.execCommand('copy')
  document.body.removeChild(copyTextarea)
}
