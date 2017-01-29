import { angular } from '@angular/core';
console.log('BOOYAH');

export class SingleAriaLive {
  announceAssertive(message) {
    console.log('YES');
  }
  //constructor($sce, config) {
  //  this.$sce = $sce;
  //  this.config = config;
  //
  //  // references: http://a11yproject.com/posts/how-to-hide-content
  //  this.srOnlyStyles = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;';
  //  this.allowedSettings = ['assertive', 'polite'];
  //
  //  this.assertiveAnnouncer = null;
  //  this.politeAnnouncer = null;
  //
  //  const { assertiveSetting, politeSetting } = this.config;
  //  if (assertiveSetting && !this.assertiveAnnouncer) {
  //    this.assertiveAnnouncer = this._createAnnouncerDOMElement();
  //  }
  //
  //  if (politeSetting && !this.politeAnnouncer) {
  //    this.politeAnnouncer = this._createAnnouncerDOMElement('polite');
  //  }
  //}
  //
  ///**
  // * Add message to assertive live region element
  // * @param message
  // */
  //announceAssertive(message) {
  //  if (!this.config.assertiveSetting) {
  //    return;
  //  }
  //
  //  this._appendMessage(message, this.assertiveAnnouncer);
  //}
  //
  ///**
  // * Add message to polite live region element
  // * @param message
  // */
  //announcePolite(message) {
  //  if (!this.config.politeSetting) {
  //    return;
  //  }
  //
  //  this._appendMessage(message, this.politeAnnouncer);
  //}
  //
  ///**
  // * Helper method to generate paragraph and text
  // * @param message
  // * @param announcers
  // * @param index
  // * @private
  // */
  //_appendMessage(message, announcer) {
  //  announcer.empty();
  //
  //  if (message && announcer) {
  //    announcer.append(this.$sce.getTrustedHtml(message));
  //  }
  //}
  //
  ///**
  // * Create and append announcer dom element to body
  // * @param index
  // * @param ariaLiveSetting
  // * @returns {*}
  // * @private
  // */
  //_createAnnouncerDOMElement(ariaLiveSetting = 'assertive') {
  //  if (this.allowedSettings.indexOf(ariaLiveSetting) <= -1) {
  //    return null;
  //  }
  //
  //  const announcerElement = angular.element('<div>').attr(this._getElementAttributesForType(ariaLiveSetting));
  //  angular.element(document.body).append(announcerElement);
  //
  //  return announcerElement;
  //}
  //
  ///**
  // * Get attributes by live region setting
  // * @param type
  // * @param index
  // * @returns {*|attributes.default|{id, style, aria-live, aria-atomic}}
  // * @private
  // */
  //_getElementAttributesForType(ariaLiveSetting) {
  //  const attributes = {
  //    polite: {
  //      id: `ib-a11y-announce--polite`,
  //      role: 'log',
  //      style: this.srOnlyStyles,
  //      'aria-live': 'polite',
  //      'aria-atomic': true
  //    },
  //    assertive: {
  //      id: `ib-a11y-announce--assertive`,
  //      style: this.srOnlyStyles,
  //      'aria-live': 'assertive',
  //      'aria-atomic': true
  //    },
  //    default: {
  //      id: `ib-a11y-announce--off`,
  //      style: this.srOnlyStyles,
  //      'aria-live': 'off',
  //      'aria-atomic': false
  //    }
  //  };
  //
  //  return attributes[ariaLiveSetting] || attributes.default;
  //}
}
