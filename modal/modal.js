/**
 * @ngdoc directive
 * @name  ib-refresh.components:modal
 * @element ib-modal
 *
 * @requires
 * This component requires [UI Bootstrap](https://angular-ui.github.io/bootstrap/s) modal implementation.
 *
 * @description
 * Creates a modal directive using UI Bootstrap.
 *
 * @scope
 *
 * @param {Object} modal-instance - the instance used to create the modal. will be provided from modalService
 * @param {String} modal-title - an optional string title to display in modal header
 *
 * @usage
 * ```html
 * <ib-modal>This is a modal</ib-modal>
 * ```
 *
 * @example
 * <div ng-controller="ModalExampleController">
 *  <button class="btn btn-primary" ng-click="openModal()">Open Modal</button>
 * </div>
 */

import angular from 'angular';
import ModalController from './modalController';

const moduleName = 'ib-refresh.components.modal.component';

angular.module(moduleName, [])
  .component('ibModal', {
    transclude: true,
    bindings: {
      modalInstance: '<',
      modalTitle: '@',
      showCloseButton: '<',
      closeAction: '&'
    },
    template: require('./modal.tpl.html'),
    controller: ModalController
  });

export default moduleName;

