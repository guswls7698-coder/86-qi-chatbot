// ====================================================
// 🔑 여기에 Gemini API 키 입력
// ====================================================
const API_KEY = "AIzaSyAjLi4GCP5obK3f_znwy_557eotpOnjpno";

// ====================================================
// 📋 86서 QI 매뉴얼 섹션 데이터
// ====================================================
const SECTIONS = {
  "RALP/RARP/RRP": `[비뇨기 - RALP/RARP/RRP 전립선절제술]
동의서: 수술동의서(의사), 마취동의서(의사), 수혈동의서(PA), PCA동의서(PA), 웰패스동의서(PA/최석환교수님만)
준비물: 복대(간호처방), 소변기(간호처방), 스타킹(의사처방)
수술전: 점심TD→저녁SD→C/W→MN NPO / 관장 수술전일 20시 / 스타킹 수술당일 2시간전 / IV 20G 전날 Evening / 72시간배뇨일지+설문지 스캔 / 자가약 keep여부 확인 / 수술체크리스트+수술전일지
수술후: HUO 1시간 30cc미만→Noti / 권태균교수님환자: 수술후 2시간뒤 Water/Juice가능 수면가능 / 권태균교수님 외 환자: 지시있을때까지 금식 / 익일 SOW가능 / 정재욱교수님환자: G/O시간 분단위까지 정확히 TPR입력(예:14:37)
주의: RALP SP면 수술부위 2개(하나JP) / 혈뇨 색 진해지면 notify / Lymphadenectomy시 JP양 급증주의 / 어깨옆구리통증=복강경가스 횡격막자극
드레싱: Mepilex 9x10,6x8 / 정규:URO PA / 주말:진료지원팀
재료대: Mepilex / A-line remove→애드플렉스 / H-vac·JP remove→blade,steri
퇴원: IPSS/OABSS/72HR배뇨일지 / 외래 2시간전 피검사 / 외래 1시간전 UFM/RU / 배에힘 6주삼가 / 일주일후 샤워가능
이유: 관장=장prep / 스타킹=혈전예방 / 복대=수술부위지지+복압감소 / 저녁죽+물=장비우기
최신인계: 최석환교수님 RARP퇴원환자 외래처방없음(2026.02.01) / RARP환자 퇴원날 RU 100미만이면 노티없이 퇴원가능(2026.03.03)`,

  "TURBT/TURP": `[비뇨기 - TURBT/TURP 경요도적방광절제술]
동의서: 수술동의서(의사), 마취동의서(의사)
준비물: 소변기(간호처방), 스타킹(의사처방)
수술전: MN NPO / 관장 전일 20시 / IV 20G 전날 Evening
수술후: 당일 6시간NPO후 W/J가능 익일SRR / foley balloning site 테이프로 막기 / penile gauze시 4시간뒤 noti없이 remove(PA) TPR기록 / 심한혈뇨지속시 보고
방광세척: saline 3000ml 의사처방 / 세척속도 회진시 소변양상 보고결정
퇴원: 배에힘주는행동삼가(계단,등산,자전거,무거운물건) / 물 하루2L / 소변참지말기 / 퇴원당일아침 Foley remove(PA) S/V확인후 퇴원
이유: penile gauze=요도부위 출혈많은경우 적용 / 관장=장prep / 스타킹=혈전예방
최신인계: SD→RD 식이상향시 X-ray일찍 지시처방없으면 컨펌없이 RD진행(2026.03.07)`,

  "RAPN/신장절제술": `[비뇨기 - RAPN/신장절제술]
동의서: 수술동의서, 마취동의서, 수혈동의서(PA), PCA동의서(PA), 웰패스동의서(PA/최석환교수님만), 부위표시(PA)
준비물: 복대, 소변기, 스타킹, 필요시SCD(혈전예방)
수술전: 점심TD→저녁SD→C/W→MN NPO / 관장 전일 20시 / IV 20G 전날 Evening
수술후: HUO 1시간 30cc미만→Noti / 지시있을때까지 금식 / 정재욱교수님환자: G/O시간 분단위까지 정확히 TPR입력
주의: 수술중 염료→urine 파란색가능 / JP로 파란색염료나오면 노티 / 배액관에 림프액·유미즙 배액가능
이유: 관장=장prep / 스타킹=혈전예방 / 복대=수술부위지지+복압감소
최신인계: 정재욱교수님환자 G/O시간 분단위까지 TPR입력(2026.02.01)`,

  "RC/IC/NB": `[비뇨기 - RC/IC/NB 방광절제술]
동의서: 수술동의서, 마취동의서, 수혈동의서, PCA동의서, 중심정맥관삽입동의서(PA), ICU입실동의서(PA)
준비물: 복대, 소변기, 스타킹, IC장루재료(간호처방)
수술전: 입원하자마자NPO / 관장 전일 20시 green enema / Duolax 2T(HS), Picosolution(13h,17h) / whole abdomen skin prep / IV 20G 입원하자마자
수술후: HUO 1시간 30cc미만→Noti / 식이시작시 유제품·그린비아 제외 / NB: Daily manual irrigation(의사)
기타: NB:CIC교육 / 저잔사죽 유지 / 요관부목 한달후 외래제거 / IC:장루교육 이고은(010-6488-2596)
이유: 입원하자마자NPO=회장잘라 neobladder만들거나 요루만들기때문에 금식+감염예방
최신인계: RC,RARP&Lymphadectomy,LRND,PLND만 유제품/그린비아 제외(2026.02.01)`,

  "CAG": `[순환기내과 - CAG 관상동맥조영술]
동의서: C2-관상동맥중재시술 동의서
시술전: 오전:MN NPO / 오후:아침연식후NPO / IV Lt.arm 20G+5%DWS / Aspirin/Plavix 미복용시 ASA400mg+Plavix300mg Loading / Both inguinal&Both radial skin prep / 환자팔찌·foley Lt위치 / 보청기착용후 시술방
시술후: Half saline 40cc/hr / 4hr뒤 EKG,Lab / N/V없으면 self voiding확인후 NPO해제
Radial: Core guard 4hr후제거(인턴, 김홍년교수님→TCS PA) / CAG만:3hr elevation / PCI:6hr elevation / 24hr 손·손목사용금지
Femoral: 6hr ABR / 24hr후 ambulation / 시술한다리 구부리지않도록
주의: Metformin 시술당일skip / eGFR≥60:다음날rekeep / eGFR<60:이틀뒤rekeep
담당PA: 박윤정교수님→IMC PA / 김홍년교수님→TCS PA
퇴원: 시술한팔 2주간 무리금지 / 반창고 다음날세안시제거 / 사타구니:샤워가능 통목욕은 외래전까지금지
이유: Metformin skip=조영제사용때문
최신인계: CAG SV확인후 식이진행(2026.02.01) / 김홍년교수님 정규처방없어도 문자하지마세요(2026.02.01) / 조영제 ADR있는환자 무조건 Dexa,avil 필요(2026.02.01) / 박윤정교수님:pre fluid NSaline, MTM중단불필요, femoral시술은shaving(2026.02.01)`,

  "Pacemaker/ICD/CRT": `[순환기내과 - Pacemaker/ICD/CRT]
PM동의서: C2-인공심장박동기삽입술 동의서
ICD동의서: C2-제세동기(ICD)삽입/교체 시술 동의서
ICD추가: aspirin·plavix 2일전stop / warfarin 7일전stop
공통준비: 오전:MN NPO / 오후:아침연식후NPO / 박윤정교수님환자 무조건 Lt.20G+50cm extension / Cefazolin 1g+NS100 시술직전주고remove / skin prep:both clavicle주변+femoral+radial
시술후: post EKG바로(ICD·CRT는 CXR추가) / 2hr ABR동안 sandbag apply / PM:Mepilex border 10x20 / ICD:Mepilex border 10x21
퇴원주의: 3~6개월 왼팔사용주의(머리감기가능,무거운것·팔번쩍드는행위금지) / MRI:업체검사후시행 / 물리치료가능,전기치료불가 / 외래오기전 씻거나소독X`,

  "EPS/AF Ablation": `[순환기내과 - EPS/AF Ablation]
동의서: C2-전기생리학검사및심방세동전극도자절제술 동의서
시술전: 오전오후 상관없이 MNNPO / AF시술:Remiva 2mg+Midazolam 15mg 또는 Pofol+Fentanyl+Midazolam(진정동의서필수) / Cefazolin시술직전 / antiplatelet stop확인 / TTE시술전확인 / Both femoral skin prep
시술후: post EKG바로 / puncture vein 4hr ABR / artery 6hr ABR / AF ablation후 MICU out
최신인계: EPS시술시 오전오후 상관없이 MNNPO(2026.02.27)`,

  "CABG/판막": `[흉부외과 - CABG/Valvuloplasty]
동의서: 수술동의서(의사), 마취동의서, 수혈동의서(PA), ICU입실동의서(PA), 중심정맥관삽입동의서(PA)
준비물: 헥시스왑티슈·베어로반 환자주기 / 항생제2개·알부민2개·메치솔1개·라식스1개(투약라벨뽑아수술실전달) / RBC 1pint 혈액운반통
수술전: MN NPO / IV Rt.arm 20G+50cm extension / 헥시스왑티슈로샤워(Chest·femoral잘닦기) / 3회 헥사메딘가글+코속베어로반도포(저녁식후·자기전·수술당일아침) / 수술당일:직전V/S / 키몸무게7AM재측정 / self voiding하지말고보내기
수술후: 중환자실연락전실 / chest bottle wall suction(40mmHg) / C/T drain 1회/duty 200이상→notify / 흉부지지대(EZ rap)착용확인 / ICU퇴실첫날:화장실만 보호자반드시상주(낙상다수)
Valvuloplasty추가: Chest tube빠지면 흉부외과용켈리(파란색플라스틱)으로잠그고notify / INR target에따라 와파린조절(21시복용)
이유: 헥사메딘가글·베어로반=코안상재균이 감염주원인→미리제거 / 헥시스왑=감염예방
최신인계: 수술in전 V/S,키몸무게 다시측정(2026.02.01) / TCS OP환자 radial피해서 line잡기(2026.02.01) / Night V/S skip 21H/7H측정(2026.02.01) / TCS drain(wall) 압20mmHg라도 40으로걸기(2026.02.01) / I/O환자 D+E fluid포함 +1000 안넘을시 PA notify(2026.03.07)`,

  "Heparization": `[순환기/공통 - Heparization 프로토콜]
6시간마다 aPTT f/u:
aPTT 40미만→2cc/hr증량
aPTT 40~49→1cc/hr증량
aPTT 50~75→유지
aPTT 76~85→1cc/hr감량
aPTT 86~100→2cc/hr감량
aPTT 101~150→3cc/hr감량
aPTT 150초과→즉시Noti!!!`,

  "시술/검사": `[비뇨기 시술/검사]
PCN(경피적신루): MNNPO / Pethidine 25mg 전날E / IV 22G / 당일6H NSL / TD식이 / 출혈관찰 / POST KUB / 격일간드레싱 / 퇴원:leg bag교체+self dressing교육 / 장소:6동지하1층 혈관중재실
D-J insertion: MNNPO / Pethidine 25mg 전날E / IV 22G / 당일6H NSL / TD식이 / POST KUB / 3개월간격교체 / 장소:6동지하1층 혈관중재실
RFA: MNNPO / BC Morphine sulfate 5mg/5ml 2@ 전날E / NSL 2개 전날얼려놓기 / 시술시 100cc/hr / 장소:2동 12CT실 13시30분 Fix
Renal Bx: MN NPO→6시간NPO후 W/J / Pethidine 25mg 전날E / ABR+sand bag apply / 출혈혈종확인 / post x-ray,lab / 퇴원후 이틀간 self dressing재료제공
Prostate Bx: MNNPO / ABx Bx전에맞기 / 생검후 2시간뒤 PSA lab / 4시간 앉아서지혈 / 미주신경반응주의(어지러움,식은땀,혈압저하) / 병리바코드 뽑으면안됨 / 이동시W/C
최신인계: PCN(leg bag chx)는 담당간호사 PA job X(2026.02.01) / 퇴원후 외래검사처방시(RGU,Cysto등) 통합예약에 예약하고가도록(2026.02.27)`,

  "공통/검사": `[공통 인계 및 검사]
EKG: 라벨 0시 넘어서 출력(그전뽑으면 당일연동안됨)(2026.02.01) / ABGA 오전8시전으로 진료지원팀call(dx시간겹침)(2026.02.01)
처방코드: infusion수액세트용 dose:E45250014(2026.02.01) / Chemo port 케모포트 신형:power loc 20G(2026.03.09)
기타: 항암주사샘 call전에 필터등 재료준비 확인(2026.02.01) / 원외처방전 암환자 산정특례코드(V193) 기록필요(2026.02.01) / IMC TCS BST 지시없어도 DM있으면 QID(2026.02.01)
PET-CT: 6hr NPO 물만가능(1L) / 22G / 검사6시간전 TPN·Dextrose·Corticosteroid stop / 4시간전 BST>200시 Notify / Humalog금지 / 장소:2동지하1층 핵의학검사실
MIBI: 6hr NPO / IV Lt.arm 22G / 삶은계란2개+흰우유2개(무지방·저지방·두유불가) / 24시간전 카페인·흡연금지 / 이소켓·NTG skip / 당뇨약·인슐린금지 / 장소:3동 핵의학센터(3310)`,

  "연락처": `[주요연락처]
진료지원팀:82944 / TCS PA 김수정B:85663·01066016070 / URO 배정수/김주영:7841 / URO 박동진/주효진:87305
ENT 성효연(PA):3046 / IMHO 오유진:3851 / IMC 황예지:010-4105-5198 / NEU 김지아:83272
OS 도창은:87263 / OS 석상민:87273 / GS 권혁진PA:010-2646-9215 / NS 최상민(척추):010-4110-8881
장루교육 이고은:010-6488-2596(내선83078) / 상처소독PA 엄지우:010-2524-9040 / SCD기:010-5093-8350
앰뷸런스:053-423-0119 / 통역:010-4859-8585
PM Saint Jude:010-5544-2491 / PM 메드트로닉:010-6265-9085 / PM 보스톤:010-9706-7888 / ICD 바이오트로닉:010-9692-5542
요루 황태원:010-8504-6085 / BST기계고장:7315 / X-ray E/N:7352 / CT예약(~22h):7361 / CT예약(22h이후·주말):7368
흉부외과 1st call 오탁혁:ID 05046 PW sdf456456++ / Nebulizer렌탈(보령):1577-9661`
};

// ====================================================
// 섹션 찾기
// ====================================================
function findSection(q) {
  const qn = q.toLowerCase().replace(/\s/g, "");
  const rules = [
    { keys: ["ralp","rarp","rrp","전립선","웰패스","권태균","최석환"], sec: "RALP/RARP/RRP" },
    { keys: ["turbt","turp","방광종양","방광절제","penile","방광세척"], sec: "TURBT/TURP" },
    { keys: ["rapn","신장절제","adrenalectomy","정재욱","가스아웃","g/o"], sec: "RAPN/신장절제술" },
    { keys: ["rc","neobladder","nb","장루","cic","방광재건"], sec: "RC/IC/NB" },
    { keys: ["cag","관상동맥조영","코어가드","김홍년","박윤정","metformin","메트포민"], sec: "CAG" },
    { keys: ["pacemaker","pm삽입","icd","crt","심박동기","제세동기"], sec: "Pacemaker/ICD/CRT" },
    { keys: ["eps","ablation","심방세동","af","paf"], sec: "EPS/AF Ablation" },
    { keys: ["cabg","관상동맥우회","valvuloplasty","판막","헥사메딘","베어로반","와파린","흉부외과"], sec: "CABG/판막" },
    { keys: ["heparization","헤파린","aptt"], sec: "Heparization" },
    { keys: ["pcn","신루","d-j","요관부목","rfa","renal bx","prostate bx","전립선생검"], sec: "시술/검사" },
    { keys: ["연락처","전화번호","내선","번호"], sec: "연락처" },
    { keys: ["ekg","라벨","abga","항암","처방코드","pet","mibi","인계"], sec: "공통/검사" },
  ];
  for (const r of rules) {
    if (r.keys.some(k => qn.includes(k.replace(/\s/g,"")))) return r.sec;
  }
  return null;
}

// ====================================================
// Gemini API 호출
// ====================================================
const chatHistory = [];
let lastSection = "";

async function callGemini(question, sectionText) {
  const systemInstruction = `당신은 86서 병동 간호사들의 업무를 돕는 AI 파트너입니다.
아래 매뉴얼 데이터를 기반으로 질문에 정확하고 간결하게 답하세요.

규칙:
1. 질문에서 물어본 것만 답하세요. 묻지 않은 내용은 절대 포함하지 마세요.
2. 절차/방법 질문("뭐해?","준비?","언제?","식이?","식사?") → 해당 항목만 번호 목록
3. 이유 질문("왜?","이유?") → 이유만
4. 확인 질문("맞아?","있어?","해?") → 네/아니오 + 한 줄
5. 교수님 이름이 나오면 → 그 교수님 관련 내용에 ⭐ 표시, 나머지도 함께 안내
6. 최신 인계사항이 있으면 → 📌 [날짜자 업데이트]로 구분해서 표시
7. 매뉴얼에 없으면 → "해당 내용은 매뉴얼에서 확인되지 않아요. 선임이나 담당의에게 확인 부탁드려요."
8. 말투: ~해요, ~입니다
9. 답변 끝에 출처 명시 (예: 출처: 비뇨기 시트 / 기타 인계)

${sectionText ? `[매뉴얼 데이터]\n${sectionText}` : ""}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const contents = [
    ...chatHistory.slice(-6),
    { role: "user", parts: [{ text: question }] }
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents: contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.3 }
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) throw new Error("응답 내용 없음");
  return reply;
}

// ====================================================
// UI 함수
// ====================================================
function getTime() {
  return new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

function addBubble(role, text) {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = `bubble ${role}`;
  div.innerHTML = `
    <div class="avatar">${role === "bot" ? "🏥" : "👩‍⚕️"}</div>
    <div class="text">${text}<div class="time">${getTime()}</div></div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

function addLoading() {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "bubble bot";
  div.id = "loading";
  div.innerHTML = `
    <div class="avatar">🏥</div>
    <div class="loading-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeLoading() {
  const el = document.getElementById("loading");
  if (el) el.remove();
}

async function sendMessage() {
  const input = document.getElementById("inputText");
  const q = input.value.trim();
  if (!q) return;

  input.value = "";
  input.style.height = "auto";
  document.getElementById("sendBtn").disabled = true;

  addBubble("user", q);
  addLoading();

  // 후속 질문 처리
  const isFollowUp = /다른|그 외|그외|나머지|그러면|그럼/.test(q);
  const secKey = findSection(q) || (isFollowUp ? lastSection : null);
  if (secKey) lastSection = secKey;
  const sectionText = secKey ? SECTIONS[secKey] : null;

  try {
    const reply = await callGemini(q, sectionText);
    removeLoading();
    addBubble("bot", reply.replace(/\n/g, "<br>"));
    chatHistory.push(
      { role: "user", parts: [{ text: q }] },
      { role: "model", parts: [{ text: reply }] }
    );
    if (chatHistory.length > 12) chatHistory.splice(0, 2);
  } catch (e) {
    removeLoading();
    addBubble("bot", `⚠️ 오류가 발생했어요: ${e.message}<br>잠시 후 다시 시도해 주세요.`);
  }

  document.getElementById("sendBtn").disabled = false;
}

function sendQuick(text) {
  document.getElementById("inputText").value = text;
  sendMessage();
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 80) + "px";
}
