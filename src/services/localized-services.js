export default {
  getLocalizedMessages (messageKey) {
    return browser.i18n.getMessage(messageKey)
  }
}
