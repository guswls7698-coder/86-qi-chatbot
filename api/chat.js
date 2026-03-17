return res.status(503).json({ error: '현재 서비스 점검 중입니다.' });
/ IP별 요청 횟수 저장 (서버 메모리)
const ipRequestMap = new Map();
 
function getRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1분
  const maxRequests = 10; // 1분에 최대 10회
 
  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
 
  const data = ipRequestMap.get(ip);
 
  // 시간 초과되면 리셋
  if (now > data.resetTime) {
    ipRequestMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
 
  // 횟수 초과
  if (data.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }
 
  data.count++;
  return { allowed: true, remaining: maxRequests - data.count };
}
 
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
  // ✅ Rate Limiting - IP당 1분에 10회 제한
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const rateLimit = getRateLimit(ip);
 
  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: '잠시 후 다시 시도해 주세요. (1분에 최대 10회 질문 가능)'
    });
  }
 
  try {
    const { question, sectionText, history } = req.body;
    if (!question) return res.status(400).json({ error: '질문이 없습니다.' });
 
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
 
    // ✅ 질문 길이 제한 (토큰 낭비 방지)
    if (question.length > 500) {
      return res.status(400).json({ error: '질문이 너무 길어요. 500자 이내로 입력해 주세요.' });
    }
 
    const systemInstruction = `당신은 칠곡경북대학교병원 86서 병동 간호사들의 업무를 돕는 AI 파트너입니다.
 
[절대 준수 규칙]
1. 반드시 아래 제공된 매뉴얼 데이터에 있는 내용만 답하세요. 매뉴얼에 없는 내용은 절대 답변하지 마세요.
2. 질문에서 물어본 것만 답하세요. 묻지 않은 내용은 포함하지 마세요.
3. 절차/방법/준비 질문 → 해당 항목만 번호 목록
4. 이유 질문(왜? 이유?) → 이유만
5. 확인 질문(맞아? 있어?) → 네/아니오 + 한 줄
6. 교수님 이름이 나오면 → 그 교수님 관련 내용에 ⭐ 표시, 나머지도 함께 안내
7. 최신 인계사항 있으면 → 📌 [날짜자 업데이트]로 구분해서 표시
8. 매뉴얼에 없으면 → "해당 내용은 매뉴얼에서 확인되지 않아요. 선임이나 담당의에게 확인 부탁드려요."
9. 말투: ~해요, ~입니다
10. 답변 끝에 출처 명시
 
${sectionText ? `[매뉴얼 데이터]\n${sectionText}` : ''}`;
 
    const contents = [
      ...(history || []).slice(-4),
      { role: 'user', parts: [{ text: question }] }
    ];
 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
 
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.1
        }
      })
    });
 
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || '알 수 없는 오류' });
 
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) return res.status(500).json({ error: '응답 내용이 없습니다.' });
 
    return res.status(200).json({ reply });
 
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
