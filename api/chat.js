// =====================================================
// Vercel Serverless Function - 서버에서 Gemini 호출
// API 키가 클라이언트에 절대 노출되지 않습니다
// =====================================================
export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { question, sectionText, history } = req.body;

    if (!question) {
      return res.status(400).json({ error: '질문이 없습니다.' });
    }

    // API 키는 Vercel 환경변수에서 가져옴 (절대 노출 안됨)
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
    }

    const systemInstruction = `당신은 86서 병동 간호사들의 업무를 돕는 AI 파트너입니다.
아래 매뉴얼 데이터를 기반으로 질문에 정확하고 간결하게 답하세요.

규칙:
1. 반드시 제공된 매뉴얼 데이터에 있는 내용만 답하세요. 매뉴얼에 없는 내용은 절대 답변하지 마세요.
2. 질문에서 물어본 것만 답하세요. 묻지 않은 내용은 포함하지 마세요.
3. 절차/방법 질문 → 해당 항목만 번호 목록
4. 이유 질문 → 이유만
5. 확인 질문 → 네/아니오 + 한 줄
6. 교수님 이름이 나오면 → 그 교수님 관련 내용에 ⭐ 표시, 나머지도 함께 안내
7. 최신 인계사항이 있으면 → 📌 [날짜자 업데이트]로 구분해서 표시
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
          temperature: 0.1  // 낮은 temperature = 정확도 향상, 토큰 절감
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || '알 수 없는 오류'
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      return res.status(500).json({ error: '응답 내용이 없습니다.' });
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
