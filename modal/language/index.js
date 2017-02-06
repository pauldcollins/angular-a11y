import angularTranslate from 'angular-translate';

import labels from './labels';

export default angular.module('ibcomponents.modal.lang', [angularTranslate])
  .constant('modalLangEN', {
    LABEL: labels
  }).config(['$translateProvider', 'modalLangEN', function ($translateProvider, langData) {
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    $translateProvider.translations('en', langData);
    $translateProvider.use('en');
  }]).name;
