/* 말로 하는 AI 교실 (가칭) · 고객용 랜딩 스크립트
   ─────────────────────────────────────────────
   아래 CONFIG만 고치면 전화번호·카톡·일정·비용 문구와 신청서 접수처가 한 번에 바뀝니다. */
const CONFIG = {
  phone: '02-568-5773',
  kakaoChat: 'https://pf.kakao.com/_xlHCQG/chat',
  kakaoHome: 'https://pf.kakao.com/_xlHCQG',
  email: 'ninestone.lee@gmail.com',
  when: '11월 중, 강남권 (신청하신 분께 개별 안내)',
  price: '체험 모임 무료',
  priceFaq: '체험 모임은 무료입니다. 정규 과정 비용은 체험에 오신 분들 의견을 듣고 정한 뒤 미리 알려 드려요.',
  // 구글폼에 바로 쌓고 싶을 때: 구글폼(모든 문항 '단답형/장문형')을 만들고 formResponse 주소와 entry 번호를 넣으세요.
  googleForm: {
    action: '', // 예) 'https://docs.google.com/forms/d/e/1FAIpQL.../formResponse'
    entries: { who: '', name: '', phone: '', want: '', time: '', device: '', story: '', src: '' }
  }
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

  /* 1. CONFIG 반영 */
  const telHref = 'tel:' + CONFIG.phone.replace(/[^0-9]/g, '');
  $$('[data-tel]').forEach(a => a.setAttribute('href', telHref));
  $$('[data-tel-text]').forEach(s => (s.textContent = CONFIG.phone));
  $$('[data-kakao]').forEach(a => a.setAttribute('href', a.closest('footer') ? CONFIG.kakaoHome : CONFIG.kakaoChat));
  $$('[data-when]').forEach(s => (s.textContent = CONFIG.when));
  $$('[data-price]').forEach(s => (s.textContent = CONFIG.price));
  $$('[data-price-faq]').forEach(s => (s.textContent = CONFIG.priceFaq));

  /* 2. 글자 크기 */
  const setFs = n => {
    document.documentElement.dataset.fs = n;
    $$('.fs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.fs === String(n))));
    store.set('malro_fs', n);
  };
  $$('.fs button').forEach(b => b.addEventListener('click', () => setFs(b.dataset.fs)));
  setFs(store.get('malro_fs', '1'));

  /* 3. 시연 데이터 */
  const DEMOS = {
    card: {
      title: '손주 생일카드', want: '손주 생일카드', tool: '카카오톡 안의 ChatGPT · 갤럭시 Gemini',
      say: '"일곱 살 손자 지우 생일카드 그려 줘. 공룡을 좋아해. 크레파스 그림 느낌으로."',
      msgs: [
        { me: '일곱 살 손자 지우 생일카드 그려 줘. 공룡을 좋아해. 크레파스 그림 느낌으로.' },
        { ai: '지우를 위한 공룡 생일카드를 만들었어요!', img: 'assets/card.jpg', alt: '공룡이 풍선을 든 생일카드 예시' },
        { me: '카드랑 같이 보낼 축하 말도 세 줄로 써 줘.' },
        { ai: '지우야, 일곱 번째 생일 정말 축하해!<br>공룡처럼 씩씩하고 튼튼하게 자라렴.<br>할머니가 지우를 아주 많이 사랑해.' }
      ]
    },
    fridge: {
      title: '냉장고 재료로 오늘 반찬', want: '냉장고 재료로 오늘 반찬', tool: '갤럭시 Gemini 카메라 · 카카오톡 ChatGPT에 사진 보내기',
      say: '"냉장고 사진 보여 줄게. 이걸로 15분 안에 만들 반찬 두 가지 알려 줘. 짜지 않게."',
      msgs: [
        { me: '이걸로 15분 안에 만들 수 있는 반찬 두 가지 알려 줘. 짜지 않게.', img: 'assets/fridge.jpg', alt: '애호박, 두부, 대파, 달걀, 김치가 있는 냉장고 사진 예시' },
        { ai: '애호박, 두부, 대파, 달걀이 보여요.<br><b>① 애호박 두부 된장찌개</b> (약 12분)<br><b>② 대파 달걀말이</b> (약 8분)<br>된장을 반 숟가락만 넣으면 덜 짜요.' },
        { ai: '혈압이나 당뇨 때문에 드시는 음식이 정해져 있다면, 간과 양은 의사 선생님 말씀을 먼저 따르세요.' }
      ]
    },
    memoir: {
      title: '내 옛이야기 한 페이지', want: '내 옛이야기 한 페이지', tool: '갤럭시 Gemini · 카카오톡 ChatGPT (마이크로 말하기)',
      say: '"내 어릴 적 운동회 이야기를 할게. 내가 말한 것만 가지고 손주가 읽기 쉬운 한 페이지로 정리해 줘."',
      msgs: [
        { me: '(말로 2분) 국민학교 가을 운동회 때 내가 이어달리기 마지막 주자였어. 어머니가 은행나무 아래서 손을 흔드셨지. 손주가 읽기 쉽게 한 페이지로 정리해 줘.' },
        { ai: '<b>「가을 운동회, 마지막 주자」</b><br>할아버지가 국민학교에 다니던 어느 가을, 운동회 이어달리기의 마지막 주자가 되었단다. 바통을 받자마자 흙먼지 날리는 운동장을 힘껏 달렸지. 노란 은행나무 아래에서 어머니가 손을 흔들고 계셨어. 그날 할아버지는 1등으로 들어왔단다.', img: 'assets/memoir.jpg', alt: '옛날 시골 학교 가을 운동회 그림 예시' },
        { me: '1등 했다는 말은 안 했어. 그건 빼 줘.' },
        { ai: '네, 말씀하지 않은 내용은 빼고 다시 정리했어요. 이렇게 <b>내가 안 한 말이 들어갔는지 확인하는 것</b>도 수업에서 같이 연습해요.' }
      ]
    },
    outing: {
      title: '말로 나들이 계획', want: '말로 나들이 계획', tool: '네이버 앱 AI 검색 · 카카오톡 ChatGPT',
      say: '"이번 토요일에 아내랑 단풍 보러 가고 싶어. 무릎이 안 좋으니 많이 안 걷고, 지하철로 갈 수 있는 곳으로."',
      msgs: [
        { me: '이번 토요일에 아내랑 단풍 보러 가고 싶어. 무릎이 안 좋으니까 많이 안 걷고, 지하철로 갈 수 있는 곳으로 일정 짜 줘.' },
        { ai: '계단이 적은 강변 평지 코스로 짜 봤어요.', plan: [['10:00', '지하철로 출발 (엘리베이터 있는 출구)'], ['11:00', '강변 평지 산책 30분, 중간에 벤치에서 쉬기'], ['12:00', '근처 한식당에서 점심'], ['13:30', '강이 보이는 카페에서 쉬기'], ['15:30', '천천히 귀가']], img: 'assets/outing.jpg', alt: '단풍길 강변 산책 그림 예시' },
        { ai: '가시기 전에 운영 시간과 휴무일은 꼭 다시 확인하세요.' }
      ]
    },
    song: {
      title: '나만의 노래 만들기', want: '나만의 노래 만들기', tool: '갤럭시 Gemini 음악 만들기 (만 18세 이상 계정)',
      say: '"고향 바닷가를 그리워하는 노래 만들어 줘. 트로트 느낌으로, \'고맙다\'는 말을 넣어서."',
      msgs: [
        { me: '고향 바닷가를 그리워하는 노래 만들어 줘. 트로트 느낌으로, 고맙다는 말을 꼭 넣어서.' },
        { ai: '1분짜리 노래가 만들어졌어요. 가사는 이렇게 나왔어요.', img: 'assets/song.jpg', alt: '노을 진 바닷가 마을 그림. 노래 표지 예시', lyrics: '<b>「노을 진 고향 바다」</b><br>노을 진 바닷가 작은 배 하나<br>어머니 부르던 그 목소리<br>먼 길 돌아와 이제야 말하네<br>고맙다 고맙다 내 고향아' },
        { me: '이 노래 우리 가족 단톡방에 보내 줘.' }
      ]
    },
    notice: {
      title: '긴 안내문 쉽게 읽기', want: '긴 안내문 쉽게 읽기', tool: '카카오톡 ChatGPT에 사진 보내기 · 갤럭시 Gemini 카메라',
      say: '"이 안내문에서 내가 꼭 해야 할 일, 날짜, 준비물만 세 줄로 알려 줘."',
      msgs: [
        { me: '(안내문 사진) 내가 꼭 해야 할 일, 날짜, 준비물만 세 줄로 알려 줘.', doc: true },
        { ai: '<b>① 할 일:</b> 건강검진 받기 (병원에 미리 예약)<br><b>② 날짜:</b> 12월 31일까지<br><b>③ 준비물:</b> 신분증, 미리 적은 문진표' },
        { ai: '날짜와 금액은 안내문 원본에서 한 번 더 확인하세요. AI 요약은 원문을 찾아가는 지도예요.' }
      ]
    }
  };

  const DOC_HTML = '<div class="notice-doc" aria-label="안내문 사진 예시">○○ 건강검진 안내<br>귀하의 건강 증진을 위하여 아래와 같이 검진 대상자임을 알려 드리며, 검진 항목 및 검진 기관 등 자세한 사항은 동봉된 안내서를 참고하시기 바랍니다. <span class="hl">검진 기한: 12월 31일까지</span> 기한 내 미수검 시 다음 해로 이월되지 않을 수 있으며, 일부 항목은 추가 비용이 발생할 수 있습니다. 검진 전날 저녁 9시 이후 금식하시고, <span class="hl">신분증과 문진표를 지참</span>하여 주시기 바랍니다. 문진표는 사전에 작성하시면 대기 시간이 줄어듭니다. <span class="hl">검진 기관에 미리 예약</span> 후 방문하시기 바랍니다. 문의: 고객센터</div>';

  const msgsEl = $('#msgs');
  let playToken = 0;
  let current = 'card';
  const wants = new Set(store.get('malro_wants', []));

  function bubble(m) {
    const d = document.createElement('div');
    const isMe = 'me' in m;
    d.className = 'msg ' + (isMe ? 'me' : 'ai');
    let html = '<span class="who">' + (isMe ? '나 (말로 부탁)' : 'AI') + '</span>';
    html += isMe ? m.me : m.ai;
    if (m.doc) html += DOC_HTML;
    if (m.plan) html += '<ul class="plan">' + m.plan.map(p => '<li><b>' + p[0] + '</b> ' + p[1] + '</li>').join('') + '</ul>';
    if (m.lyrics) html += '<div class="lyrics">' + m.lyrics + '</div>';
    if (m.img) html += '<img src="' + m.img + '" alt="' + (m.alt || '') + '" loading="lazy">';
    d.innerHTML = html;
    return d;
  }
  const wait = ms => new Promise(r => setTimeout(r, ms));

  async function play(key) {
    const token = ++playToken;
    const demo = DEMOS[key];
    current = key;
    msgsEl.innerHTML = '';
    $('#screen-title').textContent = demo.title;
    $('#say-text').textContent = demo.say;
    $('#tool-tag').textContent = '도구: ' + demo.tool;
    syncHeart();
    $$('.chip').forEach(c => c.setAttribute('aria-selected', String(c.dataset.demo === key)));
    for (const m of demo.msgs) {
      if (token !== playToken) return;
      if (!reduce && 'ai' in m) {
        const t = document.createElement('div');
        t.className = 'msg ai show';
        t.innerHTML = '<span class="typing" aria-label="AI가 쓰는 중"><i></i><i></i><i></i></span>';
        msgsEl.appendChild(t);
        msgsEl.scrollTop = msgsEl.scrollHeight;
        await wait(850);
        if (token !== playToken) return;
        t.remove();
      }
      const b = bubble(m);
      msgsEl.appendChild(b);
      const imgEl = b.querySelector('img'); if (imgEl) imgEl.addEventListener('load', () => { msgsEl.scrollTop = msgsEl.scrollHeight; });
      msgsEl.scrollTop = msgsEl.scrollHeight;
      if (reduce) b.classList.add('show'); else { requestAnimationFrame(() => b.classList.add('show')); await wait(900); }
    }
  }

  $$('.chip').forEach(c => c.addEventListener('click', () => play(c.dataset.demo)));

  /* 4. 하트(해 보고 싶어요) ↔ 신청서 체크 연동 */
  function syncHeart() {
    const on = wants.has(DEMOS[current].want);
    $('#heart-btn').setAttribute('aria-pressed', String(on));
    $('#heart-label').textContent = on ? '해 보고 싶어요 (선택됨)' : '이거 해 보고 싶어요';
    $$('.chip').forEach(c => c.classList.toggle('liked', wants.has(DEMOS[c.dataset.demo].want)));
    $$('#want-choices input').forEach(i => (i.checked = wants.has(i.value)));
    store.set('malro_wants', Array.from(wants));
  }
  $('#heart-btn').addEventListener('click', () => {
    const w = DEMOS[current].want;
    wants.has(w) ? wants.delete(w) : wants.add(w);
    syncHeart();
  });
  $$('#want-choices input').forEach(i => i.addEventListener('change', () => {
    i.checked ? wants.add(i.value) : wants.delete(i.value);
    syncHeart();
  }));

  /* 5. 신청 대상 미리 고르기 */
  const nameLabel = $('#name-label');
  function onWho() {
    const v = ($('input[name=who]:checked') || {}).value;
    nameLabel.textContent = v === '기관 담당자' ? '기관명과 담당자 성함' : v === '가족이 대신' ? '부모님 성함 (신청하시는 분 성함도 함께)' : '성함';
  }
  $$('input[name=who]').forEach(r => r.addEventListener('change', onWho));
  $$('[data-who]').forEach(a => a.addEventListener('click', () => {
    const val = a.dataset.who === 'org' ? '기관 담당자' : '가족이 대신';
    const r = $('input[name=who][value="' + val + '"]');
    if (r) { r.checked = true; onWho(); }
  }));

  /* 6. 신청서 제출 */
  const form = $('#apply-form');
  const done = $('#done');
  function fieldErr(id, bad) { $('#' + id).classList.toggle('has-err', bad); return bad; }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form);
    if (fd.get('website')) return; // 스팸 방지
    const name = (fd.get('name') || '').trim();
    const phoneDigits = (fd.get('phone') || '').replace(/[^0-9]/g, '');
    let bad = false;
    bad = fieldErr('f-name', !name) || bad;
    bad = fieldErr('f-phone', phoneDigits.length < 9 || phoneDigits.length > 11) || bad;
    bad = fieldErr('f-consent', !$('#agree').checked) || bad;
    if (bad) { const first = $('.has-err input'); if (first) first.focus(); return; }

    const data = {
      who: fd.get('who') || '', name, phone: fd.get('phone').trim(),
      want: fd.getAll('want').join(', '), time: fd.getAll('time').join(', '),
      device: fd.get('device') || '', story: (fd.get('story') || '').trim(), src: SRC
    };
    const text = '[체험 모임 신청]\n신청: ' + data.who + '\n성함: ' + data.name + '\n연락처: ' + data.phone +
      (data.want ? '\n해 보고 싶은 것: ' + data.want : '') + (data.time ? '\n편한 시간: ' + data.time : '') +
      (data.device ? '\n휴대폰: ' + data.device : '') + (data.story ? '\n지난주 부탁한 일: ' + data.story : '') +
      '\n(개인정보 수집·이용 동의함)';

    const gf = CONFIG.googleForm;
    let sent = false;
    if (gf.action && gf.entries.name && gf.entries.phone) {
      try {
        const body = new URLSearchParams();
        Object.keys(gf.entries).forEach(k => { if (gf.entries[k]) body.append(gf.entries[k], data[k] || ''); });
        await fetch(gf.action, { method: 'POST', mode: 'no-cors', body });
        sent = true;
      } catch (err) { sent = false; }
    }
    form.style.display = 'none';
    done.classList.add('show');
    const btns = $('#done-btns');
    btns.innerHTML = '';
    if (sent) {
      $('#done-title').textContent = '신청이 접수됐어요. 고맙습니다!';
      $('#done-text').textContent = '2~3일 안에 ' + CONFIG.phone + ' 번호로 전화드려 날짜와 장소를 안내해 드릴게요.';
    } else {
      $('#done-title').textContent = '거의 다 됐어요!';
      $('#done-text').textContent = '아래 버튼 중 편한 방법으로 보내 주시면 신청이 끝나요. 카카오톡 버튼을 누르면 신청 내용이 복사되니, 대화창에 붙여 넣고 보내 주세요.';
      const k = document.createElement('a');
      k.className = 'btn btn-kakao btn-block'; k.href = CONFIG.kakaoChat; k.target = '_blank'; k.rel = 'noopener';
      k.innerHTML = '<svg><use href="#i-chat"/></svg>카카오톡으로 보내기 (내용 복사)';
      k.addEventListener('click', () => { if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {}); });
      const t = document.createElement('a');
      t.className = 'btn btn-primary btn-block'; t.href = telHref;
      t.innerHTML = '<svg><use href="#i-phone"/></svg>전화로 신청하기 ' + CONFIG.phone;
      const m = document.createElement('a');
      m.className = 'btn btn-line btn-block';
      m.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('[체험 모임 신청] ' + data.name) + '&body=' + encodeURIComponent(text);
      m.innerHTML = '<svg><use href="#i-send"/></svg>이메일로 보내기';
      btns.append(k, t, m);
      const cb = $('#copybox'); cb.hidden = false; cb.textContent = text;
    }
    store.set('malro_last_apply', { at: new Date().toISOString(), src: SRC, sent });
    done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });

  /* 시작 */
  syncHeart();
  play('card');
})();
