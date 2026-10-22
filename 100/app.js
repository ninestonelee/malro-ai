/* 100세 인생 OS · 뉴그레이 랜딩 스크립트
   ─────────────────────────────────────────────
   아래 CONFIG만 고치면 연락처·일정·가격 문구와 신청서 접수처가 한 번에 바뀝니다. */
const CONFIG = {
  phone: '02-568-5773',
  kakaoChat: 'https://pf.kakao.com/_xlHCQG/chat',
  kakaoHome: 'https://pf.kakao.com/_xlHCQG',
  email: 'ninestone.lee@gmail.com',
  whenTalk: '11월 중, 강남권 (신청하신 분께 개별 안내)',
  priceTalk: '무료',
  priceOneday: '참가비는 특강에서 안내',
  priceFlagship: '참가비는 특강에서 안내',
  priceFaq: '인사이트 특강은 무료입니다. 원데이와 4주 과정 참가비는 특강에서 먼저 안내해 드리고, 신청은 그 뒤에 결정하시면 돼요.',
  // 구글폼에 바로 쌓고 싶을 때: 구글폼(모든 문항 단답·장문형)을 만들고 formResponse 주소와 entry 번호를 넣으세요.
  googleForm: {
    action: '',
    entries: { kind: '', who: '', name: '', phone: '', age: '', device: '', org: '', os: '', verbs: '', memo: '', src: '' }
  }
};

const VERBS = ['손주를 번쩍 안기', '여행 가방을 선반에 올리기', '친구와 한 시간 걷기', '계단으로 3층 오르기', '바닥에서 혼자 일어나기', '새 언어로 커피 주문하기', '노래 한 곡 외워 부르기', '멋지게 차려입고 모임 가기', '손주에게 내 이야기 들려주기', '내 사진으로 작은 전시 열기'];
const KIND_LABEL = { talk: '무료 인사이트 특강', oneday: '원데이 「100세 설계도」 대기', flagship: '4주 「100세 인생 OS」 대기', org: '기관·기업 특강 문의' };

const DEMOS = {
  body: [
    ['me', '나 30초에 의자에서 12번 일어났어. 무릎에 무리 없는 주 3회 20분 근력 루틴을 표로 짜 주고, 4주 뒤 다시 잴 날짜도 알려 줘.'],
    ['ai', '좋아요! 무릎에 부담이 적은 주 3회 루틴이에요.\n\n월·수·금, 20분\n① 의자에 앉았다 일어서기 10회 × 2세트\n② 벽 짚고 발뒤꿈치 들기 15회 × 2세트\n③ 의자 등받이 잡고 옆으로 다리 들기 좌우 10회\n④ 제자리 걷기 3분으로 마무리\n\n4주 뒤 같은 요일에 30초 기록을 다시 재 보세요.\n통증이나 어지럼이 있으면 바로 멈추시고, 운동 제한을 받으셨다면 의료진과 먼저 상의하세요.']
  ],
  food: [
    ['photo', '냉장고 사진\n두부 · 애호박 · 달걀 · 양파'],
    ['me', '이 재료로 싱겁고 덜 단 저녁 3가지, 5단계 이내로 알려 줘.'],
    ['ai', '사진 속 재료로 만들 수 있는 저녁이에요.\n\n① 두부 애호박 들기름 구이\n② 양파 달걀 스크램블과 잡곡밥\n③ 애호박 맑은 된장국 (된장은 반 숟가락)\n\n간은 다 익힌 뒤 마지막에 조금만, 단맛은 양파를 오래 볶아서 내 보세요. 어떤 것부터 순서를 알려 드릴까요?']
  ],
  brain: [
    ['me', '일본어로 커피 주문하는 한 문장 알려 주고, 내가 말하면 발음 고쳐 줘.'],
    ['ai', '이 한 문장이면 돼요.\n\n「コーヒーをひとつください。」\n코-히- 오 히토츠 쿠다사이\n"커피 한 잔 주세요"라는 뜻이에요.\n\n이제 말해 보세요. 들어 보고 고쳐 드릴게요.'],
    ['me', '코히 오 히토츠 쿠다사이'],
    ['ai', '아주 좋아요! "코히"를 "코-히-"처럼 길게 늘이면 완벽해요. 내일은 "물 주세요"를 배워 볼까요?']
  ],
  bond: [
    ['me', '다음 주 생일인 고등학교 친구 영수에게 보낼 따뜻하고 재치 있는 카드 문구 3개 써 줘. 같이 걷자는 약속도 넣어서.'],
    ['ai', '① 영수야, 생일 축하해! 50년 친구라는 게 제일 큰 선물이다. 다음 주 토요일, 한강 한 바퀴 걷고 국수 한 그릇 어때?\n\n② 나이는 숫자, 우정은 복리! 생일 축하한다. 이번 달엔 둘이 만 보 걷기 내기 하자. 진 사람이 커피.\n\n③ 생일 축하해, 영수야. 우리 100세 생일에도 같이 걷자. 연습은 다음 주부터!']
  ],
  style: [
    ['me', '흰머리가 잘 어울리는 옷 색 3가지와 동창 모임에 입고 갈 단정한 차림 2가지 추천해 줘.'],
    ['ai', '은발과 잘 어울리는 색이에요.\n① 짙은 남색: 은발이 더 또렷해 보여요\n② 버건디: 얼굴에 생기를 더해요\n③ 세이지 그린: 부드럽고 세련돼요\n\n동창 모임 차림\n• 남색 재킷 + 흰 셔츠 + 회색 바지, 포인트는 버건디 행커치프\n• 아이보리 니트 + 카멜 코트 + 짙은 청바지\n\n가지고 계신 옷을 알려 주시면 그 안에서 맞춰 드릴게요.']
  ],
  purpose: [
    ['me', '키케로가 되어 "노년은 즐거울 수 있는가"를 쉽게 설명해 줘.'],
    ['ai', '(AI가 키케로 역할로 답해요)\n\n벗이여, 사람들은 노년을 네 가지로 불평하지요. 일을 빼앗고, 몸을 약하게 하고, 즐거움을 줄이고, 죽음에 가깝다고요.\n\n하지만 큰일은 힘이 아니라 지혜와 경험으로 이룹니다. 노인은 다음 세대를 위해 나무를 심는 사람이지요.\n\n오늘 당신이 손주에게 심어 줄 나무 한 그루는 무엇인가요?'],
    ['me', '손주에게 수채화를 가르쳐 주고 싶어.'],
    ['ai', '멋진 나무네요! 손주와 함께할 30분 수채화 수업을 세 번으로 나눠 계획해 드릴까요?']
  ]
};

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const SRC = params.get('src') || params.get('utm_source') || 'web';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const copyText = async (t) => {
    try { await navigator.clipboard.writeText(t); return true; } catch (e) {
      const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e2) {}
      ta.remove(); return ok;
    }
  };

  /* 1. CONFIG 반영 */
  const telHref = 'tel:' + CONFIG.phone.replace(/[^0-9]/g, '');
  $$('[data-tel]').forEach(a => a.setAttribute('href', telHref));
  $$('[data-tel-text]').forEach(s => (s.textContent = CONFIG.phone));
  $$('[data-kakao]').forEach(a => a.setAttribute('href', a.closest('footer') ? CONFIG.kakaoHome : CONFIG.kakaoChat));
  $$('[data-mail]').forEach(a => a.setAttribute('href', 'mailto:' + CONFIG.email));
  $$('[data-when]').forEach(s => (s.textContent = CONFIG.whenTalk));
  $$('[data-price-talk]').forEach(s => (s.textContent = CONFIG.priceTalk));
  $$('[data-price-oneday]').forEach(s => (s.textContent = CONFIG.priceOneday));
  $$('[data-price-flagship]').forEach(s => (s.textContent = CONFIG.priceFlagship));
  $$('[data-price-faq]').forEach(s => (s.textContent = CONFIG.priceFaq));

  /* 2. 글자 크기 */
  const setFs = n => {
    document.documentElement.dataset.fs = n;
    $$('.fs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.fs === String(n))));
    store.set('ng100_fs', n);
  };
  $$('.fs button').forEach(b => b.addEventListener('click', () => setFs(b.dataset.fs)));
  setFs(store.get('ng100_fs', 1));

  /* 3. 숫자 올라가기 */
  const counters = $$('[data-count]');
  const runCount = el => {
    const target = parseFloat(el.dataset.count); const dec = parseInt(el.dataset.dec || '0', 10);
    const from = target > 1000 ? target - 10 : 0; const t0 = performance.now(); const dur = 1100;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur); const v = from + (target - from) * (1 - Math.pow(1 - p, 3));
      el.textContent = p < 1 ? v.toFixed(dec) : el.dataset.count;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { runCount(e.target); io.unobserve(e.target); } }), { threshold: .6 });
    counters.forEach(c => io.observe(c));
  }

  /* 4. 나의 2032년 */
  const by = $('#by'); const chipsEl = $('#verbChips'); const picked = [];
  by.innerHTML = '<option value="">태어난 해를 고르세요</option>' + Array.from({ length: 36 }, (_, i) => 1940 + i).map(y => `<option value="${y}">${y}년생</option>`).join('');
  const thisYear = new Date().getFullYear();
  const renderAges = () => {
    const y = parseInt(by.value, 10);
    $('#age27').textContent = y ? (2027 - y) + '세' : '-';
    $('#age32').textContent = y ? (2032 - y) + '세' : '-';
    $('#y100').textContent = y ? (y + 100) + '년' : '-';
    renderResult();
  };
  VERBS.forEach(v => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = v; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      const i = picked.indexOf(v);
      if (i >= 0) picked.splice(i, 1); else if (picked.length < 3) picked.push(v);
      renderChips(); renderResult();
    });
    chipsEl.appendChild(b);
  });
  const renderChips = () => {
    $$('.chip', chipsEl).forEach(b => {
      const on = picked.includes(b.textContent);
      b.setAttribute('aria-pressed', String(on)); b.disabled = !on && picked.length >= 3;
    });
    $('#pickCount').textContent = picked.length + '/3';
  };
  const promptText = () => {
    const y = parseInt(by.value, 10); const nowAge = y ? (thisYear - y) + '세인 ' : '';
    const list = picked.map((v, i) => '①②③'[i] + ' ' + v).join(' ');
    return `내가 100세에도 이것만은 계속하고 싶어: ${list}. ${nowAge}내가 지금부터 4주 동안 무엇부터 하면 좋을지, 하루 20분 이내로 무리 없는 계획을 짜 줘.`;
  };
  const renderResult = () => {
    const box = $('#myResult');
    if (!picked.length) { box.hidden = true; return; }
    box.hidden = false;
    $('#resList').innerHTML = picked.map(v => `<li>${v}</li>`).join('');
    $('#resPrompt').textContent = '"' + promptText() + '"';
  };
  by.addEventListener('change', renderAges);
  $('#copyPrompt').addEventListener('click', async e => {
    const ok = await copyText(promptText());
    const b = e.currentTarget; const old = b.innerHTML;
    b.textContent = ok ? '복사했어요' : '길게 눌러 복사해 주세요';
    setTimeout(() => (b.innerHTML = old), 1800);
  });
  $('#goApply').addEventListener('click', () => {
    const f = $('#applyForm'); f.verbs.value = picked.join(', ');
    setKind('talk');
  });

  /* 5. 퀴즈 */
  $$('.quiz-opts button').forEach(b => b.addEventListener('click', () => {
    $$('.quiz-opts button').forEach(x => x.classList.add(x.dataset.ok === '1' ? 'ok' : 'no'));
    $('#quizA').hidden = false;
  }));

  /* 6. 시연 */
  const chat = $('#chat'); let playToken = 0;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const addMsg = (type, text) => {
    const d = document.createElement('div');
    if (type === 'photo') { d.className = 'msg me photo'; const s = document.createElement('span'); s.textContent = text; d.appendChild(s); }
    else { d.className = 'msg ' + type; d.textContent = text; }
    chat.appendChild(d); chat.scrollTop = chat.scrollHeight;
  };
  const play = async key => {
    const token = ++playToken; chat.innerHTML = '';
    $$('.tabs [role="tab"]').forEach(t => t.setAttribute('aria-selected', String(t.dataset.demo === key)));
    for (const [type, text] of DEMOS[key]) {
      if (token !== playToken) return;
      if (reduce) { addMsg(type, text); continue; }
      if (type === 'ai') {
        const t = document.createElement('div'); t.className = 'typing'; t.innerHTML = '<i></i><i></i><i></i>';
        chat.appendChild(t); chat.scrollTop = chat.scrollHeight;
        await sleep(1100); if (token !== playToken) return; t.remove();
      } else { await sleep(450); if (token !== playToken) return; }
      addMsg(type, text);
      await sleep(type === 'ai' ? 900 : 300);
    }
  };
  $$('.tabs [role="tab"]').forEach(t => t.addEventListener('click', () => play(t.dataset.demo)));
  $$('.btn-demo').forEach(b => b.addEventListener('click', () => {
    $('#demo').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    play(b.dataset.demo);
  }));
  let demoStarted = false;
  if ('IntersectionObserver' in window) {
    const dio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && !demoStarted) { demoStarted = true; if (!chat.children.length) play('body'); dio.disconnect(); } }), { threshold: .35 });
    dio.observe($('.phone'));
  } else play('body');

  /* 7. 신청서 */
  const form = $('#applyForm'); const orgField = $('.org-only'); const err = $('#formErr');
  const setKind = k => {
    const r = form.querySelector(`input[name="kind"][value="${k}"]`); if (r) r.checked = true;
    syncKind();
  };
  const syncKind = () => {
    const k = form.kind.value; orgField.hidden = k !== 'org';
    if (k === 'org') form.querySelector('input[name="who"][value="기관 담당자"]').checked = true;
  };
  $$('input[name="kind"]', form).forEach(r => r.addEventListener('change', syncKind));
  $$('[data-pick]').forEach(a => a.addEventListener('click', () => setKind(a.dataset.pick)));

  const buildText = r => [
    '[100세 인생 OS 신청]',
    '신청: ' + KIND_LABEL[r.kind],
    '누가: ' + r.who,
    '이름: ' + r.name,
    '연락처: ' + r.phone,
    r.age && '연령대: ' + r.age,
    r.device && '휴대폰: ' + r.device,
    r.org && '기관: ' + r.org,
    r.os && '관심 OS: ' + r.os,
    r.verbs && '100세에도 하고 싶은 일: ' + r.verbs,
    r.memo && '하고 싶은 말: ' + r.memo,
    '(경로: ' + r.src + ')'
  ].filter(Boolean).join('\n');

  form.addEventListener('submit', async e => {
    e.preventDefault(); err.hidden = true;
    $$('.field', form).forEach(f => f.classList.remove('bad'));
    const phoneDigits = form.phone.value.replace(/[^0-9]/g, '');
    const problems = [];
    if (!form.name.value.trim()) { problems.push('이름'); form.name.closest('.field').classList.add('bad'); }
    if (phoneDigits.length < 9 || phoneDigits.length > 11) { problems.push('연락처'); form.phone.closest('.field').classList.add('bad'); }
    if (!form.consent.checked) problems.push('개인정보 동의');
    if (problems.length) { err.textContent = problems.join(', ') + '을(를) 확인해 주세요.'; err.hidden = false; err.scrollIntoView({ block: 'center' }); return; }
    const r = {
      kind: form.kind.value, who: form.who.value, name: form.name.value.trim(), phone: form.phone.value.trim(),
      age: form.age.value, device: form.device.value, org: form.kind.value === 'org' ? form.org.value.trim() : '',
      os: $$('input[name="os"]:checked', form).map(c => c.value).join(', '), verbs: form.verbs.value.trim(),
      memo: form.memo.value.trim(), src: SRC, ts: new Date().toISOString()
    };
    const saved = store.get('ng100_apps', []); saved.push(r); store.set('ng100_apps', saved);
    const text = buildText(r);
    let sent = false;
    if (CONFIG.googleForm.action) {
      try {
        const fd = new FormData();
        Object.entries(CONFIG.googleForm.entries).forEach(([k, id]) => { if (id) fd.append(id, k === 'kind' ? KIND_LABEL[r.kind] : (r[k] || '')); });
        await fetch(CONFIG.googleForm.action, { method: 'POST', mode: 'no-cors', body: fd }); sent = true;
      } catch (e2) { sent = false; }
    }
    const done = $('#done');
    $('#doneText').textContent = text;
    $('#doneMsg').textContent = sent ? '접수됐어요. 일정이 정해지면 문자로 먼저 알려 드릴게요. 아래 내용은 기록용이에요.' : '아래 셋 중 편한 방법으로 보내 주시면 접수가 끝납니다.';
    $('#doneMail').setAttribute('href', 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('[100세 인생 OS] ' + KIND_LABEL[r.kind]) + '&body=' + encodeURIComponent(text));
    done.hidden = false; done.focus(); done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });
  $('#doneKakao').addEventListener('click', async () => {
    await copyText($('#doneText').textContent);
    window.open(CONFIG.kakaoChat, '_blank', 'noopener');
  });
})();
