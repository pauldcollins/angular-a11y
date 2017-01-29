/**
 * @ngdoc service
 *
 * @description  Append single aria-live for Screen reader announcement
 *
 * @name SingleAriaLiveService
 *
 * @usage
 * 1. Inject the SingleAriaLiveService module dependency
 * const module = angular.module('app', [A11yAnnounceServiceModule]);
 *
 * ==== Enable aria-live="polite" (optional) ===
 * module.config(function (A11yAnnounceServiceProvider) {
 *    A11yAnnounceServiceProvider.setPoliteConfig(true);
 * })
 *
 * 2. Inject service dependency into controller/service and send an announcement
 * class ExampleController {
 *    static get $inject() {
 *      return ['SingleAriaLiveService']
 *    }
 *
 *    constructor(A11yAnnounceService) {
 *      this.SingleAriaLiveService = SingleAriaLiveService;
 *    }
 *
 *    sendAnnouncement() {
 *      this.SingleAriaLiveService.announceAssertive('Example of assertive announcement');
 *
 *      // or announce politely
 *      this.SingleAriaLiveService.announcePolite('Example of polite announcement');
 *    }
 * }
 *
 * module.controller({ ExampleController });
 *
 */

import { angular } from '@angular/core';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import { SingleAriaLive } from './single-aria-live.ts';

console.log('loading component');

@Injectable()

export class SingleAriaLiveService {

  constructor(
      private _sanitizer: DomSanitizer,
      public SingleAriaLive: SingleAriaLive
  ) {
    this.config = {
      assertiveSetting: true,
      politeSetting: false
    };
    this.message = 'loading injectable service';
    this.$get = ['$sce', ($sce) => new SingleAriaLive($sce, this.config)];
  }

  /**
   * Set default assertive config
   * @param value
   */
  setAssertiveConfig(value) {
    this.config.assertiveSetting = value;
  }

  /**
   * Set default polite config
   * @param value
   */
  setPoliteConfig(value) {
    this.config.politeSetting = value;
  }
}

