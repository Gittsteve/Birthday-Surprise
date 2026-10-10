(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const confettiLayer = $('#confetti-layer');
  let currentScene = 0;
  const labels = ['THE BEGINNING', 'LET’S CELEBRATE', 'A LITTLE MYSTERY', 'BIRTHDAY WISHES', 'THE GRAND FINALE'];
  const progressFill = $('#progress-fill');
  const progressLabel = $('#progress-label');
  const toast = $('#toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function confetti(amount = 90) {
    if (!confettiLayer) return;
    const colors = ['#f5cc79', '#fff0bd', '#b9b7ff', '#f39fc8', '#8fe4db', '#ffffff'];
    for (let i = 0; i < amount; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--duration', `${2.2 + Math.random() * 2.4}s`);
      piece.style.setProperty('--drift', `${Math.round(Math.random() * 180 - 90)}px`);
      piece.style.animationDelay = `${Math.random() * .6}s`;
      piece.style.width = `${5 + Math.random() * 6}px`;
      piece.style.height = `${8 + Math.random() * 10}px`;
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), 5200);
    }
  }

  function goToScene(index) {
    const scenes = $$('.rachel-page .scene');
    if (!scenes.length) return;
    currentScene = Math.max(0, Math.min(index, scenes.length - 1));
    scenes.forEach((scene, i) => scene.classList.toggle('active', i === currentScene));
    if (progressFill) progressFill.style.width = `${((currentScene + 1) / scenes.length) * 100}%`;
    if (progressLabel) progressLabel.textContent = labels[currentScene] || 'A LITTLE SURPRISE';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentScene === scenes.length - 1) confetti(65);
  }

  $$('[data-next]').forEach(button => button.addEventListener('click', () => {
    goToScene(Number(button.dataset.next));
    if (Number(button.dataset.next) === 1) confetti(55);
  }));

  const noiseButton = $('#noise-button');
  if (noiseButton) noiseButton.addEventListener('click', () => {
    confetti(150);
    noiseButton.textContent = 'THAT’S MORE LIKE IT! 🎉';
    showToast('Birthday energy: ACTIVATED ✨');
    setTimeout(() => goToScene(2), 950);
  });

  const giftButton = $('#gift-button');
  if (giftButton) giftButton.addEventListener('click', () => {
    if (giftButton.classList.contains('opened')) return;
    giftButton.classList.add('opened');
    confetti(65);
    setTimeout(() => {
      $('#gift-reveal')?.classList.remove('hidden');
      giftButton.querySelector('.gift-hint').textContent = 'GIFT UNLOCKED ✨';
    }, 450);
  });

  const wishCards = $$('.wish-card');
  const finaleButton = $('#finale-button');
  function updateWishes() {
    const count = wishCards.filter(card => card.classList.contains('flipped')).length;
    const hint = $('#wish-hint');
    if (hint) hint.textContent = `${count} of 3 wishes unlocked`;
    if (finaleButton) finaleButton.disabled = count !== 3;
  }
  wishCards.forEach(card => card.addEventListener('click', () => {
    if (!card.classList.contains('flipped')) {
      card.classList.add('flipped');
      confetti(16);
      updateWishes();
      if (wishCards.every(item => item.classList.contains('flipped'))) showToast('All wishes unlocked! Grand finale, here we come. 🎆');
    }
  }));
  if (finaleButton) finaleButton.addEventListener('click', () => goToScene(4));
  const fireworksButton = $('#fireworks-button');
  if (fireworksButton) fireworksButton.addEventListener('click', () => {
    confetti(180);
    showToast('Wishing you another year full of good things! 🎇');
  });
  const replayButton = $('#replay-button');
  if (replayButton) replayButton.addEventListener('click', () => {
    wishCards.forEach(card => card.classList.remove('flipped'));
    updateWishes();
    const gift = $('#gift-button');
    gift?.classList.remove('opened');
    $('#gift-reveal')?.classList.add('hidden');
    if (gift?.querySelector('.gift-hint')) gift.querySelector('.gift-hint').textContent = 'TAP TO OPEN';
    goToScene(0);
  });

  const envelopeButton = $('#envelope-button');
  const lunaLetter = $('#luna-letter');
  if (envelopeButton && lunaLetter) {
    envelopeButton.addEventListener('click', () => {
      if (envelopeButton.classList.contains('open')) return;
      envelopeButton.classList.add('open');
      setTimeout(() => {
        lunaLetter.classList.remove('hidden');
        confetti(40);
        lunaLetter.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 420);
    });
  }
  const lunaSparkles = $('#luna-sparkles');
  if (lunaSparkles) lunaSparkles.addEventListener('click', () => {
    confetti(90);
    showToast('A little extra sparkle, just because. ✨');
  });

  // Keyboard support for the card-like interactive elements.
  $$('.wish-card').forEach(card => {
    card.setAttribute('aria-pressed', 'false');
    card.addEventListener('click', () => card.setAttribute('aria-pressed', 'true'));
  });
})();
