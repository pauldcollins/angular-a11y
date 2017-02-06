import componentUnderTest from '../index';

describe('set-focus directive', function () {

  var $scope;
  var $compile;
  var $timeout;

  beforeEach(() => {
    angular.mock.module(componentUnderTest);

    inject(function (_$compile_, $rootScope, _$timeout_) {
      $compile = _$compile_;
      $scope = $rootScope.$new();
      $timeout = _$timeout_;
    });

  });

  it('should set focus on the element if true', () => {
    var testHtml = angular.element(`<input type="text" id="focus-element" set-focus="true"/><button id="other-element"> button </button>`);
    var element = $compile(testHtml)($scope);
    spyOn(element[0], 'focus');
    $timeout(() => {
      $scope.$digest();
      expect(element[0].focus).toHaveBeenCalled();
    }, 300);
  });

  it('should not focus on the element if false', () => {
    var testHtml = angular.element(`<input type="text" id="focus-element" set-focus="false"/><button id="other-element"> button </button>`);
    var element = $compile(testHtml)($scope);
    spyOn(element[0], 'focus');
    $timeout(() => {
      $scope.$digest();
      expect(element[0].focus).not.toHaveBeenCalled();
    }, 300);
  });

  it('should set tabIndex if option is present in Html', () => {
    var testHtml = angular.element(`<input type="text" id="focus-element" set-focus="true" tab-index="-1"/><button id="other-element"> button </button>`);
    var element = $compile(testHtml)($scope);
    $scope.$digest();
    expect(element[0].tabIndex).toBe(-1);
  });

  it('should set outline to 0 if false leave it intact otherwise', () => {
    var testHtml = angular.element(`<input type="text" id="focus-element" set-focus="true" outline="false"/><button id="other-element"> button </button>`);
    var element = $compile(testHtml)($scope);
    $scope.$digest();
    expect(element[0].style.outline).toContain('0');
    testHtml = angular.element(`<input type="text" id="focus-element" set-focus="true" outline="true"/><button id="other-element"> button </button>`);
    element = $compile(testHtml)($scope);
    $scope.$digest();
    expect(element[0].style.outline).not.toContain('0');
  });

  it('should not set outline to 0 by default', () => {
    var testHtml = angular.element(`<input type="text" id="focus-element" set-focus="true" /><button id="other-element"> button </button>`);
    var element = $compile(testHtml)($scope);
    $scope.$digest();
    expect(element[0].style.outline).not.toContain('0');
  });

});
