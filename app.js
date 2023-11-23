// Your javascript goes here
const merchantProfileBtn = document.querySelector('.merchant-profile-btn');

const merchantMenu = document.querySelector('.merchantmenu');

const trialPrompt = document.querySelector('.trial-prompt');

const closePromptBtn = document.querySelector('.close-prompt-btn');

const setupStepCheckboxes = document.querySelectorAll(
  'input[name="setup-step"]'
);

const progressIndicator = document.querySelector('#progress-indicator');

const completedStepsIndicator = document.querySelector('#completed-steps');

setupStepCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
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

const closeTrialPrompt = () => {
  trialPrompt.style.display = 'none';
};

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

const handleMerchantBtn = () => {
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

merchantProfileBtn.addEventListener('click', handleMerchantBtn);

closePromptBtn.addEventListener('click', closeTrialPrompt);
