// Your javascript goes here
const merchantProfileBtn = document.querySelector('.merchant-profile-btn');

const trialPrompt = document.querySelector('.trial-prompt');

const closePromptBtn = document.querySelector('.close-prompt-btn');

const closeTrialPrompt = () => {
  trialPrompt.style.display = 'none';
};

const handleMerchantBtn = () => {};

merchantProfileBtn.addEventListener('click', handleMerchantBtn);

closePromptBtn.addEventListener('click', closeTrialPrompt);
