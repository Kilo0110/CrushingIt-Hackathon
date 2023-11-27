/**
 Selects the notification button element.
 @type {HTMLElement}
 */
const notificationBtn = document.querySelector('.notification-btn');

/**
 Selects the notification menu element.
 @type {HTMLElement}
 */
const notificationMenu = document.querySelector('.notification-menu');

/**
 Selects the merchant profile button element.
 @type {HTMLElement}
 */
const merchantProfileBtn = document.querySelector('.merchant-profile-btn');

/**
 Selects the merchant menu element.
 @type {HTMLElement}
 */
const merchantMenu = document.querySelector('.merchantmenu');

/**
 Selects the trial prompt element.
 @type {HTMLElement}
 */
const trialPrompt = document.querySelector('.trial-prompt');

/**
 Selects the close prompt button element.
 @type {HTMLElement}
 */
const closePromptBtn = document.querySelector('.close-prompt-btn');

/**
 Selects the guide state toggle element.
 @type {HTMLElement}
 */
const guideStateToggle = document.querySelector('.toggle-guide-open-state');

/**
 Selects the setup guide container element.
 @type {HTMLElement}
 */
const setupGuideContainer = document.querySelector('#setupguide');

/**
 Selects all setup step buttons.
 @type {NodeList}
 */
const setupStepsBtns = document.querySelectorAll('.setup-step-btn');

/**
 Selects all setup step checkboxes.
 @type {NodeList}
 */
const setupStepCheckboxes = document.querySelectorAll(
  'input[name="setup-step"]'
);

/**
 Selects the progress indicator element.
 @type {HTMLElement}
 */
const progressIndicator = document.querySelector('#progress-indicator');

/**
 Selects the completed steps indicator element.
 @type {HTMLElement}
 */
const completedStepsIndicator = document.querySelector('#completed-steps');

// Update the value of the progress indicator with every check or uncheck of the setup steps checkboxes
setupStepCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    if (checkbox.checked === true) {
      const currentProgress = Number(progressIndicator.getAttribute('value'));
      progressIndicator.setAttribute('value', `${currentProgress + 1}`);

      completedStepsIndicator.textContent = `${currentProgress + 1}`;
    } else {
      const currentProgress = Number(progressIndicator.getAttribute('value'));
      progressIndicator.setAttribute('value', `${currentProgress - 1}`);
      completedStepsIndicator.textContent = `${currentProgress - 1}`;
    }
  });
});

/**
 @description Closes the trial prompt.
 */
const closeTrialPrompt = () => {
  trialPrompt.style.display = 'none';
};

/**
 @description Handles keypress events within a tab trap.
 @param {Event} event - The keypress event.
 @param {Element} lastFocusedElement - The last focused element.
 @param {Element} firstTabStop - The first tab stop element in the tab trap.
 @param {Element} lastTabStop - The last tab stop element in the tab trap.
 */
const handleKeyPress = (
  event,
  lastFocusedElement,
  firstTabStop,
  lastTabStop
) => {
  if (event.keyCode === 9 && !event.shiftKey) {
    if (document.activeElement === lastTabStop) {
      event.preventDefault();
      firstTabStop.focus();
    }
  }
  if (event.keyCode === 9 && event.shiftKey) {
    if (document.activeElement === firstTabStop) {
      event.preventDefault();
      lastTabStop.focus();
    }
  }
  if (event.keyCode === 27) {
    lastFocusedElement.focus();
    lastFocusedElement.click();
  }
};

/**
 @description Handles the merchant profile button click event opening the merchant menu and initiating a tab trap
 @returns {void}
 */
const handleMerchantProfileBtnClick = () => {
  let lastFocusedElement;
  let firstTabStop;
  let lastTabStop;

  if (merchantProfileBtn.getAttribute('aria-expanded') === 'true') {
    merchantProfileBtn.setAttribute('aria-expanded', 'false');
  } else {
    merchantProfileBtn.setAttribute('aria-expanded', 'true');
  }

  lastFocusedElement = document.activeElement;
  let focusableMenuItems = merchantMenu.querySelectorAll('a');

  firstTabStop = focusableMenuItems[0];
  lastTabStop = focusableMenuItems[focusableMenuItems.length - 1];

  firstTabStop.focus();

  focusableMenuItems.forEach((item) => {
    item.addEventListener('keyup', (event) =>
      handleKeyPress(event, lastFocusedElement, firstTabStop, lastTabStop)
    );
  });
};

/**
 @description Handles the notification button click event.
 @returns {void}
 */
const handleNotificationBtnClick = () => {
  if (notificationBtn.getAttribute('aria-expanded') === 'true') {
    notificationBtn.setAttribute('aria-expanded', 'false');
  } else {
    notificationBtn.setAttribute('aria-expanded', 'true');
  }
};

/**
 @description Opens the setup step whose control button was clicked. If the step is already open, it does nothing
 @param {Event} ev - The click event.
 @returns {void}
 */
const openSetupStep = (ev) => {
  let currentSetupBtn = ev.target;

  setupStepsBtns.forEach((btn) => {
    if (btn !== currentSetupBtn) {
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  if (currentSetupBtn.getAttribute('aria-expanded') === 'true') {
    return;
  }
  currentSetupBtn.tabIndex = -1;

  currentSetupBtn.setAttribute('aria-expanded', 'true');
  let parentSetup = ev.target.closest('.setup-step');
  let focusableElements = parentSetup.querySelectorAll(
    'input, a, button:not(.setup-step-btn)'
  );

  let lastFocusedElement = currentSetupBtn;
  let firstTabStop = focusableElements[0];
  let lastTabStop = focusableElements[focusableElements.length - 1];

  firstTabStop.focus();
};

/**
 * @description Toggles the visibility of the guide steps accordion
 * @returns {void}
 */
const handleGuideStateToggle = () => {
  if (guideStateToggle.getAttribute('aria-expanded') === 'true') {
    guideStateToggle.setAttribute('aria-expanded', 'false');

    setupStepsBtns.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });
  } else {
    guideStateToggle.setAttribute('aria-expanded', 'true');
  }
};

/**
 * @description Handles the input event for the checkboxes, updating the SVG and opening the next setup step
 * @param {Event} ev
 * @returns {void}
 */
const handleCheckboxInput = (ev) => {
  const checkbox = ev.target;
  const parentSetup = checkbox.closest('.setup-step');
  const parentSetupBtn = parentSetup.querySelector('.setup-step-btn');

  const parentSetupBtnIndex =
    Array.from(setupStepsBtns).indexOf(parentSetupBtn);

  const nextSetupBtnIndex = parentSetupBtnIndex + 1;

  const nextSetupBtn = setupStepsBtns[nextSetupBtnIndex];

  if (checkbox.checked) {
    parentSetupBtn.setAttribute('aria-expanded', 'false');
    nextSetupBtn.click();
  } else {
    return;
  }
};

// Event Listeners
merchantProfileBtn.addEventListener('click', handleMerchantProfileBtnClick);
closePromptBtn.addEventListener('click', closeTrialPrompt);
notificationBtn.addEventListener('click', handleNotificationBtnClick);
guideStateToggle.addEventListener('click', handleGuideStateToggle);
setupStepsBtns.forEach((btn) => {
  btn.addEventListener('click', openSetupStep);
});
setupStepCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('input', (event) => handleCheckboxInput(event));
});
