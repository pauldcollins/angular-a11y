# a11y-announce
Single aria-live for screen reader announcement

## Table of Contents
1. [Usage](#usage)
2. [References](#references)

## Usage
* Inject the A11yAnnounce module dependency
```javascript
const module = angular.module('app', [A11yAnnounceServiceModule]);
```

```javascript
// Enable aria-live="polite" (optional)
module.config(function (A11yAnnounceServiceProvider) {
  A11yAnnounceServiceProvider.setPoliteConfig(true);
})
```

* Inject ``A11yAnnounceService`` dependency into controller/service and send an announcement
```javascript
class ExampleController {

  static get $inject() {
    return ['A11yAnnounceService']
  }

  constructor(A11yAnnounceService) {
    this.A11yAnnounceService = A11yAnnounceService;

    // OR
    // Object.assign(this, { A11yAnnounceService });
  }

  sendAnnouncement() {

    // screen reader reads out the message
    this.A11yAnnounceService.announceAssertive('Example of assertive announcement');

    // or announce politely
    this.A11yAnnounceService.announcePolite('Example of polite announcement');
  }
}

module.controller({ ExampleController });
```

## References
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
