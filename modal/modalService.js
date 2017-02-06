/**
 * @ngdoc directive
 * @name  ib-refresh.components.modal:service
 *
 * @description
 * Creates a modal instance using AngularStrap.
 *
 * @scope
 *
 * @param {Object} modalInstance - the instance used to create the modal. will be provided from modalService
 * @param {String} modalTitle - an optional string title to display in modal header
 *
 * @usage
 * ```javascript
 * app.controller('ModalExampleController', ['$scope', 'ibModalService',
 *  function ($scope, ibModalService) {
 *    $scope.openModal = () => {
 *      ibModalService.open(`Hello Worlds`, 'Authorisation required');
 *    }
 *  }]);
 * ```
 * @example
 * <div ng-controller="ModalExampleController">
 *  <button class="btn btn-primary" ng-click="openModal()">Open Modal</button>
 * </div>
 *
 */

import angular from 'angular';
import modal from 'angular-ui-bootstrap/src/modal/index-nocss';

const moduleName = 'ib-refresh.components.modal.service';

angular.module(moduleName, [modal])
  .factory('ibModalService', ['$uibModal', '$uibModalStack', '$q', ($uibModal, $uibModalStack, $q) => {

    const modalQueue = [];
    let modalInstance;

    const modalService = {

      /**
       * Open a modal instance
       * @param {String} content - Content to populate inside of modal, will compile directives
       * @param {String} title - Main title of modal to be displayed in modal header
       * @param {Boolean|String} backdrop - Determines if backdrop is displayed and if modal is closed when backdrop is clicked true|false|'static'
       * @param {Boolean} close - Determines if the close button is displayed
       * @param {Boolean} keyboard - Determines if the modal is closed when ESC key is pressed
       * @returns {Promise}
       */
      open: (content, title = '', backdrop = true, close = true, keyboard = false) => {
        function openModalInstance() {
          modalQueue[0].resolve(modalInstance = $uibModal.open(modalQueue[0].modal));

          modalInstance.opened.then(() => {

            // remove role="dialog" that is created by the uibModal service
            const modalElement = angular.element(document.getElementsByClassName('modal'));
            modalElement.removeAttr('role');

            modalQueue.shift();

            if (modalQueue.length > 0) {
              $uibModalStack.close($uibModalStack.getTop().key);
              openModalInstance();
            } else {
              modalInstance = null;
            }
          });
        }

        return $q(function (resolve) {
          modalQueue.push({
            modal: {
              template: `<ib-modal modal-instance="this" modal-title="${title}" show-close-button="${close}">${content}</ib-modal>`,
              backdropClass: 'ib-f5-component',
              windowClass: 'ib-f5-component',
              backdrop: backdrop,
              keyboard
            },
            resolve: resolve
          });

          if (!modalInstance) {
            if ($uibModalStack.getTop()) {
              $uibModalStack.close($uibModalStack.getTop().key);
            }
            openModalInstance();
          }

        });

      }
    };

    return modalService;
  }]);

export default moduleName;
