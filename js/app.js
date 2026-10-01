/**
 * App Controller & Gameplay Engine
 * HCM Ideology Scenario Game - Chặng 1 & Chặng 2 (Kiểm duyệt & Ứng xử số)
 */

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    currentStageIndex: 0,
    currentDialogueIndex: 0,
    currentScenarioIndex: 0,
    scenarioMistakes: 0,
    score: 0,
    isTyping: false,
    typewriterTimeout: null,
    hasAnswered: false,
    selectedOption: null
  };

  function getCurrentStage() {
    return GAME_DATA.stages[state.currentStageIndex];
  }

  function getCurrentScenario() {
    return getCurrentStage().scenarios[state.currentScenarioIndex];
  }

  function getScenarioCurrentValue() {
    const currentScenario = getCurrentScenario();
    // Chặng 2 (Kiểm duyệt & Ứng xử số - 2 nút hành động): Sai 1 lần thì lần sau nhận 0đ
    if (state.currentStageIndex === 1 || (currentScenario && currentScenario.isSocialModeration)) {
      if (state.scenarioMistakes === 0) return 10;
      return 0;
    }

    // Chặng 1 (Trắc nghiệm 4 đáp án A-B-C-D): Đúng lần 1 = 10đ, đúng lần 2 = 5đ, từ lần 3 = 0đ
    if (state.scenarioMistakes === 0) return 10;
    if (state.scenarioMistakes === 1) return 5;
    return 0;
  }

  function updateScenarioPointsPill() {
    if (elements.scenarioPointsPill) {
      const val = getScenarioCurrentValue();
      elements.scenarioPointsPill.textContent = `+${val} Điểm`;
    }
  }

  // DOM Elements
  const elements = {
    chapterHeroBadge: document.getElementById('chapterHeroBadge'),
    mainStageHeading: document.getElementById('mainStageHeading'),
    mainStageRibbon: document.getElementById('mainStageRibbon'),
    progressFillBar: document.getElementById('progressFillBar'),
    progressText: document.getElementById('progressText'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    restartBtn: document.getElementById('restartBtn'),

    // VN Dialogue
    vnDialogueView: document.getElementById('vnDialogueView'),
    narratorName: document.getElementById('narratorName'),
    narratorRole: document.getElementById('narratorRole'),
    narratorImg: document.getElementById('narratorImg'),
    dialogueText: document.getElementById('dialogueText'),
    quoteBox: document.getElementById('quoteBox'),
    quoteText: document.getElementById('quoteText'),
    nextDialogueBtn: document.getElementById('nextDialogueBtn'),
    skipIntroBtn: document.getElementById('skipIntroBtn'),

    // Scenario
    scenarioView: document.getElementById('scenarioView'),
    scenarioIndexBadge: document.getElementById('scenarioIndexBadge'),
    scenarioPointsPill: document.getElementById('scenarioPointsPill'),
    situationQuoteBanner: document.getElementById('situationQuoteBanner'),
    situationQuote: document.getElementById('situationQuote'),
    scenarioQuestionText: document.getElementById('scenarioQuestionText'),
    optionsContainer: document.getElementById('optionsContainer'),

    // Completion / Summary View
    completionView: document.getElementById('completionView'),
    balanceStageView: document.getElementById('balanceStageView'),
    goldMinerStageView: document.getElementById('goldMinerStageView'),
    networkStageView: document.getElementById('networkStageView'),

    // Modal
    resultModal: document.getElementById('resultModal'),
    resultStatusBadge: document.getElementById('resultStatusBadge'),
    resultStatusIcon: document.getElementById('resultStatusIcon'),
    resultStatusText: document.getElementById('resultStatusText'),
    scoreAwardedBanner: document.getElementById('scoreAwardedBanner'),
    scoreAwardedText: document.getElementById('scoreAwardedText'),
    correctAnswerReveal: document.getElementById('correctAnswerReveal'),
    revealCorrectText: document.getElementById('revealCorrectText'),
    feedbackQuoteTag: document.getElementById('feedbackQuoteTag'),
    feedbackQuoteText: document.getElementById('feedbackQuoteText'),
    feedbackTakeawayText: document.getElementById('feedbackTakeawayText'),
    retryQuestionBtn: document.getElementById('retryQuestionBtn'),
    proceedBtn: document.getElementById('proceedBtn')
  };

  /* ==========================================================================
     BALANCE STAGE (STAGE 3) STATE
     ========================================================================== */
  const balanceState = {
    placedCards: { XAY: [], CHONG: [] },
    unplacedCards: [],
    failedCardIds: new Set(),
    stageEarnedScore: 0,
    selectedCardId: null,
    isCompleted: false
  };

  /* ==========================================================================
     VISUAL NOVEL DIALOGUE ENGINE
     ========================================================================== */
  function typeWriterEffect(text, quote = null, onComplete = null) {
    if (state.typewriterTimeout) clearTimeout(state.typewriterTimeout);
    elements.dialogueText.innerHTML = '';
    elements.quoteBox.style.display = 'none';
    elements.quoteBox.classList.remove('quote-visible');
    elements.quoteText.textContent = '';
    state.isTyping = true;

    let charIndex = 0;
    const speed = 22;

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

        if (quote) {
          // Pause slightly before revealing quote smoothly
          state.typewriterTimeout = setTimeout(() => {
            elements.quoteBox.style.display = 'block';
            requestAnimationFrame(() => {
              elements.quoteBox.classList.add('quote-visible');
            });

            // Smoothly type out the quote text
            let quoteCharIndex = 0;
            const fullQuote = `"${quote}"`;
            const quoteSpeed = 20;

            function typeQuoteChar() {
              if (quoteCharIndex < fullQuote.length) {
                elements.quoteText.textContent = fullQuote.substring(0, quoteCharIndex + 1);
                if (quoteCharIndex % 5 === 0) {
                  window.soundEngine.playTypeSound();
                }
                quoteCharIndex++;
                state.typewriterTimeout = setTimeout(typeQuoteChar, quoteSpeed);
              } else {
                elements.quoteText.textContent = fullQuote;
                state.isTyping = false;
                if (onComplete) onComplete();
              }
            }

            typeQuoteChar();
          }, 320);
        } else {
          state.isTyping = false;
          if (onComplete) onComplete();
        }
      }
    }

    typeNextChar();
  }

  function updateStageHeaderUI() {
    const stage = getCurrentStage();
    if (elements.chapterHeroBadge) {
      elements.chapterHeroBadge.style.display = 'block';
    }
    if (elements.mainStageHeading) {
      elements.mainStageHeading.textContent = stage.title;
    }
    if (elements.mainStageRibbon) {
      elements.mainStageRibbon.textContent = stage.badge ? `BÀI TẬP TÌNH HUỐNG: ${stage.badge.toUpperCase()}` : 'BÀI TẬP TÌNH HUỐNG LÝ LUẬN & LỊCH SỬ';
    }
    document.title = `Tư Tưởng Hồ Chí Minh - ${stage.title}`;

    if (stage.narrator && elements.narratorRole) {
      elements.narratorRole.textContent = stage.narrator.title || 'Lời dẫn lý luận';
    }
  }

  function showCurrentDialogue() {
    const stage = getCurrentStage();
    updateStageHeaderUI();
    const dialogueList = stage.introDialogue;
    if (state.currentDialogueIndex >= dialogueList.length) {
      transitionToScenario();
      return;
    }

    const currentItem = dialogueList[state.currentDialogueIndex];
    elements.narratorName.textContent = 'Tư tưởng Hồ Chí Minh';
    typeWriterEffect(currentItem.text, currentItem.quote);

    if (state.currentDialogueIndex === dialogueList.length - 1) {
      elements.nextDialogueBtn.textContent = `Bắt đầu CHẶNG ${state.currentStageIndex + 1}`;
    } else {
      elements.nextDialogueBtn.textContent = 'Tiếp tục';
    }
  }

  function advanceDialogue() {
    window.soundEngine.playClickSound();

    const stage = getCurrentStage();
    if (state.isTyping) {
      clearTimeout(state.typewriterTimeout);
      state.isTyping = false;
      const currentItem = stage.introDialogue[state.currentDialogueIndex];
      elements.dialogueText.innerHTML = currentItem.text;
      if (currentItem.quote) {
        elements.quoteText.textContent = `"${currentItem.quote}"`;
        elements.quoteBox.style.display = 'block';
        elements.quoteBox.classList.add('quote-visible');
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
    if (elements.completionView) elements.completionView.style.display = 'none';

    const stage = getCurrentStage();
    if (stage.isNetworkStage) {
      if (elements.scenarioView) elements.scenarioView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
      if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
      if (elements.networkStageView) {
        elements.networkStageView.style.display = 'flex';
        initNetworkStage();
      }
    } else if (stage.isBalanceStage) {
      if (elements.scenarioView) elements.scenarioView.style.display = 'none';
      if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
      if (elements.networkStageView) elements.networkStageView.style.display = 'none';
      if (elements.balanceStageView) {
        elements.balanceStageView.style.display = 'flex';
        initBalanceStage();
      }
    } else if (stage.isGoldMinerStage) {
      if (elements.scenarioView) elements.scenarioView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
      if (elements.networkStageView) elements.networkStageView.style.display = 'none';
      if (elements.goldMinerStageView) {
        elements.goldMinerStageView.style.display = 'flex';
        initGoldMinerStage();
      }
    } else {
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
      if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
      if (elements.networkStageView) elements.networkStageView.style.display = 'none';
      elements.scenarioView.style.display = 'flex';
      renderScenarioQuestion();
    }
  }

  function renderScenarioQuestion() {
    state.hasAnswered = false;
    const stage = getCurrentStage();
    const currentScenario = getCurrentScenario();

    updateStageHeaderUI();
    elements.scenarioIndexBadge.textContent = currentScenario.contextHeader;
    updateScenarioPointsPill();
    elements.scenarioQuestionText.textContent = currentScenario.question;

    elements.optionsContainer.innerHTML = '';

    // TEMPLATE 1: STAGE 2 - KIỂM DUYỆT & ỨNG XỬ SỐ (BÀI ĐĂNG MXH + 2 NÚT HÀNH ĐỘNG)
    if (currentScenario.isSocialModeration) {
      if (elements.situationQuoteBanner) {
        if (currentScenario.postImage) {
          elements.situationQuoteBanner.style.display = 'flex';
          elements.situationQuoteBanner.className = 'social-post-image-frame';
          elements.situationQuoteBanner.innerHTML = `
            <img src="${currentScenario.postImage}" alt="${currentScenario.title}" class="social-post-img" />
          `;
        } else {
          elements.situationQuoteBanner.style.display = 'block';
          elements.situationQuoteBanner.className = 'social-feed-post';
          elements.situationQuoteBanner.innerHTML = `
            <div class="social-feed-header">
              <div class="social-author-info">
                <div class="social-avatar-badge">${currentScenario.postAuthor.avatar || '👤'}</div>
                <div class="social-author-meta">
                  <span class="social-author-handle">${currentScenario.postAuthor.handle}</span>
                  <span class="social-author-tag">${currentScenario.postAuthor.badge || currentScenario.postAuthor.name}</span>
                </div>
              </div>
              <span class="social-network-badge">🌐 Mạng Xã Hội</span>
            </div>
            <div class="social-post-content">
              "${currentScenario.postContent}"
            </div>
          `;
        }
      }

      // Render 2 nút bấm hành động lớn
      elements.optionsContainer.className = 'moderation-buttons-grid';
      currentScenario.options.forEach((opt) => {
        const btn = document.createElement('div');
        const isTolerate = opt.type === 'tolerate';
        btn.className = `moderation-btn ${isTolerate ? 'btn-tolerate' : 'btn-enforce'}`;
        btn.dataset.id = opt.id;

        btn.innerHTML = `
          <div class="mod-content">
            <div class="mod-title">${opt.title}</div>
            <div class="mod-desc">${opt.desc}</div>
          </div>
        `;

        btn.addEventListener('mouseenter', () => {
          if (!state.hasAnswered) window.soundEngine.playHoverSound();
        });

        btn.addEventListener('click', () => {
          handleOptionSelected(opt, btn);
        });

        elements.optionsContainer.appendChild(btn);
      });

    } else {
      // TEMPLATE 2: STAGE 1 - TRẮC NGHIỆM CHIẾN LƯỢC TRUYỀN THỐNG (A-B-C-D)
      if (elements.situationQuoteBanner) {
        elements.situationQuoteBanner.style.display = 'block';
        elements.situationQuoteBanner.className = 'situation-quote-banner';
        elements.situationQuoteBanner.innerHTML = `
          <div class="situation-quote-label">Lời dạy của Chủ tịch Hồ Chí Minh:</div>
          <div class="quote-text-statement" id="situationQuote">"${currentScenario.quoteContext}"</div>
        `;
      }

      elements.optionsContainer.className = 'options-grid';
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
    }

    if (elements.progressFillBar) {
      const progressPercent = ((state.currentScenarioIndex + 1) / stage.scenarios.length) * 100;
      elements.progressFillBar.style.width = `${progressPercent}%`;
    }
    if (elements.progressText) {
      elements.progressText.textContent = `Tình huống ${state.currentScenarioIndex + 1} / ${stage.scenarios.length}`;
    }
  }

  function handleOptionSelected(option, cardElement) {
    if (state.hasAnswered) return;
    state.hasAnswered = true;
    state.selectedOption = option;

    const allButtons = elements.optionsContainer.querySelectorAll('.option-card, .moderation-btn');
    allButtons.forEach(c => c.classList.add('disabled'));

    if (option.isCorrect) {
      cardElement.classList.add('correct-answer');
      window.soundEngine.playCorrectSound();

      const earnedPoints = getScenarioCurrentValue();
      state.score += earnedPoints;
      updateScoreUI();

      setTimeout(() => {
        showResultModal(true, option, earnedPoints);
      }, 400);

    } else {
      cardElement.classList.add('wrong-answer');
      window.soundEngine.playWrongSound();

      state.scenarioMistakes++;
      updateScenarioPointsPill();

      setTimeout(() => {
        showResultModal(false, option, 0);
      }, 400);
    }
  }

  function updateScoreUI() {
    if (elements.scoreDisplay) {
      elements.scoreDisplay.textContent = state.score;
    }
  }

  function showResultModal(isCorrect, option, earnedPoints = 0) {
    const stage = getCurrentStage();
    const currentScenario = getCurrentScenario();

    if (isCorrect) {
      elements.resultStatusBadge.className = 'result-status-badge status-correct';
      if (elements.resultStatusIcon) elements.resultStatusIcon.textContent = '✓';
      elements.resultStatusText.textContent = 'CHÍNH XÁC';
      if (elements.scoreAwardedBanner) elements.scoreAwardedBanner.style.display = 'none';
      if (elements.correctAnswerReveal) elements.correctAnswerReveal.style.display = 'none';
      if (elements.feedbackQuoteTag) elements.feedbackQuoteTag.textContent = 'LỜI BÁC DẠY / BÀI HỌC';
      if (elements.feedbackQuoteText) {
        elements.feedbackQuoteText.textContent = `"${currentScenario.quoteLesson}"`;
      }
      if (elements.feedbackTakeawayText) {
        elements.feedbackTakeawayText.style.display = 'block';
        elements.feedbackTakeawayText.textContent = option.feedbackCorrect || currentScenario.coreTakeaway;
      }
      elements.retryQuestionBtn.style.display = 'none';
      elements.proceedBtn.style.display = 'inline-block';

      // Nút điều hướng sang tình huống tiếp theo hoặc hoàn thành chặng
      if (state.currentScenarioIndex < stage.scenarios.length - 1) {
        elements.proceedBtn.textContent = `Tình huống ${state.currentScenarioIndex + 2}`;
      } else {
        elements.proceedBtn.textContent = `Hoàn thành CHẶNG ${state.currentStageIndex + 1}`;
      }

    } else {
      elements.resultStatusBadge.className = 'result-status-badge status-wrong';
      if (elements.resultStatusIcon) elements.resultStatusIcon.textContent = '✕';
      elements.resultStatusText.textContent = 'CHƯA CHÍNH XÁC';
      if (elements.scoreAwardedBanner) elements.scoreAwardedBanner.style.display = 'none';

      if (elements.correctAnswerReveal) {
        elements.correctAnswerReveal.style.display = 'none';
      }
      if (elements.feedbackQuoteTag) elements.feedbackQuoteTag.textContent = 'GỢI Ý TƯ DUY';
      if (elements.feedbackQuoteText) {
        elements.feedbackQuoteText.textContent = `"${option.feedbackWrong || currentScenario.hintText || 'Hãy đọc kỹ lại đối tượng phát ngôn để chọn hành động ứng xử đúng đắn nhất!'}"`;
      }
      if (elements.feedbackTakeawayText) {
        elements.feedbackTakeawayText.textContent = '';
        elements.feedbackTakeawayText.style.display = 'none';
      }
      elements.retryQuestionBtn.className = 'btn-gold';
      elements.retryQuestionBtn.textContent = 'Chọn lại';
      elements.retryQuestionBtn.style.display = 'inline-block';
      elements.proceedBtn.style.display = 'none';
    }

    elements.resultModal.classList.remove('hidden');
  }

  function hideResultModal() {
    elements.resultModal.classList.add('hidden');
  }

  function retryCurrentScenario() {
    hideResultModal();
    const stage = getCurrentStage();
    if (stage.isNetworkStage) {
      renderNetworkScenario();
    } else if (stage.isGoldMinerStage) {
      renderGoldMinerScenario();
    } else {
      renderScenarioQuestion();
    }
  }

  /* ==========================================================================
     STAGE 3: CÁN CÂN CHIẾN LƯỢC "XÂY" VÀ "CHỐNG" ENGINE
     ========================================================================== */
  function initBalanceStage() {
    updateStageHeaderUI();
    const stage = getCurrentStage();
    balanceState.placedCards = { XAY: [], CHONG: [] };
    balanceState.unplacedCards = [...stage.balanceGame.cards].sort(() => Math.random() - 0.5);
    balanceState.failedCardIds = new Set();
    balanceState.stageEarnedScore = 0;
    balanceState.selectedCardId = null;
    balanceState.isCompleted = false;

    renderBalanceStageUI();
  }

  function showBalanceToast(message, isSuccess = true) {
    const existing = document.querySelector('.balance-toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'balance-toast-notification';
    toast.style.borderColor = isSuccess ? 'var(--gold-primary)' : '#ef4444';
    toast.innerHTML = `
      <span style="font-size: 1.15rem;">${isSuccess ? '✨' : '⚠️'}</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 3200);
  }

  function renderBalanceStageUI() {
    const stage = getCurrentStage();
    const totalPlaced = balanceState.placedCards.XAY.length + balanceState.placedCards.CHONG.length;
    const isAllPlaced = totalPlaced === stage.balanceGame.cards.length;

    const xayCapacity = stage.balanceGame?.zones?.find(z => z.id === 'XAY')?.capacity || 5;
    const chongCapacity = stage.balanceGame?.zones?.find(z => z.id === 'CHONG')?.capacity || 5;

    // Calculate crossbeam rotation angle (tinh tế, không bị vểnh chèn tiêu đề)
    const diff = balanceState.placedCards.CHONG.length - balanceState.placedCards.XAY.length;
    const tiltDeg = isAllPlaced ? 0 : Math.max(-7, Math.min(7, diff * 1.5));

    elements.balanceStageView.innerHTML = `
      <!-- Scale Apparatus -->
      <div class="scale-apparatus-container" id="scaleApparatus">
        <div class="scale-fulcrum-stand"></div>
        <div class="scale-crossbeam-bar ${isAllPlaced ? 'balanced-state' : ''}" id="scaleCrossbeam" style="transform: rotate(${tiltDeg}deg);"></div>
        <div class="scale-center-pivot">⚖️</div>

        <!-- Two Plates Drop Zones -->
        <div class="scale-plates-grid">
          <!-- Left Plate: XÂY -->
          <div class="scale-plate-zone zone-xay" id="plateZoneXay" data-zone="XAY">
            <div class="plate-zone-header">
              <div class="plate-zone-title">XÂY <span style="font-size: 0.8rem; font-weight: normal; opacity: 0.9;">(Phủ xanh MXH)</span></div>
              <span class="plate-capacity-badge">${balanceState.placedCards.XAY.length} / ${xayCapacity} Thẻ</span>
            </div>
            <div class="plate-slotted-list" id="slottedListXay">
              ${balanceState.placedCards.XAY.length > 0 ? balanceState.placedCards.XAY.map(card => `
                <div class="slotted-card-item">
                  <div class="slotted-item-header">THẺ ${card.num}: XÂY DỰNG</div>
                  <div>${card.text}</div>
                </div>
              `).join('') : '<div class="empty-slot-placeholder">Thả thẻ hành vi "XÂY" vào đây</div>'}
            </div>
          </div>

          <!-- Right Plate: CHỐNG -->
          <div class="scale-plate-zone zone-chong" id="plateZoneChong" data-zone="CHONG">
            <div class="plate-zone-header">
              <div class="plate-zone-title">CHỐNG <span style="font-size: 0.8rem; font-weight: normal; opacity: 0.9;">(Triệt phá độc hại)</span></div>
              <span class="plate-capacity-badge">${balanceState.placedCards.CHONG.length} / ${chongCapacity} Thẻ</span>
            </div>
            <div class="plate-slotted-list" id="slottedListChong">
              ${balanceState.placedCards.CHONG.length > 0 ? balanceState.placedCards.CHONG.map(card => `
                <div class="slotted-card-item">
                  <div class="slotted-item-header">THẺ ${card.num}: ĐẤU TRANH CHỐNG</div>
                  <div>${card.text}</div>
                </div>
              `).join('') : '<div class="empty-slot-placeholder">Thả thẻ hành vi "CHỐNG" vào đây</div>'}
            </div>
          </div>
        </div>
      </div>

      <!-- Card Pool Section -->
      <div class="card-pool-section">
        <div class="card-pool-label">
          <span>KHO THẺ HÀNH VI</span>
        </div>

        <div class="card-deck-grid" id="cardDeckGrid">
          ${balanceState.unplacedCards.length > 0 ? balanceState.unplacedCards.map(card => `
            <div class="action-token-card ${balanceState.selectedCardId === card.id ? 'selected-for-drop' : ''}" 
                 draggable="true" 
                 id="cardItem_${card.id}" 
                 data-card-id="${card.id}">
              <div class="token-card-tag">THẺ HÀNH VI ${card.num}</div>
              <div class="token-card-text">"${card.text}"</div>
            </div>
          `).join('') : ''}
        </div>
      </div>
    `;

    // Attach Drag & Drop + Click Events
    setupBalanceInteractions();

    // Check completion condition
    if (isAllPlaced && !balanceState.isCompleted) {
      balanceState.isCompleted = true;
      setTimeout(() => {
        showBalanceVictoryModal();
      }, 700);
    }
  }

  function setupBalanceInteractions() {
    const cardElements = elements.balanceStageView.querySelectorAll('.action-token-card');
    const plateXay = elements.balanceStageView.querySelector('#plateZoneXay');
    const plateChong = elements.balanceStageView.querySelector('#plateZoneChong');

    // Drag Events on Cards
    cardElements.forEach(cardElem => {
      const cardId = cardElem.dataset.cardId;

      cardElem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', cardId);
        cardElem.classList.add('dragging');
      });

      cardElem.addEventListener('dragend', () => {
        cardElem.classList.remove('dragging');
      });

      // Click-to-select fallback
      cardElem.addEventListener('click', () => {
        window.soundEngine.playClickSound();
        if (balanceState.selectedCardId === cardId) {
          balanceState.selectedCardId = null;
        } else {
          balanceState.selectedCardId = cardId;
        }
        renderBalanceStageUI();
      });
    });

    // Drop Events on Plates
    [plateXay, plateChong].forEach(plate => {
      if (!plate) return;
      const targetZoneId = plate.dataset.zone;

      plate.addEventListener('dragover', (e) => {
        e.preventDefault();
        plate.classList.add('drag-over');
      });

      plate.addEventListener('dragleave', () => {
        plate.classList.remove('drag-over');
      });

      plate.addEventListener('drop', (e) => {
        e.preventDefault();
        plate.classList.remove('drag-over');
        const cardId = e.dataTransfer.getData('text/plain');
        if (cardId) {
          handleDropCard(cardId, targetZoneId);
        }
      });

      // Click on plate to place selected card
      plate.addEventListener('click', () => {
        if (balanceState.selectedCardId) {
          handleDropCard(balanceState.selectedCardId, targetZoneId);
        }
      });
    });
  }

  function handleDropCard(cardId, targetZoneId) {
    const stage = getCurrentStage();
    const card = stage.balanceGame.cards.find(c => c.id === cardId);
    if (!card) return;

    const cardElement = document.getElementById(`cardItem_${cardId}`);

    // If already at full capacity in target plate
    const targetCapacity = stage.balanceGame?.zones?.find(z => z.id === targetZoneId)?.capacity || 5;
    if (balanceState.placedCards[targetZoneId].length >= targetCapacity) {
      window.soundEngine.playWrongSound();
      return;
    }

    if (card.targetZone === targetZoneId) {
      // CORRECT PLACEMENT
      window.soundEngine.playCorrectSound();

      const isFirstAttempt = !balanceState.failedCardIds.has(cardId);
      const pointsAwarded = isFirstAttempt ? (stage.balanceGame.pointsPerCard || 10) : 0;

      state.score += pointsAwarded;
      balanceState.stageEarnedScore += pointsAwarded;
      updateScoreUI();

      balanceState.placedCards[targetZoneId].push(card);
      balanceState.unplacedCards = balanceState.unplacedCards.filter(c => c.id !== cardId);
      balanceState.selectedCardId = null;

      renderBalanceStageUI();

    } else {
      // INCORRECT PLACEMENT - Shakes and pops back
      window.soundEngine.playWrongSound();
      balanceState.failedCardIds.add(cardId);
      if (cardElement) {
        cardElement.classList.add('card-shake-error');
        setTimeout(() => {
          if (cardElement) cardElement.classList.remove('card-shake-error');
        }, 500);
      }
    }
  }

  function showBalanceVictoryModal() {
    window.soundEngine.playCorrectSound();

    elements.resultStatusBadge.className = 'result-status-badge status-correct';
    if (elements.resultStatusIcon) elements.resultStatusIcon.textContent = '✓';
    elements.resultStatusText.textContent = 'CHÍNH XÁC';
    if (elements.scoreAwardedBanner) elements.scoreAwardedBanner.style.display = 'none';
    if (elements.correctAnswerReveal) elements.correctAnswerReveal.style.display = 'none';
    if (elements.feedbackQuoteTag) elements.feedbackQuoteTag.textContent = 'LỜI BÁC DẠY / BÀI HỌC';
    if (elements.feedbackQuoteText) {
      elements.feedbackQuoteText.textContent = '"Muốn đoàn kết chặt chẽ thì phải xây dựng cái tốt, bồi đắp tình thân ái; đồng thời phải kiên quyết đấu tranh trừ tiệt những thói xấu chia rẽ."';
    }
    if (elements.feedbackTakeawayText) {
      elements.feedbackTakeawayText.style.display = 'block';
      elements.feedbackTakeawayText.textContent = 'Chính xác! Bạn đã phân định và giữ vững cán cân chiến lược giữa hai mũi giáp công "XÂY" (phủ xanh điều tốt) và "CHỐNG" (triệt phá độc hại) trên không gian số.';
    }
    elements.retryQuestionBtn.style.display = 'none';
    elements.proceedBtn.style.display = 'inline-block';
    elements.proceedBtn.textContent = 'Hoàn thành CHẶNG 3';

    elements.resultModal.classList.remove('hidden');
  }

  /* ==========================================================================
     STAGE 4: HẢI TRÌNH ĐÀO VÀNG - NGOẠI GIAO NHÂN DÂN SỐ ENGINE
     ========================================================================== */
  const goldMinerState = {
    canvas: null,
    ctx: null,
    animationFrameId: null,
    timerInterval: null,
    timeLeft: 60,
    hookAngle: 0,
    hookAngleSpeed: 0.026,
    hookMinAngle: -1.22,
    hookMaxAngle: 1.22,
    hookDir: 1,
    hookOrigin: { x: 0, y: 24 },
    hookLength: 30,
    hookMinLength: 30,
    hookMaxLength: 540,
    hookSpeed: 12.5,
    hookRetractSpeed: 9.5,
    hookState: 'IDLE', // 'IDLE' | 'SHOOTING' | 'RETRACTING'
    caughtTarget: null,
    targets: [],
    scenarioFailedAttempts: 0,
    scenarioAnswered: false,
    particles: []
  };

  function initGoldMinerStage() {
    state.currentScenarioIndex = 0;
    renderGoldMinerScenario();
  }

  function renderGoldMinerScenario() {
    stopGoldMinerGame();
    updateStageHeaderUI();
    const stage = getCurrentStage();
    const currentScenario = getCurrentScenario();

    goldMinerState.scenarioAnswered = false;
    goldMinerState.scenarioFailedAttempts = 0;
    goldMinerState.hookState = 'IDLE';
    goldMinerState.hookLength = goldMinerState.hookMinLength;
    goldMinerState.caughtTarget = null;
    goldMinerState.particles = [];

    elements.goldMinerStageView.innerHTML = `
      <div class="miner-header-bar">
        <div>
          <span class="scenario-tag">${currentScenario.contextHeader} (${state.currentScenarioIndex + 1}/${stage.scenarios.length})</span>
        </div>
      </div>

      <h3 class="miner-question-title">${currentScenario.question}</h3>

      <!-- 4 Options Board -->
      <div class="miner-options-grid">
        ${currentScenario.options.map(opt => `
          <div class="miner-option-item" id="minerOptItem_${opt.id}">
            <div class="miner-option-badge">${opt.id}</div>
            <div>${opt.text}</div>
          </div>
        `).join('')}
      </div>

      <!-- Ocean Arena Canvas -->
      <div class="miner-ocean-wrapper" id="minerOceanWrapper">
        <canvas class="miner-ocean-canvas" id="minerOceanCanvas" width="860" height="420"></canvas>
      </div>
    `;

    setupGoldMinerCanvas();
  }

  function setupGoldMinerCanvas() {
    const canvas = document.getElementById('minerOceanCanvas');
    const wrapper = document.getElementById('minerOceanWrapper');
    if (!canvas || !wrapper) return;

    goldMinerState.canvas = canvas;
    goldMinerState.ctx = canvas.getContext('2d');
    goldMinerState.hookOrigin = { x: canvas.width / 2, y: 24 };

    // 4 candidate bottom slot positions
    const slots = [
      { x: 135, y: 345 },
      { x: 325, y: 365 },
      { x: 535, y: 365 },
      { x: 725, y: 345 }
    ];

    // Shuffle answer options [A, B, C, D] randomly across the slots
    const shuffledLetters = ['A', 'B', 'C', 'D'].sort(() => Math.random() - 0.5);
    const answerTargets = shuffledLetters.map((letter, idx) => {
      const slot = slots[idx];
      return {
        type: 'answer',
        optionId: letter,
        text: letter,
        x: slot.x,
        y: slot.y,
        originX: slot.x,
        originY: slot.y,
        radius: 28,
        goldColor: '#facc15'
      };
    });

    // Obstacles (Adjusted placement with clear lanes between slots)
    const obstacleTargets = [
      // 2 Patrol Sharks with smooth speeds
      { type: 'shark', name: 'Bot spam 1', x: 200, y: 120, originX: 200, originY: 120, radius: 20, speed: 1.4, dir: 1, minX: 110, maxX: 750 },
      { type: 'shark', name: 'Bot spam 2', x: 620, y: 195, originX: 620, originY: 195, radius: 20, speed: 1.7, dir: -1, minX: 120, maxX: 740 },

      // 3 Rocks (Đá ngầm placed between fire corridors instead of direct blocks)
      { type: 'rock', name: 'Đá ngầm', x: 258, y: 240, originX: 258, originY: 240, radius: 18 },
      { type: 'rock', name: 'Đá ngầm', x: 430, y: 215, originX: 430, originY: 215, radius: 20 },
      { type: 'rock', name: 'Đá ngầm', x: 602, y: 240, originX: 602, originY: 240, radius: 18 }
    ];

    // Combine all targets
    goldMinerState.targets = [...answerTargets, ...obstacleTargets];

    // Click anywhere on ocean to launch hook
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      fireGoldMinerHook();
    });

    // Start Game Loop
    goldMinerState.animationFrameId = requestAnimationFrame(goldMinerLoop);
  }

  function fireGoldMinerHook() {
    if (goldMinerState.hookState !== 'IDLE' || goldMinerState.scenarioAnswered) return;
    window.soundEngine.playClickSound();
    goldMinerState.hookState = 'SHOOTING';
  }

  function stopGoldMinerGame() {
    if (goldMinerState.animationFrameId) {
      cancelAnimationFrame(goldMinerState.animationFrameId);
      goldMinerState.animationFrameId = null;
    }
  }

  function goldMinerLoop() {
    const ctx = goldMinerState.ctx;
    const canvas = goldMinerState.canvas;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Update Physics
    updateGoldMinerPhysics(canvas);

    // 2. Draw Deep Cyber Ocean Elements
    drawGoldMinerEnvironment(ctx, canvas);

    // 3. Draw Targets & Obstacles
    drawGoldMinerTargets(ctx);

    // 4. Draw Particles (Explosions)
    drawGoldMinerParticles(ctx);

    // 5. Draw Claw & Cable
    drawGoldMinerClaw(ctx);

    if (!goldMinerState.scenarioAnswered) {
      goldMinerState.animationFrameId = requestAnimationFrame(goldMinerLoop);
    }
  }

  function updateGoldMinerPhysics(canvas) {
    // A. Hook Angle oscillation in IDLE
    if (goldMinerState.hookState === 'IDLE') {
      goldMinerState.hookAngle += goldMinerState.hookAngleSpeed * goldMinerState.hookDir;
      if (goldMinerState.hookAngle >= goldMinerState.hookMaxAngle) {
        goldMinerState.hookAngle = goldMinerState.hookMaxAngle;
        goldMinerState.hookDir = -1;
      } else if (goldMinerState.hookAngle <= goldMinerState.hookMinAngle) {
        goldMinerState.hookAngle = goldMinerState.hookMinAngle;
        goldMinerState.hookDir = 1;
      }
    }

    // B. Patrol Sharks Movement
    goldMinerState.targets.forEach(t => {
      if (t.type === 'shark' && t !== goldMinerState.caughtTarget) {
        t.x += t.speed * t.dir;
        if (t.x >= t.maxX) {
          t.x = t.maxX;
          t.dir = -1;
        } else if (t.x <= t.minX) {
          t.x = t.minX;
          t.dir = 1;
        }
      }
    });

    // Hook Head coordinates
    const hookHeadX = goldMinerState.hookOrigin.x + Math.sin(goldMinerState.hookAngle) * goldMinerState.hookLength;
    const hookHeadY = goldMinerState.hookOrigin.y + Math.cos(goldMinerState.hookAngle) * goldMinerState.hookLength;

    // C. Hook SHOOTING
    if (goldMinerState.hookState === 'SHOOTING') {
      goldMinerState.hookLength += goldMinerState.hookSpeed;

      // Check collision with targets
      for (const target of goldMinerState.targets) {
        const dx = hookHeadX - target.x;
        const dy = hookHeadY - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= target.radius + 10) {
          goldMinerState.caughtTarget = target;
          goldMinerState.hookState = 'RETRACTING';

          if (target.type === 'bomb') {
            createExplosionParticles(target.x, target.y);
            window.soundEngine.playWrongSound();
            goldMinerState.hookRetractSpeed = 16;
          } else if (target.type === 'rock') {
            goldMinerState.hookRetractSpeed = 7.0;
          } else if (target.type === 'shark') {
            goldMinerState.hookRetractSpeed = 8.0;
          } else {
            // Gold Block Answer
            goldMinerState.hookRetractSpeed = 10.5;
          }
          break;
        }
      }

      // Out of bounds or reach max distance
      if (goldMinerState.hookLength >= goldMinerState.hookMaxLength || hookHeadX <= 8 || hookHeadX >= canvas.width - 8 || hookHeadY >= canvas.height - 8) {
        goldMinerState.hookState = 'RETRACTING';
        goldMinerState.hookRetractSpeed = 10;
      }
    }

    // D. Hook RETRACTING
    if (goldMinerState.hookState === 'RETRACTING') {
      goldMinerState.hookLength -= goldMinerState.hookRetractSpeed;

      if (goldMinerState.caughtTarget && goldMinerState.caughtTarget.type !== 'bomb') {
        goldMinerState.caughtTarget.x = hookHeadX;
        goldMinerState.caughtTarget.y = hookHeadY;
      }

      if (goldMinerState.hookLength <= goldMinerState.hookMinLength) {
        goldMinerState.hookLength = goldMinerState.hookMinLength;
        const target = goldMinerState.caughtTarget;
        goldMinerState.caughtTarget = null;
        goldMinerState.hookState = 'IDLE';

        if (target) {
          if (target.type === 'answer') {
            handleGoldMinerAnswer(target.optionId);
          } else {
            // Reset obstacle to original position
            if (target.originX !== undefined && target.originY !== undefined) {
              target.x = target.originX;
              target.y = target.originY;
            }
          }
        }
      }
    }
  }

  function createExplosionParticles(x, y) {
    for (let i = 0; i < 24; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      goldMinerState.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 3 + Math.random() * 4,
        alpha: 1,
        color: ['#ef4444', '#f97316', '#fde047', '#ffffff'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function drawGoldMinerParticles(ctx) {
    for (let i = goldMinerState.particles.length - 1; i >= 0; i--) {
      const p = goldMinerState.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.04;

      if (p.alpha <= 0) {
        goldMinerState.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawGoldMinerEnvironment(ctx, canvas) {
    // Water light beams
    ctx.save();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(80, canvas.height);
    ctx.lineTo(240, canvas.height);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width - 240, canvas.height);
    ctx.lineTo(canvas.width - 80, canvas.height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawGoldMinerTargets(ctx) {
    for (const target of goldMinerState.targets) {
      if (target.type === 'answer') {
        // Draw Gold Block
        ctx.save();
        ctx.shadowColor = 'rgba(250, 204, 21, 0.6)';
        ctx.shadowBlur = 15;

        // Gold Hexagon / Circle Base
        ctx.fillStyle = 'linear-gradient(135deg, #fef08a, #eab308)';
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#eab308';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fef08a';
        ctx.stroke();

        // Inner highlight ring
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius - 4, 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();

        // Text [A], [B], [C], [D]
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#1c090a';
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(target.text, target.x, target.y + 1);

        ctx.restore();
      } else if (target.type === 'rock') {
        // Rock
        ctx.save();
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#334155';
        ctx.stroke();

        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🪨', target.x, target.y);
        ctx.restore();
      } else if (target.type === 'bomb') {
        // Bomb
        ctx.save();
        ctx.fillStyle = '#991b1b';
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#f87171';
        ctx.stroke();

        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💣', target.x, target.y);
        ctx.restore();
      } else if (target.type === 'shark') {
        // Shark Bot
        ctx.save();
        ctx.font = '26px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (target.dir === -1) {
          ctx.translate(target.x, target.y);
          ctx.scale(-1, 1);
          ctx.fillText('🦈', 0, 0);
        } else {
          ctx.fillText('🦈', target.x, target.y);
        }
        ctx.restore();
      }
    }
  }

  function drawGoldMinerClaw(ctx) {
    const origin = goldMinerState.hookOrigin;
    const hookHeadX = origin.x + Math.sin(goldMinerState.hookAngle) * goldMinerState.hookLength;
    const hookHeadY = origin.y + Math.cos(goldMinerState.hookAngle) * goldMinerState.hookLength;

    ctx.save();

    // 1. Spindle base at top
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // 2. Iron Rope Cable
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(hookHeadX, hookHeadY);
    ctx.stroke();

    // 3. Claw Head
    ctx.translate(hookHeadX, hookHeadY);
    ctx.rotate(-goldMinerState.hookAngle);

    ctx.fillStyle = '#fde047';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;

    // Claw Body
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Left & Right Pincers
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(-12, 12);
    ctx.lineTo(-6, 16);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(12, 12);
    ctx.lineTo(6, 16);
    ctx.stroke();

    ctx.restore();
  }

  function handleGoldMinerAnswer(selectedOptionId) {
    const currentScenario = getCurrentScenario();
    goldMinerState.scenarioAnswered = true;
    stopGoldMinerGame();

    const isCorrect = selectedOptionId === currentScenario.correctOptionId;
    const isFirstAttempt = goldMinerState.scenarioFailedAttempts === 0;
    const pointsAwarded = (isCorrect && isFirstAttempt) ? 10 : 0;

    if (isCorrect) {
      window.soundEngine.playCorrectSound();
      state.score += pointsAwarded;
      updateScoreUI();

      elements.resultStatusBadge.className = 'result-status-badge status-correct';
      if (elements.resultStatusIcon) elements.resultStatusIcon.textContent = '✓';
      elements.resultStatusText.textContent = 'CHÍNH XÁC';
      if (elements.scoreAwardedBanner) elements.scoreAwardedBanner.style.display = 'none';
      if (elements.correctAnswerReveal) elements.correctAnswerReveal.style.display = 'none';

      if (elements.feedbackQuoteTag) elements.feedbackQuoteTag.textContent = 'LỜI BÁC DẠY / BÀI HỌC';
      if (elements.feedbackQuoteText) {
        elements.feedbackQuoteText.textContent = `"${currentScenario.quoteLesson}"`;
      }
      if (elements.feedbackTakeawayText) {
        elements.feedbackTakeawayText.textContent = currentScenario.feedbackCorrect;
      }

      elements.retryQuestionBtn.style.display = 'none';
      elements.proceedBtn.style.display = 'inline-block';

      const stage = getCurrentStage();
      if (state.currentScenarioIndex < stage.scenarios.length - 1) {
        elements.proceedBtn.textContent = `Tình huống ${state.currentScenarioIndex + 2}`;
      } else {
        elements.proceedBtn.textContent = 'Hoàn thành CHẶNG 4';
      }

      elements.resultModal.classList.remove('hidden');

    } else {
      // WRONG ANSWER CAUGHT
      window.soundEngine.playWrongSound();
      goldMinerState.scenarioFailedAttempts++;

      elements.resultStatusBadge.className = 'result-status-badge status-wrong';
      if (elements.resultStatusIcon) elements.resultStatusIcon.textContent = '✕';
      elements.resultStatusText.textContent = 'CHƯA CHÍNH XÁC';
      if (elements.scoreAwardedBanner) elements.scoreAwardedBanner.style.display = 'none';

      if (elements.correctAnswerReveal) elements.correctAnswerReveal.style.display = 'none';
      if (elements.feedbackQuoteTag) elements.feedbackQuoteTag.textContent = 'PHÂN TÍCH BÀI HỌC';
      if (elements.feedbackQuoteText) {
        elements.feedbackQuoteText.textContent = `Bạn vừa kéo trúng khối [${selectedOptionId}].`;
      }
      if (elements.feedbackTakeawayText) {
        elements.feedbackTakeawayText.textContent = currentScenario.feedbackWrong;
      }

      elements.retryQuestionBtn.style.display = 'inline-block';
      elements.retryQuestionBtn.className = 'btn-gold';
      elements.retryQuestionBtn.textContent = 'Thử lại';
      elements.proceedBtn.style.display = 'none';

      elements.resultModal.classList.remove('hidden');
    }
  }

  /* ==========================================================================
     STAGE 5: MẠNG LƯỚI YÊU THƯƠNG - NỐI MẠCH NGUỒN DÂN TỘC (PIPE PUZZLE)
     ========================================================================== */
  const networkState = {
    grid: [],
    poweredTiles: new Set(),
    winningPath: [],
    isCompleted: false
  };

  function initNetworkStage() {
    state.currentScenarioIndex = 0;
    renderNetworkScenario();
  }

  function renderNetworkScenario() {
    updateStageHeaderUI();
    const stage = getCurrentStage();
    const currentScenario = getCurrentScenario();

    networkState.isCompleted = false;
    networkState.poweredTiles = new Set();
    networkState.winningPath = [];

    // Deep copy the grid so rotations can be manipulated independently
    networkState.grid = currentScenario.grid.map(row =>
      row.map(cell => ({ ...cell }))
    );

    elements.networkStageView.innerHTML = `
      <div class="network-header-bar">
        <div>
          <span class="scenario-tag">${currentScenario.contextHeader} (${state.currentScenarioIndex + 1}/${stage.scenarios.length})</span>
        </div>
      </div>

      <div class="network-problem-box">
        <div class="network-problem-label">Vấn đề kết nối kiều bào:</div>
        <div class="network-problem-desc">${currentScenario.issueText}</div>
      </div>

      <!-- Network Arena -->
      <div class="network-arena">
        <!-- Left Station Hub (Origin) -->
        <div class="network-station-hub">
          <div class="station-icon-glow" id="networkOriginHub">
            <span>${currentScenario.originFlag}</span>
          </div>
          <div class="station-title">${currentScenario.originStation}</div>
          <div class="station-status-tag">Trạm phát sóng</div>
        </div>

        <!-- Matrix Cable Board (3x4) -->
        <div class="network-grid-board" id="networkGridBoard">
          <!-- Populated by JS -->
        </div>

        <!-- Right Station Hub (Target) -->
        <div class="network-station-hub">
          <div class="station-icon-glow target-hub" id="networkTargetHub">
            <span>${currentScenario.targetFlag}</span>
          </div>
          <div class="station-title">${currentScenario.targetStation}</div>
          <div class="station-status-tag">Tâm điểm Tổ quốc</div>
        </div>
      </div>
    `;

    renderNetworkGrid();
    evaluateNetworkConnectivity();
  }

  function renderNetworkGrid() {
    const board = document.getElementById('networkGridBoard');
    if (!board) return;

    const currentScenario = getCurrentScenario();
    board.innerHTML = '';

    for (let r = 0; r < currentScenario.gridRows; r++) {
      for (let c = 0; c < currentScenario.gridCols; c++) {
        const cell = networkState.grid[r][c];
        const isPowered = networkState.poweredTiles.has(`${r},${c}`);
        const isWinning = networkState.winningPath.includes(`${r},${c}`);

        const tileEl = document.createElement('div');
        tileEl.className = `network-tile ${isWinning ? 'completed-path' : (isPowered ? 'powered' : '')}`;
        tileEl.id = `netTile_${r}_${c}`;
        tileEl.innerHTML = getPipeSvg(cell.type, cell.rot, isPowered, isWinning);

        tileEl.addEventListener('click', () => {
          if (networkState.isCompleted) return;
          rotateNetworkTile(r, c);
        });

        board.appendChild(tileEl);
      }
    }
  }

  function getPipeSvg(type, rot, isPowered, isWinning) {
    const statusClass = isWinning ? 'pipe-completed' : (isPowered ? 'pipe-powered' : '');
    let pathD = '';
    if (type === 'straight') {
      pathD = 'M 0,50 L 100,50';
    } else if (type === 'corner') {
      pathD = 'M 50,0 Q 50,50 100,50';
    } else if (type === 't-junction') {
      pathD = 'M 0,50 L 100,50 M 50,50 L 50,0';
    } else if (type === 'cross') {
      pathD = 'M 0,50 L 100,50 M 50,0 L 50,100';
    }

    const rotAngle = rot * 90;

    return `
      <svg class="network-tile-svg ${statusClass}" viewBox="0 0 100 100" style="transform: rotate(${rotAngle}deg);">
        <path d="${pathD}" class="pipe-casing" />
        <path d="${pathD}" class="pipe-core" />
        ${isWinning ? `<circle cx="50" cy="50" r="7" fill="#fde047" />` : (isPowered ? `<circle cx="50" cy="50" r="5" fill="#38bdf8" />` : '')}
      </svg>
    `;
  }

  function getTilePorts(type, rot) {
    if (type === 'straight') {
      return (rot % 2 === 0) ? [1, 3] : [0, 2];
    } else if (type === 'corner') {
      return [(0 + rot) % 4, (1 + rot) % 4];
    } else if (type === 't-junction') {
      return [(3 + rot) % 4, (0 + rot) % 4, (1 + rot) % 4];
    } else if (type === 'cross') {
      return [0, 1, 2, 3];
    }
    return [];
  }

  function rotateNetworkTile(r, c) {
    window.soundEngine.playClickSound();
    const cell = networkState.grid[r][c];
    cell.rot = (cell.rot + 1) % 4;

    evaluateNetworkConnectivity();
  }

  function evaluateNetworkConnectivity() {
    const currentScenario = getCurrentScenario();
    const rows = currentScenario.gridRows;
    const cols = currentScenario.gridCols;

    const start = currentScenario.startPos;
    const end = currentScenario.endPos;

    networkState.poweredTiles = new Set();
    networkState.winningPath = [];

    // Find all valid start nodes on the left edge
    const startNodes = [];
    const designatedStartCell = networkState.grid[start.r][start.c];
    const designatedStartPorts = getTilePorts(designatedStartCell.type, designatedStartCell.rot);

    if (designatedStartPorts.includes(start.fromPort)) {
      startNodes.push({ r: start.r, c: start.c, path: [`${start.r},${start.c}`] });
      networkState.poweredTiles.add(`${start.r},${start.c}`);
    } else {
      for (let r = 0; r < rows; r++) {
        const cell = networkState.grid[r][0];
        const ports = getTilePorts(cell.type, cell.rot);
        if (ports.includes(3)) {
          startNodes.push({ r: r, c: 0, path: [`${r},0`] });
          networkState.poweredTiles.add(`${r},0`);
        }
      }
    }

    let isSolved = false;

    if (startNodes.length > 0) {
      const queue = [...startNodes];
      const visited = new Set(startNodes.map(n => `${n.r},${n.c}`));

      while (queue.length > 0) {
        const curr = queue.shift();
        const currCell = networkState.grid[curr.r][curr.c];
        const currPorts = getTilePorts(currCell.type, currCell.rot);

        // Check if reached right station (any rightmost column tile with port 1 or designated endPos)
        const reachedExit = (curr.c === cols - 1 && currPorts.includes(1)) ||
          (end && curr.r === end.r && curr.c === end.c && currPorts.includes(end.toPort));

        if (reachedExit) {
          isSolved = true;
          networkState.winningPath = curr.path;
        }

        // Neighbors: 0=Top, 1=Right, 2=Bottom, 3=Left
        for (const port of currPorts) {
          let nr = curr.r;
          let nc = curr.c;
          let oppPort = (port + 2) % 4;

          if (port === 0) nr--;
          else if (port === 1) nc++;
          else if (port === 2) nr++;
          else if (port === 3) nc--;

          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            const neighborCell = networkState.grid[nr][nc];
            const neighborPorts = getTilePorts(neighborCell.type, neighborCell.rot);

            if (neighborPorts.includes(oppPort)) {
              networkState.poweredTiles.add(`${nr},${nc}`);
              if (!visited.has(`${nr},${nc}`)) {
                visited.add(`${nr},${nc}`);
                queue.push({ r: nr, c: nc, path: [...curr.path, `${nr},${nc}`] });
              }
            }
          }
        }
      }
    }

    renderNetworkGrid();

    const targetHub = document.getElementById('networkTargetHub');
    const originHub = document.getElementById('networkOriginHub');

    if (isSolved && !networkState.isCompleted) {
      networkState.isCompleted = true;
      if (targetHub) targetHub.classList.add('energized');
      if (originHub) originHub.classList.add('energized');

      window.soundEngine.playCorrectSound();

      setTimeout(() => {
        showResultModal(true, { feedbackCorrect: currentScenario.coreTakeaway });
      }, 700);
    } else {
      if (targetHub) targetHub.classList.remove('energized');
    }
  }

  /* ==========================================================================
     GAME LIFECYCLE & STAGE PROGRESSION
     ========================================================================== */
  function restartStage(stageIndex = 0) {
    stopVictoryCelebrationEffect();
    window.soundEngine.playClickSound();
    hideResultModal();
    stopGoldMinerGame();
    state.currentStageIndex = stageIndex;
    state.currentScenarioIndex = 0;
    state.scenarioMistakes = 0;
    state.currentDialogueIndex = 0;
    if (stageIndex === 0) {
      state.score = 0;
    }
    updateScoreUI();
    updateStageHeaderUI();

    const stage = getCurrentStage();
    if (stage.music) {
      window.soundEngine.playStageMusic(stage.music);
    }
    if (elements.completionView) elements.completionView.style.display = 'none';
    if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
    if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
    if (elements.networkStageView) elements.networkStageView.style.display = 'none';
    elements.scenarioView.style.display = 'none';
    elements.vnDialogueView.style.display = 'flex';
    showCurrentDialogue();
  }

  function startStage(stageIndex) {
    stopVictoryCelebrationEffect();
    window.soundEngine.playClickSound();
    stopGoldMinerGame();
    state.currentStageIndex = stageIndex;
    state.currentScenarioIndex = 0;
    state.scenarioMistakes = 0;
    state.currentDialogueIndex = 0;
    updateStageHeaderUI();

    const stage = getCurrentStage();
    if (stage.music) {
      window.soundEngine.playStageMusic(stage.music);
    }
    if (elements.completionView) elements.completionView.style.display = 'none';
    if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
    if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
    if (elements.networkStageView) elements.networkStageView.style.display = 'none';
    elements.scenarioView.style.display = 'none';
    elements.vnDialogueView.style.display = 'flex';
    showCurrentDialogue();
  }

  function completeStageFlow() {
    window.soundEngine.playClickSound();
    hideResultModal();

    const stage = getCurrentStage();

    // Nếu đang ở Chặng 5 (Network Pipe Puzzle) và còn màn tiếp theo
    if (stage.isNetworkStage && state.currentScenarioIndex < stage.scenarios.length - 1) {
      state.currentScenarioIndex++;
      renderNetworkScenario();
      return;
    }

    // Nếu đang ở Chặng 4 (Gold Miner) và còn câu tiếp theo
    if (stage.isGoldMinerStage && state.currentScenarioIndex < stage.scenarios.length - 1) {
      state.currentScenarioIndex++;
      renderGoldMinerScenario();
      return;
    }

    // Nếu đang ở chặng câu hỏi thông thường và còn tình huống tiếp theo
    if (!stage.isBalanceStage && !stage.isGoldMinerStage && !stage.isNetworkStage && state.currentScenarioIndex < stage.scenarios.length - 1) {
      state.currentScenarioIndex++;
      state.scenarioMistakes = 0;
      renderScenarioQuestion();
      return;
    }

    // Hoàn thành Chặng 1 (index 0) -> Chuyển sang Chặng 2
    if (state.currentStageIndex === 0 && GAME_DATA.stages.length > 1) {
      if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
      elements.scenarioView.style.display = 'none';
      elements.vnDialogueView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
      if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
      if (elements.networkStageView) elements.networkStageView.style.display = 'none';
      elements.completionView.style.display = 'block';

      elements.completionView.innerHTML = `
        <div class="tag-ribbon">XUẤT SẮC HOÀN THÀNH CHẶNG 1</div>
        <h2 class="main-stage-heading" style="font-size: 1.7rem; margin: 0.8rem 0 1.2rem 0; color: #ffffff;">
          ${stage.title}
        </h2>
        <p style="font-size: 1.05rem; color: var(--gold-light); max-width: 680px; margin: 0 auto 2rem auto; line-height: 1.7; font-style: italic;">
          "Đoàn kết, đoàn kết, đại đoàn kết<br>Thành công, thành công, đại thành công."
        </p>
        <div style="display: flex; justify-content: center;">
          <button class="btn-gold" id="nextStageBtn" type="button" style="padding: 0.85rem 2.6rem; font-size: 1.05rem;">Bắt đầu CHẶNG 2</button>
        </div>
      `;

      document.getElementById('nextStageBtn').addEventListener('click', () => startStage(1));
      return;
    }

    // Hoàn thành Chặng 2 (index 1) -> Chuyển sang Chặng 3 (Cán Cân Chiến Lược)
    if (state.currentStageIndex === 1 && GAME_DATA.stages.length > 2) {
      if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
      elements.scenarioView.style.display = 'none';
      elements.vnDialogueView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
      if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
      if (elements.networkStageView) elements.networkStageView.style.display = 'none';
      elements.completionView.style.display = 'block';

      elements.completionView.innerHTML = `
        <div class="tag-ribbon">XUẤT SẮC HOÀN THÀNH CHẶNG 2</div>
        <h2 class="main-stage-heading" style="font-size: 1.7rem; margin: 0.8rem 0 1.2rem 0; color: #ffffff;">
          ${stage.title}
        </h2>
        <p style="font-size: 1.05rem; color: var(--gold-light); max-width: 680px; margin: 0 auto 2rem auto; line-height: 1.7; font-style: italic;">
          "Năm ngón tay cũng có ngón vắn ngón dài. Nhưng vắn dài đều họp nhau lại nơi bàn tay. Trong mấy triệu người cũng có người thế này hay thế khác, nhưng đều là dòng dõi tổ tiên ta."
        </p>
        <div style="display: flex; justify-content: center;">
          <button class="btn-gold" id="nextStage3Btn" type="button" style="padding: 0.85rem 2.6rem; font-size: 1.05rem;">Bắt đầu CHẶNG 3</button>
        </div>
      `;

      document.getElementById('nextStage3Btn').addEventListener('click', () => startStage(2));
      return;
    }

    // Hoàn thành Chặng 3 (index 2) -> Chuyển sang Chặng 4 (Hải Trình Đào Vàng)
    if (state.currentStageIndex === 2 && GAME_DATA.stages.length > 3) {
      if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
      elements.scenarioView.style.display = 'none';
      elements.vnDialogueView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
      if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
      if (elements.networkStageView) elements.networkStageView.style.display = 'none';
      elements.completionView.style.display = 'block';

      elements.completionView.innerHTML = `
        <div class="tag-ribbon">XUẤT SẮC HOÀN THÀNH CHẶNG 3</div>
        <h2 class="main-stage-heading" style="font-size: 1.7rem; margin: 0.8rem 0 1.2rem 0; color: #ffffff;">
          ${stage.title}
        </h2>
        <p style="font-size: 1.05rem; color: var(--gold-light); max-width: 680px; margin: 0 auto 2rem auto; line-height: 1.7; font-style: italic;">
          "Muốn đoàn kết chặt chẽ thì phải xây dựng cái tốt, bồi đắp tình thân ái; đồng thời phải kiên quyết đấu tranh trừ tiệt những thói xấu chia rẽ."
        </p>
        <div style="display: flex; justify-content: center;">
          <button class="btn-gold" id="nextStage4Btn" type="button" style="padding: 0.85rem 2.6rem; font-size: 1.05rem;">Bắt đầu CHẶNG 4</button>
        </div>
      `;

      document.getElementById('nextStage4Btn').addEventListener('click', () => startStage(3));
      return;
    }

    // Hoàn thành Chặng 4 (index 3) -> Chuyển sang Chặng 5 (Hướng Về Cội Nguồn)
    if (state.currentStageIndex === 3 && GAME_DATA.stages.length > 4) {
      if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
      elements.scenarioView.style.display = 'none';
      elements.vnDialogueView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
      if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
      if (elements.networkStageView) elements.networkStageView.style.display = 'none';
      elements.completionView.style.display = 'block';

      elements.completionView.innerHTML = `
        <div class="tag-ribbon">XUẤT SẮC HOÀN THÀNH CHẶNG 4</div>
        <h2 class="main-stage-heading" style="font-size: 1.7rem; margin: 0.8rem 0 1.2rem 0; color: #ffffff;">
          ${stage.title}
        </h2>
        <p style="font-size: 1.05rem; color: var(--gold-light); max-width: 680px; margin: 0 auto 2rem auto; line-height: 1.7; font-style: italic;">
          "Thực lực là cái chiêng mà ngoại giao là cái tiếng. Chiêng có to tiếng mới lớn. Độc lập tự chủ kết hợp sức mạnh thời đại."
        </p>
        <div style="display: flex; justify-content: center;">
          <button class="btn-gold" id="nextStage5Btn" type="button" style="padding: 0.85rem 2.6rem; font-size: 1.05rem;">Bắt đầu CHẶNG 5</button>
        </div>
      `;

      document.getElementById('nextStage5Btn').addEventListener('click', () => startStage(4));
      return;
    }

    // Hoàn thành toàn bộ 5 chặng bài học
    if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
    elements.scenarioView.style.display = 'none';
    elements.vnDialogueView.style.display = 'none';
    if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
    if (elements.goldMinerStageView) elements.goldMinerStageView.style.display = 'none';
    if (elements.networkStageView) elements.networkStageView.style.display = 'none';
    elements.completionView.style.display = 'block';

    elements.completionView.innerHTML = `
      <h2 class="main-stage-heading" style="font-size: 1.8rem; margin: 0.5rem 0 1.2rem 0; color: #ffffff;">
        Tư Tưởng Hồ Chí Minh về Đại Đoàn Kết & Ngoại Giao Nhân Dân Số
      </h2>
      <p style="font-size: 1.05rem; color: var(--gold-light); max-width: 720px; margin: 0 auto 1.5rem auto; line-height: 1.7; font-style: italic;">
        "Thực lực là cái chiêng mà ngoại giao là cái tiếng. Chiêng có to tiếng mới lớn. Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công!"
      </p>
      <div style="display: inline-block; background: rgba(0,0,0,0.55); padding: 1.2rem 2.8rem; border-radius: 10px; border: 1px solid var(--border-gold-strong);">
        <div style="font-size: 1.2rem; font-weight: 700; color: var(--gold-primary);">
          BẠN ĐÃ THẤM NHUẦN SÂU SẮC TƯ TƯỞNG CỦA NGƯỜI
        </div>
        <div style="font-size: 0.92rem; color: #ffffff; margin-top: 0.5rem; max-width: 580px; line-height: 1.6;">
          Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ các tình huống thực tiễn và bài học qua cả 5 chặng hành trình!
        </div>
      </div>
    `;

    startVictoryCelebrationEffect();
  }

  /* ==========================================================================
     VICTORY CELEBRATION EFFECTS: LOTUS PETALS, GOLDEN STARS, CONFETTI & FIREWORKS
     ========================================================================== */
  let celebrationState = {
    canvas: null,
    ctx: null,
    animationId: null,
    particles: [],
    fireworks: [],
    lastFireworkTime: 0,
    isActive: false
  };

  function startVictoryCelebrationEffect() {
    stopVictoryCelebrationEffect();

    let canvas = document.getElementById('victoryCelebrationCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'victoryCelebrationCanvas';
      canvas.className = 'victory-celebration-canvas';
      document.body.appendChild(canvas);
    }

    celebrationState.canvas = canvas;
    celebrationState.ctx = canvas.getContext('2d');
    celebrationState.isActive = true;
    celebrationState.particles = [];
    celebrationState.fireworks = [];
    celebrationState.lastFireworkTime = Date.now();

    const resizeCanvas = () => {
      if (celebrationState.canvas) {
        celebrationState.canvas.width = window.innerWidth;
        celebrationState.canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial batch of particles (Lotus petals, golden stars, confetti)
    for (let i = 0; i < 45; i++) {
      celebrationState.particles.push(createCelebrationParticle(true));
    }

    // Launch initial double fireworks from corners
    launchCornerFirework('left');
    launchCornerFirework('right');

    function loop() {
      if (!celebrationState.isActive || !celebrationState.ctx) return;
      const ctx = celebrationState.ctx;
      const w = celebrationState.canvas.width;
      const h = celebrationState.canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Periodic Fireworks launch from both sides
      const now = Date.now();
      if (now - celebrationState.lastFireworkTime > 1800) {
        celebrationState.lastFireworkTime = now;
        launchCornerFirework(Math.random() > 0.5 ? 'left' : 'right');
        setTimeout(() => {
          if (celebrationState.isActive) launchCornerFirework(Math.random() > 0.5 ? 'right' : 'left');
        }, 500);
      }

      // Continuous spawning of falling petals/stars/confetti
      if (celebrationState.particles.length < 65 && Math.random() < 0.6) {
        celebrationState.particles.push(createCelebrationParticle(false));
      }

      // Update & Draw Fireworks rockets and sparks
      updateAndDrawFireworks(ctx);

      // Update & Draw Falling Particles
      for (let i = celebrationState.particles.length - 1; i >= 0; i--) {
        const p = celebrationState.particles[i];
        p.t += 0.02;
        p.y += p.vy;
        p.x += Math.sin(p.t + p.seed) * p.swayAmp;
        p.rot += p.rotSpeed;
        p.flip += p.flipSpeed;

        if (p.y > h + 30 || p.x < -30 || p.x > w + 30) {
          celebrationState.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(Math.cos(p.flip), 1);
        ctx.globalAlpha = p.alpha;

        if (p.type === 'lotus_petal') {
          drawLotusPetal(ctx, p);
        } else if (p.type === 'star') {
          drawGoldenStar(ctx, p);
        } else {
          drawConfettiRibbon(ctx, p);
        }

        ctx.restore();
      }

      celebrationState.animationId = requestAnimationFrame(loop);
    }

    celebrationState.animationId = requestAnimationFrame(loop);
  }

  function stopVictoryCelebrationEffect() {
    celebrationState.isActive = false;
    if (celebrationState.animationId) {
      cancelAnimationFrame(celebrationState.animationId);
      celebrationState.animationId = null;
    }
    const canvas = document.getElementById('victoryCelebrationCanvas');
    if (canvas) canvas.remove();
  }

  function createCelebrationParticle(randomInitialY = false) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const types = ['lotus_petal', 'lotus_petal', 'star', 'star', 'confetti', 'confetti'];
    const type = types[Math.floor(Math.random() * types.length)];

    return {
      type: type,
      x: Math.random() * w,
      y: randomInitialY ? Math.random() * h : -25 - Math.random() * 30,
      vy: type === 'lotus_petal' ? (1.2 + Math.random() * 1.3) : (type === 'star' ? (1.0 + Math.random() * 1.2) : (1.6 + Math.random() * 2.2)),
      size: type === 'lotus_petal' ? (16 + Math.random() * 12) : (type === 'star' ? (10 + Math.random() * 10) : (8 + Math.random() * 8)),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.035,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: 0.02 + Math.random() * 0.04,
      t: Math.random() * 10,
      seed: Math.random() * 10,
      swayAmp: type === 'lotus_petal' ? (1.2 + Math.random() * 1.5) : (0.6 + Math.random() * 0.8),
      alpha: 0.85 + Math.random() * 0.15,
      colorVariant: Math.random() > 0.35 ? 'pink' : 'gold',
      confettiColor: ['#facc15', '#f59e0b', '#ec4899', '#38bdf8', '#34d399', '#ffffff', '#f43f5e'][Math.floor(Math.random() * 7)]
    };
  }

  function drawLotusPetal(ctx, p) {
    const r = p.size;
    const grad = ctx.createLinearGradient(0, -r, 0, r);
    if (p.colorVariant === 'pink') {
      grad.addColorStop(0, '#be185d'); // tip deep rose
      grad.addColorStop(0.35, '#f472b6'); // middle soft pink
      grad.addColorStop(1, '#fbcfe8'); // base blush white
    } else {
      grad.addColorStop(0, '#d97706'); // tip gold
      grad.addColorStop(0.4, '#fbbf24');
      grad.addColorStop(1, '#fef08a');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.bezierCurveTo(r * 0.75, -r * 0.4, r * 0.65, r * 0.5, 0, r);
    ctx.bezierCurveTo(-r * 0.65, r * 0.5, -r * 0.75, -r * 0.4, 0, -r);
    ctx.closePath();
    ctx.fill();

    // Subtle petal center vein
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.7);
    ctx.lineTo(0, r * 0.6);
    ctx.stroke();
  }

  function drawGoldenStar(ctx, p) {
    const spikes = 5;
    const outerRadius = p.size * 0.8;
    const innerRadius = outerRadius * 0.48;
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;

    ctx.save();
    ctx.shadowColor = 'rgba(250, 204, 21, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.2;

    ctx.beginPath();
    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      let x = Math.cos(rot) * outerRadius;
      let y = Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawConfettiRibbon(ctx, p) {
    ctx.fillStyle = p.confettiColor;
    ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
  }

  function launchCornerFirework(side = 'left') {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const startX = side === 'left' ? 40 : w - 40;
    const startY = h - 20;
    const targetX = side === 'left' ? (w * 0.25 + Math.random() * (w * 0.25)) : (w * 0.5 + Math.random() * (w * 0.25));
    const targetY = h * 0.18 + Math.random() * (h * 0.28);

    const angle = Math.atan2(targetY - startY, targetX - startX);
    const speed = 14 + Math.random() * 4;

    celebrationState.fireworks.push({
      type: 'rocket',
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetX: targetX,
      targetY: targetY,
      trail: [],
      color: ['#facc15', '#f43f5e', '#38bdf8', '#a855f7', '#fbbf24'][Math.floor(Math.random() * 5)]
    });
  }

  function updateAndDrawFireworks(ctx) {
    for (let i = celebrationState.fireworks.length - 1; i >= 0; i--) {
      const fw = celebrationState.fireworks[i];

      if (fw.type === 'rocket') {
        fw.x += fw.vx;
        fw.y += fw.vy;
        fw.trail.push({ x: fw.x, y: fw.y, alpha: 1 });

        // Draw trail
        for (let t = fw.trail.length - 1; t >= 0; t--) {
          const tp = fw.trail[t];
          tp.alpha -= 0.08;
          if (tp.alpha <= 0) {
            fw.trail.splice(t, 1);
            continue;
          }
          ctx.fillStyle = fw.color;
          ctx.globalAlpha = tp.alpha;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Explode condition
        if (fw.y <= fw.targetY || fw.vy >= 0) {
          celebrationState.fireworks.splice(i, 1);
          // Explode into sparks
          const sparkCount = 36;
          for (let s = 0; s < sparkCount; s++) {
            const angle = (Math.PI * 2 / sparkCount) * s + (Math.random() - 0.5) * 0.2;
            const spd = 2.5 + Math.random() * 5.5;
            celebrationState.fireworks.push({
              type: 'spark',
              x: fw.x,
              y: fw.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              alpha: 1,
              decay: 0.016 + Math.random() * 0.015,
              color: fw.color,
              radius: 2 + Math.random() * 2
            });
          }
        }
      } else if (fw.type === 'spark') {
        fw.x += fw.vx;
        fw.y += fw.vy;
        fw.vy += 0.09; // gravity
        fw.vx *= 0.98;
        fw.alpha -= fw.decay;

        if (fw.alpha <= 0) {
          celebrationState.fireworks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = fw.alpha;
        ctx.fillStyle = fw.color;
        ctx.shadowColor = fw.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  /* ==========================================================================
     EVENT LISTENERS
     ========================================================================== */
  elements.nextDialogueBtn.addEventListener('click', advanceDialogue);
  if (elements.skipIntroBtn) {
    elements.skipIntroBtn.addEventListener('click', skipDialogue);
  }
  if (elements.restartBtn) {
    elements.restartBtn.addEventListener('click', () => restartStage(state.currentStageIndex));
  }
  elements.retryQuestionBtn.addEventListener('click', retryCurrentScenario);
  elements.proceedBtn.addEventListener('click', completeStageFlow);

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (!elements.resultModal.classList.contains('hidden')) {
      if (e.key === 'Enter') {
        if (elements.proceedBtn.style.display !== 'none') {
          completeStageFlow();
        } else if (elements.retryQuestionBtn.style.display !== 'none') {
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

    // Gold Miner Controls (Space / ArrowDown / Enter)
    if (elements.goldMinerStageView && elements.goldMinerStageView.style.display !== 'none' && !goldMinerState.scenarioAnswered) {
      if (e.code === 'Space' || e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        fireGoldMinerHook();
      }
      return;
    }

    if (elements.scenarioView.style.display !== 'none' && !state.hasAnswered) {
      const currentScenario = getCurrentScenario();
      let matchedOptId = null;

      if (currentScenario.isSocialModeration) {
        if (['1', 'k', 'K'].includes(e.key)) {
          matchedOptId = 'KHOAN_DUNG';
        } else if (['2', 'x', 'X'].includes(e.key)) {
          matchedOptId = 'XU_LY_NGHIEM';
        }
      } else {
        const keyMap = {
          'a': 'A', 'A': 'A', '1': 'A',
          'b': 'B', 'B': 'B', '2': 'B',
          'c': 'C', 'C': 'C', '3': 'C',
          'd': 'D', 'D': 'D', '4': 'D'
        };
        matchedOptId = keyMap[e.key];
      }

      if (matchedOptId) {
        const optionObj = currentScenario.options.find(o => o.id === matchedOptId);
        const cardElem = elements.optionsContainer.querySelector(`[data-id="${matchedOptId}"]`);
        if (optionObj && cardElem) {
          handleOptionSelected(optionObj, cardElem);
        }
      }
    }
  });

  // Initial stage start
  const initialStage = getCurrentStage();
  updateStageHeaderUI();
  if (initialStage.music) {
    window.soundEngine.playStageMusic(initialStage.music);
  }
  showCurrentDialogue();
});

