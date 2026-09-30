/**
 * App Controller & Gameplay Engine
 * HCM Ideology Scenario Game - Chặng 1
 */

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    currentStageIndex: 0,
    currentDialogueIndex: 0,
    currentScenarioIndex: 0,
    score: 0,
    isTyping: false,
    typewriterTimeout: null,
    hasAnswered: false,
    selectedOption: null
  };

  const currentStage = GAME_DATA.stages[state.currentStageIndex];
  const currentScenario = currentStage.scenarios[state.currentScenarioIndex];

  // DOM Elements
  const elements = {
    progressFillBar: document.getElementById('progressFillBar'),
    progressText: document.getElementById('progressText'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    restartBtn: document.getElementById('restartBtn'),

    // VN Dialogue
    vnDialogueView: document.getElementById('vnDialogueView'),
    narratorName: document.getElementById('narratorName'),
    narratorImg: document.getElementById('narratorImg'),
    dialogueText: document.getElementById('dialogueText'),
    quoteBox: document.getElementById('quoteBox'),
    quoteText: document.getElementById('quoteText'),
    nextDialogueBtn: document.getElementById('nextDialogueBtn'),
    skipIntroBtn: document.getElementById('skipIntroBtn'),

    // Scenario
    scenarioView: document.getElementById('scenarioView'),
    scenarioIndexBadge: document.getElementById('scenarioIndexBadge'),
    situationQuote: document.getElementById('situationQuote'),
    scenarioQuestionText: document.getElementById('scenarioQuestionText'),
    optionsContainer: document.getElementById('optionsContainer'),

    // Modal
    resultModal: document.getElementById('resultModal'),
    resultStatusBadge: document.getElementById('resultStatusBadge'),
    resultStatusText: document.getElementById('resultStatusText'),
    scoreAwardedBanner: document.getElementById('scoreAwardedBanner'),
    scoreAwardedText: document.getElementById('scoreAwardedText'),
    feedbackDetailText: document.getElementById('feedbackDetailText'),
    ideologyLessonContent: document.getElementById('ideologyLessonContent'),
    retryQuestionBtn: document.getElementById('retryQuestionBtn'),
    proceedBtn: document.getElementById('proceedBtn')
  };

  /* ==========================================================================
     VISUAL NOVEL DIALOGUE ENGINE
     ========================================================================== */
  function typeWriterEffect(text, quote = null, onComplete = null) {
    if (state.typewriterTimeout) clearTimeout(state.typewriterTimeout);
    elements.dialogueText.innerHTML = '';
    elements.quoteBox.style.display = 'none';
    state.isTyping = true;

    let charIndex = 0;
    const speed = 18;

    function typeNextChar() {
      if (charIndex < text.length) {
        elements.dialogueText.innerHTML = text.substring(0, charIndex + 1);
        if (charIndex % 4 === 0) {
          window.soundEngine.playTypeSound();
        }
        charIndex++;
        state.typewriterTimeout = setTimeout(typeNextChar, speed);
      } else {
        elements.dialogueText.innerHTML = text;
        state.isTyping = false;
        
        if (quote) {
          elements.quoteText.textContent = `"${quote}"`;
          elements.quoteBox.style.display = 'block';
        }
        if (onComplete) onComplete();
      }
    }

    typeNextChar();
  }

  function showCurrentDialogue() {
    const dialogueList = currentStage.introDialogue;
    if (state.currentDialogueIndex >= dialogueList.length) {
      transitionToScenario();
      return;
    }

    const currentItem = dialogueList[state.currentDialogueIndex];
    elements.narratorName.textContent = currentItem.speaker;
    typeWriterEffect(currentItem.text, currentItem.quote);

    if (state.currentDialogueIndex === dialogueList.length - 1) {
      elements.nextDialogueBtn.textContent = 'Bắt đầu Tình huống 1';
    } else {
      elements.nextDialogueBtn.textContent = 'Tiếp tục';
    }
  }

  function advanceDialogue() {
    window.soundEngine.playClickSound();

    if (state.isTyping) {
      clearTimeout(state.typewriterTimeout);
      state.isTyping = false;
      const currentItem = currentStage.introDialogue[state.currentDialogueIndex];
      elements.dialogueText.innerHTML = currentItem.text;
      if (currentItem.quote) {
        elements.quoteText.textContent = `"${currentItem.quote}"`;
        elements.quoteBox.style.display = 'block';
      }
      return;
    }

    state.currentDialogueIndex++;
    showCurrentDialogue();
  }

  function skipDialogue() {
    window.soundEngine.playClickSound();
    transitionToScenario();
  }

  /* ==========================================================================
     SCENARIO QUESTION & CHOICES
     ========================================================================== */
  function transitionToScenario() {
    elements.vnDialogueView.style.display = 'none';
    elements.scenarioView.style.display = 'flex';
    renderScenarioQuestion();
  }

  function renderScenarioQuestion() {
    state.hasAnswered = false;
    elements.scenarioIndexBadge.textContent = currentScenario.contextHeader;
    elements.situationQuote.textContent = `"${currentScenario.quoteContext}"`;
    elements.scenarioQuestionText.textContent = currentScenario.question;

    elements.optionsContainer.innerHTML = '';
    currentScenario.options.forEach((opt) => {
      const optionCard = document.createElement('div');
      optionCard.className = 'option-card';
      optionCard.dataset.id = opt.id;

      optionCard.innerHTML = `
        <div class="option-key">${opt.id}</div>
        <div class="option-body-text">${opt.text}</div>
      `;

      optionCard.addEventListener('mouseenter', () => {
        if (!state.hasAnswered) window.soundEngine.playHoverSound();
      });

      optionCard.addEventListener('click', () => {
        handleOptionSelected(opt, optionCard);
      });

      elements.optionsContainer.appendChild(optionCard);
    });

    elements.progressFillBar.style.width = '100%';
    elements.progressText.textContent = `Tình huống 1 / 1`;
  }

  function handleOptionSelected(option, cardElement) {
    if (state.hasAnswered) return;
    state.hasAnswered = true;
    state.selectedOption = option;

    const allCards = elements.optionsContainer.querySelectorAll('.option-card');
    allCards.forEach(c => c.classList.add('disabled'));

    if (option.isCorrect) {
      cardElement.classList.add('correct-answer');
      window.soundEngine.playCorrectSound();
      
      state.score += currentScenario.points;
      updateScoreUI();

      setTimeout(() => {
        showResultModal(true, option);
      }, 500);

    } else {
      cardElement.classList.add('wrong-answer');
      window.soundEngine.playWrongSound();

      allCards.forEach(c => {
        if (c.dataset.id === currentScenario.correctOptionId) {
          c.classList.add('correct-highlight');
        }
      });

      setTimeout(() => {
        showResultModal(false, option);
      }, 500);
    }
  }

  function updateScoreUI() {
    elements.scoreDisplay.textContent = state.score;
  }

  function showResultModal(isCorrect, option) {
    if (isCorrect) {
      elements.resultStatusBadge.className = 'result-status-badge status-correct';
      elements.resultStatusText.textContent = 'CHÍNH XÁC';
      elements.scoreAwardedBanner.className = 'score-awarded-banner plus-score';
      elements.scoreAwardedText.textContent = '+10 ĐIỂM';
      elements.feedbackDetailText.innerHTML = `Chính xác! Bác khẳng định: <em>"Trái lại lúc nào dân ta không đoàn kết thì bị nước ngoài xâm lấn."</em>`;
      elements.retryQuestionBtn.style.display = 'none';
      elements.proceedBtn.textContent = 'Hoàn thành Chặng 1';
    } else {
      elements.resultStatusBadge.className = 'result-status-badge status-wrong';
      elements.resultStatusText.textContent = 'LỰA CHỌN CHƯA ĐÚNG';
      elements.scoreAwardedBanner.className = 'score-awarded-banner zero-score';
      elements.scoreAwardedText.textContent = '+0 ĐIỂM';
      elements.feedbackDetailText.innerHTML = `Lựa chọn chưa đúng. Các đáp án này nói về nhiệm vụ của Đảng, an ninh mạng hoặc đoàn kết quốc tế, trong khi Bác trực tiếp cảnh báo nguy cơ bị nước ngoài xâm lấn khi mất đoàn kết.`;
      elements.retryQuestionBtn.style.display = 'inline-block';
      elements.proceedBtn.textContent = 'Tiếp tục';
    }

    elements.ideologyLessonContent.textContent = currentScenario.coreTakeaway.content;
    elements.resultModal.classList.remove('hidden');
  }

  function hideResultModal() {
    elements.resultModal.classList.add('hidden');
  }

  function retryCurrentScenario() {
    hideResultModal();
    renderScenarioQuestion();
  }

  function restartStage() {
    window.soundEngine.playClickSound();
    hideResultModal();
    state.currentDialogueIndex = 0;
    state.score = 0;
    updateScoreUI();
    elements.scenarioView.style.display = 'none';
    elements.vnDialogueView.style.display = 'flex';
    showCurrentDialogue();
  }

  function completeStageFlow() {
    window.soundEngine.playClickSound();
    hideResultModal();
    
    // Clean stage completion summary
    elements.scenarioView.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div class="tag-ribbon">HOÀN THÀNH CHẶNG 1</div>
        <h2 class="main-stage-heading" style="font-size: 1.6rem; margin: 0.75rem 0 1rem 0;">CHẶNG 1: NHẬN DIỆN SỨC MẠNH CHIẾN LƯỢC</h2>
        <p style="font-size: 1.05rem; color: var(--gold-light); max-width: 650px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
          <em>"Đại đoàn kết toàn dân tộc là vấn đề có ý nghĩa chiến lược, quyết định thành công của cách mạng."</em>
        </p>
        <div style="display: inline-block; background: rgba(0,0,0,0.4); padding: 0.8rem 1.8rem; border-radius: 8px; border: 1px solid var(--border-gold); margin-bottom: 2rem;">
          <span style="font-size: 0.95rem; color: var(--gold-primary); margin-right: 0.5rem;">Kết quả đạt được:</span>
          <span style="font-size: 1.4rem; font-weight: 700; color: #fff;">${state.score} / 10 Điểm</span>
        </div>
        <div>
          <button class="btn-gold" id="replayStageBtn" type="button">Làm lại Chặng 1</button>
        </div>
      </div>
    `;

    document.getElementById('replayStageBtn').addEventListener('click', restartStage);
  }

  /* ==========================================================================
     EVENT LISTENERS
     ========================================================================== */
  elements.nextDialogueBtn.addEventListener('click', advanceDialogue);
  if (elements.skipIntroBtn) {
    elements.skipIntroBtn.addEventListener('click', skipDialogue);
  }
  if (elements.restartBtn) {
    elements.restartBtn.addEventListener('click', restartStage);
  }
  elements.retryQuestionBtn.addEventListener('click', retryCurrentScenario);
  elements.proceedBtn.addEventListener('click', completeStageFlow);

  // Sound Toggle
  elements.soundToggleBtn.addEventListener('click', () => {
    const isMuted = window.soundEngine.toggleMute();
    elements.soundToggleBtn.textContent = isMuted ? 'Âm thanh: Tắt' : 'Âm thanh: Bật';
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (!elements.resultModal.classList.contains('hidden')) {
      if (e.key === 'Enter') {
        if (state.selectedOption && state.selectedOption.isCorrect) {
          completeStageFlow();
        } else {
          retryCurrentScenario();
        }
      }
      return;
    }

    if (elements.vnDialogueView.style.display !== 'none') {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        advanceDialogue();
      }
      return;
    }

    if (elements.scenarioView.style.display !== 'none' && !state.hasAnswered) {
      const keyMap = {
        'a': 'A', 'A': 'A', '1': 'A',
        'b': 'B', 'B': 'B', '2': 'B',
        'c': 'C', 'C': 'C', '3': 'C',
        'd': 'D', 'D': 'D', '4': 'D'
      };
      const optId = keyMap[e.key];
      if (optId) {
        const optionObj = currentScenario.options.find(o => o.id === optId);
        const cardElem = elements.optionsContainer.querySelector(`.option-card[data-id="${optId}"]`);
        if (optionObj && cardElem) {
          handleOptionSelected(optionObj, cardElem);
        }
      }
    }
  });

  // Start Intro Dialogue
  showCurrentDialogue();
});
