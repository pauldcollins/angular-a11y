/**
 * @ngdoc directive
 * @name  ib-refresh.components.set-focus
 * @element set-focus

 * @description
 * Set's focus to a DOM element for screen readers. EG: <h1>Error message</h1>, <button>, etc

 * @scope
 * @param {Boolean} set-focus = "true" - focus is on, if false element will not be focused
 * @param {Integer} tab-index = "-1" - will set tabIndex of the element to the value passed (optional)
 * @param {Switch} outline = "false" - will remove outline around the focused item (optional with default=true)

  USAGE SCENARIOS TO MEET ACCESSIBILITY REQUIREMENTS:

 * @usage
 *
 * @example 1 (NON-FOCUSABLE ELEMENT)
 * If an element IS NOT normally focusable (EG: <div>, <h1>), it should not have an outline when focused
 * It should also have tabindex="-1" to take it out of the tab order
 * <h1 set-focus="$ctrl.focusSwitch" outline=false tab-index="-1" >A heading</h1>

 * @example 2 (FOCUSABLE ELEMENT)
 * If an element IS normally focusable (EG: <button>, <input>), it should have the standard outline when focused, so don't set to false.
 * It should also retain it's normal tabindex order value, so don't change unless it's been set to "-1"
 * <button type="submit" set-focus="$ctrl.focusSwitch">Submit</button>

 * @example 3 (ELEMENT REQUIRES FOCUS ONLOAD)
 * Just set-focus to "true", instead of making it conditional
 * <button type="submit" set-focus="true">Submit</button>
 */
export default angular.module('ib-refresh.components.set-focus', [])
  .directive('setFocus', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        setFocus: '<',
        tabIndex: '<',
        outline: '<'
      },
      link: function (scope, element) {
        if (scope.outline === false) {
          element[0].style.outline = '0';
        }
        if (scope.tabIndex) {
          element[0].setAttribute('tabindex', scope.tabIndex);
        }
        scope.$watch('setFocus', function (condition) {
          if (condition) {
            // timeout of 300ms to ensure DOM loaded before setting focus
            $timeout(() => {
              element[0].focus();
            }, 300);
          }
        });
      }
    };
  }]).name;
