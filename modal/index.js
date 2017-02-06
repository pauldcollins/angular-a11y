import angular from 'angular';
import modalComponent from './modal';
import modalService from './modalService';
import genericModalContent from './genericModalContent';
import language from './language';
import './modal.styl';

const moduleName = 'ib-refresh.components.modal';

angular.module(moduleName, [modalComponent, modalService, genericModalContent, language]);

export default moduleName;
