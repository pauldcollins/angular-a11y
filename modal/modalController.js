export default class ModalController {

  constructor() {
    this.$onInit = () => {
      if (this.modalInstance) {
        this.modal = {
          id: this.modalInstance.$id,
          close: this.modalInstance.$close,
          closing: this.modalInstance.$closing,
          dismiss: this.modalInstance.$dismiss
        };
      }
    };
  }
}

ModalController.$inject = ['$scope'];
