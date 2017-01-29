import serviceUnderTest from '../index';

describe('A11y Announce', () => {
  let service;
  let provider;

  function cleanUpAriaLiveElements() {
    const a11yElementIds = ['ib-a11y-announce--assertive', 'ib-a11y-announce--polite'];

    a11yElementIds.forEach((className) => {
      if (document.getElementById(className)) {
        document.body.removeChild(document.getElementById(className));
      }
    });
  }

  beforeEach(() => {
    angular.mock.module(serviceUnderTest, (A11yAnnounceServiceProvider) => {
      provider = A11yAnnounceServiceProvider;
      provider.setPoliteConfig(true);
    });

    inject((_A11yAnnounceService_) => {
      service = _A11yAnnounceService_;
    });
  });

  afterEach(() => {
    cleanUpAriaLiveElements();
  });

  describe('default config', () => {
    it('should have configs to be defined', () => {
      expect(service.config).toBeDefined();
      expect(service.config.assertiveSetting).toBe(true);
      expect(service.config.politeSetting).toBe(true);
    });

    it('should return FALSE when set assertiveSetting to FALSE', () => {
      provider.setAssertiveConfig(false);
      expect(service.config.assertiveSetting).toBe(false);
    });

    it('should return TRUE when set politeSetting to TRUE', () => {
      provider.setPoliteConfig(true);
      expect(service.config.politeSetting).toBe(true);
    });

    it('should return FALSE when set politeSetting to FALSE', () => {
      provider.setPoliteConfig(false);
      expect(service.config.politeSetting).toBe(false);
    });
  });

  describe('A11yAnnounce', () => {
    describe('initialisation', () => {
      it('should have config to be defined', () => {
        expect(service.config).toBeDefined();
      });

      it('should have srOnlyStyles to be defined', () => {
        expect(service.srOnlyStyles).toBeDefined();
      });

      it('should have assertiveAnnouncer to be defined', () => {
        expect(service.assertiveAnnouncer).toBeDefined();
      });

      it('should have politeAnnouncer to be defined', () => {
        expect(service.politeAnnouncer).toBeDefined();
      });
    });

    describe('_getElementAttributesForType()', () => {
      it('should return attributes for `assertive` setting by default', () => {
        const expectedAttributes = {
          id: `ib-a11y-announce--assertive`,
          style: service.srOnlyStyles,
          'aria-live': 'assertive',
          'aria-atomic': true
        };

        expect(service._getElementAttributesForType('assertive')).toEqual(expectedAttributes);
      });

      it('should return attributes for `polite` setting by default', () => {
        const expectedAttributes = {
          id: `ib-a11y-announce--polite`,
          role: 'log',
          style: service.srOnlyStyles,
          'aria-live': 'polite',
          'aria-atomic': true
        };

        expect(service._getElementAttributesForType('polite')).toEqual(expectedAttributes);
      });
    });

    describe('_createAnnouncerDOMElement()', () => {
      afterEach(() => {
        cleanUpAriaLiveElements();
      });

      it('should create and append element for aria-live `assertive` setting', () => {
        service._createAnnouncerDOMElement();

        const expectedAssertiveAnnouncer = document.getElementById('ib-a11y-announce--assertive');

        expect(expectedAssertiveAnnouncer).toBeDefined();
        expect(expectedAssertiveAnnouncer.getAttribute('style')).toBeDefined();
        expect(expectedAssertiveAnnouncer.getAttribute('aria-live')).toEqual('assertive');
        expect(expectedAssertiveAnnouncer.getAttribute('aria-atomic')).toEqual('true');
      });

      it('should create and append element for aria-live `polite` setting', () => {
        service._createAnnouncerDOMElement('polite');

        const expectedPoliteElement = document.getElementById('ib-a11y-announce--polite');

        expect(expectedPoliteElement).toBeDefined();
        expect(expectedPoliteElement.getAttribute('style')).toBeDefined();
        expect(expectedPoliteElement.getAttribute('aria-live')).toEqual('polite');
        expect(expectedPoliteElement.getAttribute('role')).toEqual('log');
      });

      it('should NOT create and append element if putting UNKNOWN setting ', () => {
        service._createAnnouncerDOMElement('unknown');

        expect(document.getElementById('ib-a11y-announce--unknown')).toBeNull();
      });
    });

    describe('_appendMessage()', () => {

      describe('For arial-live=assertive', () => {
        beforeEach(() => {
          cleanUpAriaLiveElements();
          service.assertiveAnnouncer = null;
        });

        it('should get a message', () => {
          service.assertiveAnnouncer = service._createAnnouncerDOMElement();
          const messageToSend = 'Hello assertive message';
          service._appendMessage(messageToSend, service.assertiveAnnouncer);

          const announcerElement = document.getElementById('ib-a11y-announce--assertive');
          expect(announcerElement).toBeDefined();
          expect(announcerElement.textContent).toEqual(messageToSend);
        });

        it('should get HTML message contents', () => {
          service.assertiveAnnouncer = service._createAnnouncerDOMElement();
          const messageToSend = `<ul><li>Message 1</li><li>Message 2</li></ul>`;
          service._appendMessage(messageToSend, service.assertiveAnnouncer);

          const announcerElement = document.getElementById('ib-a11y-announce--assertive');
          expect(announcerElement).toBeDefined();
          expect(announcerElement.innerHTML).toEqual(messageToSend);
        });

        it('should get NO message', () => {
          service.assertiveAnnouncer = service._createAnnouncerDOMElement();
          const messageToSend = '';
          service._appendMessage(messageToSend, service.assertiveAnnouncer);

          const announcerElement = document.getElementById('ib-a11y-announce--assertive');
          expect(announcerElement).toBeDefined();
          expect(announcerElement.textContent).toEqual(messageToSend);
        });

      });

      describe('For arial-live=polite', () => {
        beforeEach(() => {
          cleanUpAriaLiveElements();
          service.politeAnnouncer = null;
        });

        it('should get a message for polite', () => {
          service.politeAnnouncer = service._createAnnouncerDOMElement('polite');
          const messageToSend = 'Hello polite message';
          service._appendMessage(messageToSend, service.politeAnnouncer);

          const announcerElement = document.getElementById('ib-a11y-announce--polite');
          expect(announcerElement).toBeDefined();
          expect(announcerElement.textContent).toEqual(messageToSend);
        });

        it('should get HTML message contents', () => {
          service.politeAnnouncer = service._createAnnouncerDOMElement('polite');
          const messageToSend = `<ul><li>Message 1</li><li>Message 2</li></ul>`;
          service._appendMessage(messageToSend, service.politeAnnouncer);

          const announcerElement = document.getElementById('ib-a11y-announce--polite');
          expect(announcerElement).toBeDefined();
          expect(announcerElement.innerHTML).toEqual(messageToSend);
        });

        it('should get NO message', () => {
          service.politeAnnouncer = service._createAnnouncerDOMElement('polite');
          const messageToSend = '';
          service._appendMessage(messageToSend, service.politeAnnouncer);

          const announcerElement = document.getElementById('ib-a11y-announce--polite');
          expect(announcerElement).toBeDefined();
          expect(announcerElement.textContent).toEqual(messageToSend);
        });

      });
    });

    describe('announceAssertive()', () => {
      beforeEach(() => {
        spyOn(service, '_appendMessage').and.callThrough();
      });

      it('should get some message', () => {
        const messageToSend = 'Hello world';

        service.announceAssertive(messageToSend);
        expect(service._appendMessage).toHaveBeenCalled();
        expect(document.getElementById('ib-a11y-announce--assertive').innerText).toEqual(messageToSend);
      });

      it('should NOT get any message', () => {
        const messageToSend = '';

        service.announceAssertive(messageToSend);
        expect(service._appendMessage).toHaveBeenCalled();
        expect(document.getElementById('ib-a11y-announce--assertive').innerText).toEqual(messageToSend);
      });
    });

    describe('announceAssertive()', () => {
      beforeEach(() => {
        spyOn(service, '_appendMessage').and.callThrough();
      });

      it('should get some message', () => {
        const messageToSend = 'Hello assertive';

        service.announceAssertive(messageToSend);
        expect(service._appendMessage).toHaveBeenCalled();
        expect(document.getElementById('ib-a11y-announce--assertive').innerText).toEqual(messageToSend);
      });

      it('should NOT get any message if send empty message', () => {
        const messageToSend = '';

        service.announceAssertive(messageToSend);
        expect(service._appendMessage).toHaveBeenCalled();
        expect(document.getElementById('ib-a11y-announce--assertive').innerText).toEqual(messageToSend);
      });

      it('should NOT get any message if assertive setting was disabled', () => {
        const messageToSend = 'Hello assertive';

        provider.setAssertiveConfig(false);

        service.announceAssertive(messageToSend);
        expect(service._appendMessage).not.toHaveBeenCalled();
      });
    });

    describe('announcePolite()', () => {


      beforeEach(() => {
        spyOn(service, '_appendMessage').and.callThrough();
      });

      it('should get some message', () => {
        const messageToSend = 'Hello polite';

        service.announcePolite(messageToSend);
        expect(service._appendMessage).toHaveBeenCalled();
        expect(document.getElementById('ib-a11y-announce--polite').innerText).toEqual(messageToSend);
      });

      it('should NOT get any message if send empty message', () => {
        const messageToSend = '';

        service.announcePolite(messageToSend);
        expect(service._appendMessage).toHaveBeenCalled();
        expect(document.getElementById('ib-a11y-announce--polite').innerText).toEqual(messageToSend);
      });

      it('should NOT get any message if polite setting was disabled', () => {
        const messageToSend = 'Hello polite';

        provider.setPoliteConfig(false);

        service.announcePolite(messageToSend);
        expect(service._appendMessage).not.toHaveBeenCalled();
      });
    });

  });
});
