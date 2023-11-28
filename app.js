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
 @param {NodeList} itemList - NodeList of elements in the tab trap.
 */
const handleKeyPress = (event, lastFocusedElement, itemList) => {
  const listLength = itemList.length;
  const firstTabStopIndex = 0;
  const lastTabStopIndex = listLength - 1;

  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  let currentActiveIndex = Array.from(itemList).indexOf(document.activeElement);

  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      // Do something for "down arrow" or "right arrow" key press.
      if (currentActiveIndex === lastTabStopIndex) {
        itemList[firstTabStopIndex].focus();
      } else {
        itemList[currentActiveIndex + 1].focus();
      }
      break;

    case 'ArrowUp':
    case 'ArrowLeft':
      // Do something for "up arrow" or "left arrow" key press.
      if (currentActiveIndex === firstTabStopIndex) {
        itemList[lastTabStopIndex].focus();
      } else {
        itemList[currentActiveIndex - 1].focus();
      }
      break;

    case 'Escape':
      lastFocusedElement.focus();
      break;

    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
};

/**
 @description Handles the merchant profile button click event opening the merchant menu and initiating a tab trap
 @returns {void}
 */
const handleMerchantProfileBtnClick = () => {
  if (merchantProfileBtn.getAttribute('aria-expanded') === 'true') {
    merchantProfileBtn.setAttribute('aria-expanded', 'false');
  } else {
    merchantProfileBtn.setAttribute('aria-expanded', 'true');
  }

  let lastFocusedElement = document.activeElement;
  let focusableMenuItems = merchantMenu.querySelectorAll('a');

  let firstTabStop = focusableMenuItems[0];
  firstTabStop.focus();

  focusableMenuItems.forEach((item) => {
    item.addEventListener('keyup', (event) =>
      handleKeyPress(event, lastFocusedElement, focusableMenuItems)
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

  firstTabStop.focus();

  focusableElements.forEach((item) => {
    item.addEventListener('keyup', (event) =>
      handleKeyPress(event, lastFocusedElement, focusableElements)
    );
  });
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
  const parentCheckBoxContainer = checkbox.closest('.checkbox-container');
  const loadingSVG = parentCheckBoxContainer.querySelector('.loading-svg');

  const parentSetupBtnIndex =
    Array.from(setupStepsBtns).indexOf(parentSetupBtn);

  const nextSetupBtnIndex = parentSetupBtnIndex + 1;

  const nextSetupBtn = setupStepsBtns[nextSetupBtnIndex];

  if (checkbox.checked) {
    parentCheckBoxContainer.classList.add('loading');
    setTimeout(() => {
      loadingSVG.style.display = 'none';
      parentCheckBoxContainer.classList.remove('loading');
      parentSetupBtn.setAttribute('aria-expanded', 'false');
      nextSetupBtn.click();
    }, 2000);
  } else {
    return;
  }
};

/**
 *@description Utility function to use the View Transition API to fade UI elements in or out using the browser
 * @param {Function} callback function to run
 * @returns {void}
 */
const useViewTransition = (callback) => {
  if (!document.startViewTransition()) {
    callback();
  }

  document.startViewTransition(() => {
    callback();
  });
};

// Event Listeners
merchantProfileBtn.addEventListener('click', () => {
  useViewTransition(handleMerchantProfileBtnClick);
});
closePromptBtn.addEventListener('click', () => {
  useViewTransition(closeTrialPrompt);
});
notificationBtn.addEventListener('click', () => {
  useViewTransition(handleNotificationBtnClick);
});
guideStateToggle.addEventListener('click', () => {
  useViewTransition(handleGuideStateToggle);
});
setupStepsBtns.forEach((btn) => {
  btn.addEventListener('click', openSetupStep);
});
setupStepCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('input', (event) => handleCheckboxInput(event));
});
