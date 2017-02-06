import modal from '../modal';

describe('modal', () => {

  var $scope;
  var $componentController;
  let locals;
  let bindings;

  const elementTemplate = `<ib-modal>This is a modal</ib-modal>`;

  beforeEach(function () {
    angular.mock.module(modal);
    inject(function ($rootScope, $compile, _$componentController_) {
      $componentController = _$componentController_;
      $scope = $rootScope.$new();
      locals = {
        $scope: $scope,
        $element: elementTemplate
      };
      bindings = {
        modalInstance: {},
        modalTitle: 'This is the modal title',
        showCloseButton: false
      };
      $scope.$digest();
    });
  });

  describe('modal binding', () => {
    it('should expose a `content` binding', function () {
      const ctrl = $componentController('ibModal', locals, bindings);
      expect(ctrl.modalInstance).toBeDefined();
    });

    it('should expose a `content` binding', function () {
      const ctrl = $componentController('ibModal', locals, bindings);
      expect(ctrl.modalTitle).toEqual('This is the modal title');
    });

    it('should expose a `showCloseButton` binding', function () {
      const ctrl = $componentController('ibModal', locals, bindings);
      expect(ctrl.showCloseButton).toEqual(false);
    });
  });


  describe('modalInstance', () => {
    it('should not set modal api if modalInstance is not defined', function () {
      // Delete any existing modal instance
      delete bindings.modalInstance;
      const ctrl = $componentController('ibModal', locals, bindings);
      expect(ctrl.modal).not.toBeDefined();
    });

    it('should not set modal api if modalInstance is defined', function () {
      // Set a modal instance
      bindings.modalInstance = {
        $id: '12',
        $close: {},
        $dismiss: {}
      };

      const ctrl = $componentController('ibModal', locals, bindings);
      ctrl.$onInit();
      expect(ctrl.modal).toBeDefined();
    });
  });
});
