import modalService from '../modalService';

describe('ibModalService', () => {

  let ibModalService;
  let $uibModal;

  beforeEach(() => {
    angular.mock.module(modalService);

    inject((_ibModalService_, _$uibModal_) => {
      ibModalService = _ibModalService_;
      $uibModal = _$uibModal_;
    });
  });

  describe('service', () => {
    it('should exist', () => {
      expect(ibModalService).toBeDefined();
    });
  });

  describe('modalInstance', () => {

    it('should have an open method', () => {
      expect($uibModal.open).toBeDefined();
    });

  });
});
