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
      elements.nextDialogueBtn.textContent = stage.isBalanceStage ? 'Bắt đầu Cân Bằng Chiến Lược' : 'Tình huống 1';
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
    if (stage.isBalanceStage) {
      if (elements.scenarioView) elements.scenarioView.style.display = 'none';
      if (elements.balanceStageView) {
        elements.balanceStageView.style.display = 'flex';
        initBalanceStage();
      }
    } else {
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
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
      elements.scoreAwardedBanner.className = 'result-score-tag plus-score';
      elements.scoreAwardedText.textContent = `+${earnedPoints} ĐIỂM`;
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
        if (state.currentStageIndex === 0) {
          elements.proceedBtn.textContent = 'Hoàn thành Chặng 1';
        } else if (state.currentStageIndex === 1) {
          elements.proceedBtn.textContent = 'Hoàn thành Chặng 2';
        } else {
          elements.proceedBtn.textContent = 'Tổng kết toàn bộ Bài học';
        }
      }

    } else {
      elements.resultStatusBadge.className = 'result-status-badge status-wrong';
      if (elements.resultStatusIcon) elements.resultStatusIcon.textContent = '✕';
      elements.resultStatusText.textContent = 'CHƯA CHÍNH XÁC';
      elements.scoreAwardedBanner.className = 'result-score-tag zero-score';

      const nextPotential = getScenarioCurrentValue();
      elements.scoreAwardedText.textContent = nextPotential > 0 ? `Lần sau: +${nextPotential} ĐIỂM` : 'Lần sau: +0 ĐIỂM';

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
    renderScenarioQuestion();
  }

  /* ==========================================================================
     STAGE 3: CÁN CÂN CHIẾN LƯỢC "XÂY" VÀ "CHỐNG" ENGINE
     ========================================================================== */
  function initBalanceStage() {
    updateStageHeaderUI();
    const stage = getCurrentStage();
    balanceState.placedCards = { XAY: [], CHONG: [] };
    balanceState.unplacedCards = [...stage.balanceGame.cards].sort(() => Math.random() - 0.5);
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

    // Calculate crossbeam rotation angle
    const diff = balanceState.placedCards.CHONG.length - balanceState.placedCards.XAY.length;
    const tiltDeg = isAllPlaced ? 0 : diff * 5.5;

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
              <span class="plate-capacity-badge">${balanceState.placedCards.XAY.length} / 3 Thẻ</span>
            </div>
            <div class="plate-slotted-list" id="slottedListXay">
              ${balanceState.placedCards.XAY.length > 0 ? balanceState.placedCards.XAY.map(card => `
                <div class="slotted-card-item">
                  <div class="slotted-item-header">THẺ ${card.num}: XÂY DỰNG</div>
                  <div>${card.text}</div>
                </div>
              `).join('') : '<div class="empty-slot-placeholder">Thả thẻ hành vi "XÂY" vào đây (Tối đa 3 thẻ)</div>'}
            </div>
          </div>

          <!-- Right Plate: CHỐNG -->
          <div class="scale-plate-zone zone-chong" id="plateZoneChong" data-zone="CHONG">
            <div class="plate-zone-header">
              <div class="plate-zone-title">CHỐNG <span style="font-size: 0.8rem; font-weight: normal; opacity: 0.9;">(Triệt phá độc hại)</span></div>
              <span class="plate-capacity-badge">${balanceState.placedCards.CHONG.length} / 3 Thẻ</span>
            </div>
            <div class="plate-slotted-list" id="slottedListChong">
              ${balanceState.placedCards.CHONG.length > 0 ? balanceState.placedCards.CHONG.map(card => `
                <div class="slotted-card-item">
                  <div class="slotted-item-header">THẺ ${card.num}: ĐẤU TRANH CHỐNG</div>
                  <div>${card.text}</div>
                </div>
              `).join('') : '<div class="empty-slot-placeholder">Thả thẻ hành vi "CHỐNG" vào đây (Tối đa 3 thẻ)</div>'}
            </div>
          </div>
        </div>
      </div>

      <!-- Card Pool Section -->
      <div class="card-pool-section">
        <div class="card-pool-label">
          <span>KHO THẺ HÀNH VI (${balanceState.unplacedCards.length} THẺ CẦN PHÂN LOẠI)</span>
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

    // If already has 3 cards in target plate
    if (balanceState.placedCards[targetZoneId].length >= 3) {
      window.soundEngine.playWrongSound();
      return;
    }

    if (card.targetZone === targetZoneId) {
      // CORRECT PLACEMENT
      window.soundEngine.playCorrectSound();
      state.score += stage.balanceGame.pointsPerCard;
      updateScoreUI();

      balanceState.placedCards[targetZoneId].push(card);
      balanceState.unplacedCards = balanceState.unplacedCards.filter(c => c.id !== cardId);
      balanceState.selectedCardId = null;

      renderBalanceStageUI();

    } else {
      // INCORRECT PLACEMENT - Shakes and pops back
      window.soundEngine.playWrongSound();
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
    if (elements.resultStatusIcon) elements.resultStatusIcon.textContent = '⚖️';
    elements.resultStatusText.textContent = 'CÁN CÂN THĂNG BẰNG HOÀN HẢO';
    elements.scoreAwardedBanner.className = 'result-score-tag plus-score';
    elements.scoreAwardedText.textContent = '+30 ĐIỂM (CHẶNG 3)';
    if (elements.correctAnswerReveal) elements.correctAnswerReveal.style.display = 'none';
    if (elements.feedbackQuoteTag) elements.feedbackQuoteTag.textContent = 'QUY LUẬT BIỆN CHỨNG HỒ CHÍ MINH';
    if (elements.feedbackQuoteText) {
      elements.feedbackQuoteText.textContent = '"Muốn đoàn kết chặt chẽ thì phải xây dựng cái tốt, bồi đắp tình thân ái; đồng thời phải kiên quyết đấu tranh trừ tiệt những thói xấu chia rẽ."';
    }
    if (elements.feedbackTakeawayText) {
      elements.feedbackTakeawayText.textContent = 'Bạn đã hoàn thành xuất sắc việc phân định và cân bằng giữa hai mũi giáp công chiến lược "XÂY" (phủ xanh điều tốt) và "CHỐNG" (triệt phá độc hại) trên không gian số!';
    }
    elements.retryQuestionBtn.style.display = 'none';
    elements.proceedBtn.style.display = 'inline-block';
    elements.proceedBtn.textContent = 'Xem Tổng Kết Toàn Bộ Khóa Học 🏆';

    elements.resultModal.classList.remove('hidden');
  }

  /* ==========================================================================
     GAME LIFECYCLE & STAGE PROGRESSION
     ========================================================================== */
  function restartStage(stageIndex = 0) {
    window.soundEngine.playClickSound();
    hideResultModal();
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
    elements.scenarioView.style.display = 'none';
    elements.vnDialogueView.style.display = 'flex';
    showCurrentDialogue();
  }

  function startStage(stageIndex) {
    window.soundEngine.playClickSound();
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
    elements.scenarioView.style.display = 'none';
    elements.vnDialogueView.style.display = 'flex';
    showCurrentDialogue();
  }

  function completeStageFlow() {
    window.soundEngine.playClickSound();
    hideResultModal();

    const stage = getCurrentStage();

    // Nếu đang ở chặng câu hỏi thông thường và còn tình huống tiếp theo
    if (!stage.isBalanceStage && state.currentScenarioIndex < stage.scenarios.length - 1) {
      state.currentScenarioIndex++;
      state.scenarioMistakes = 0;
      renderScenarioQuestion();
      return;
    }

    // Hoàn thành Chặng 1 -> Chuyển sang Chặng 2
    if (state.currentStageIndex === 0 && GAME_DATA.stages.length > 1) {
      if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
      elements.scenarioView.style.display = 'none';
      elements.vnDialogueView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
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
          <button class="btn-gold" id="nextStageBtn" type="button" style="padding: 0.85rem 2.6rem; font-size: 1.05rem;">Bắt đầu Chặng 2</button>
        </div>
      `;

      document.getElementById('nextStageBtn').addEventListener('click', () => startStage(1));
      return;
    }

    // Hoàn thành Chặng 2 -> Chuyển sang Chặng 3 (Cán Cân Chiến Lược)
    if (state.currentStageIndex === 1 && GAME_DATA.stages.length > 2) {
      if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
      elements.scenarioView.style.display = 'none';
      elements.vnDialogueView.style.display = 'none';
      if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
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
          <button class="btn-gold" id="nextStage3Btn" type="button" style="padding: 0.85rem 2.6rem; font-size: 1.05rem;">Bắt đầu Chặng 3</button>
        </div>
      `;

      document.getElementById('nextStage3Btn').addEventListener('click', () => startStage(2));
      return;
    }

    // Hoàn thành toàn bộ game (Chặng 1 + Chặng 2 + Chặng 3 = 110 Điểm Tối Đa)
    const maxTotalScore = 110;
    const isPerfect = state.score >= maxTotalScore;

    if (elements.chapterHeroBadge) elements.chapterHeroBadge.style.display = 'none';
    elements.scenarioView.style.display = 'none';
    elements.vnDialogueView.style.display = 'none';
    if (elements.balanceStageView) elements.balanceStageView.style.display = 'none';
    elements.completionView.style.display = 'block';

    elements.completionView.innerHTML = `
      <div class="tag-ribbon">🏆 XUẤT SẮC HOÀN THÀNH TOÀN BỘ 3 CHẶNG BÀI HỌC</div>
      <h2 class="main-stage-heading" style="font-size: 1.8rem; margin: 0.8rem 0 1.2rem 0; color: #ffffff;">
        Tư Tưởng Hồ Chí Minh về Đại Đoàn Kết & Chiến Lược Không Gian Số
      </h2>
      <p style="font-size: 1.05rem; color: var(--gold-light); max-width: 720px; margin: 0 auto 1.5rem auto; line-height: 1.7; font-style: italic;">
        "Muốn đoàn kết chặt chẽ thì phải xây dựng cái tốt, bồi đắp tình thân ái; đồng thời phải kiên quyết đấu tranh trừ tiệt những thói xấu chia rẽ."
      </p>
      <div style="display: inline-block; background: rgba(0,0,0,0.55); padding: 1.1rem 2.5rem; border-radius: 10px; border: 1px solid var(--border-gold-strong); margin-bottom: 2rem;">
        <span style="font-size: 1rem; color: var(--gold-primary); margin-right: 0.8rem;">TỔNG ĐIỂM CHUNG CUỘC:</span>
        <span style="font-size: 2rem; font-weight: 800; color: #ffffff;">${state.score} / ${maxTotalScore} ĐIỂM</span>
        <div style="font-size: 0.85rem; color: var(--gold-light); margin-top: 0.3rem;">
          ${isPerfect ? '🌟 Tuyệt đối chính xác 100%! Bạn là một công dân số gương mẫu, thấm nhuần sâu sắc tư tưởng của Người.' : '👏 Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ 3 chặng trải nghiệm thực tế!'}
        </div>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn-secondary" id="replayStage3OnlyBtn" type="button" style="padding: 0.75rem 1.75rem; font-size: 0.95rem;">Làm lại Chặng 3</button>
        <button class="btn-secondary" id="replayStage2OnlyBtn" type="button" style="padding: 0.75rem 1.75rem; font-size: 0.95rem;">Làm lại Chặng 2</button>
        <button class="btn-gold" id="replayFullGameBtn" type="button" style="padding: 0.75rem 2.2rem; font-size: 1rem;">Chơi lại từ đầu (Chặng 1)</button>
      </div>
    `;

    document.getElementById('replayStage3OnlyBtn').addEventListener('click', () => restartStage(2));
    document.getElementById('replayStage2OnlyBtn').addEventListener('click', () => restartStage(1));
    document.getElementById('replayFullGameBtn').addEventListener('click', () => restartStage(0));
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

