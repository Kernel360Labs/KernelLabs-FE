import { useState } from "react";
import { WORK_RECOMMEND_URL } from "../api";

const questions = [
  {
    key: "q1",
    question: "어떤 업무를 하나요?",
    options: [
      { label: "개발·코딩", value: "A" },
      { label: "문서 작성·리서치", value: "B" },
      { label: "회의·협업", value: "C" },
      { label: "전화·영상 통화", value: "D" },
    ],
  },
  {
    key: "q2",
    question: "하루 평균 업무 시간은 어느 정도인가요?",
    options: [
      { label: "1시간 이하", value: "A" },
      { label: "1~3시간", value: "B" },
      { label: "3~6시간", value: "C" },
      { label: "6~9시간", value: "D" },
      { label: "9시간 이상", value: "E" },
    ],
  },
  {
    key: "q3",
    question: "선호하는 분위기는 어떤가요? (사람 밀집도)",
    options: [
      { label: "완전 조용 (사람 거의 없음)", value: "A" },
      { label: "다소 여유로운 편", value: "B" },
      { label: "적당히 북적이는 편", value: "C" },
      { label: "활기찬 분위기 (사람 많음)", value: "D" },
    ],
  },
  {
    key: "q4",
    question: "조용한 위치를 좋아하나요, 관광지 근처를 좋아하나요?",
    options: [
      { label: "완전 조용한 외곽", value: "A" },
      { label: "조용하지만 관광지도 근접", value: "B" },
      { label: "관광지 한복판", value: "C" },
      { label: "상관없음", value: "D" },
    ],
  },
  {
    key: "q5",
    question: "독립된 장소가 필요하신가요?",
    options: [
      { label: "예", value: "A" },
      { label: "아니오", value: "B" },
    ],
  },
];

const WorkationSurveyPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(answers[questions[step].key] || null);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = async () => {
    const key = questions[step].key;
    const newAnswers = { ...answers, [key]: selected ?? "" };
    setAnswers(newAnswers);
    setSelected(null);
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelected(newAnswers[questions[step + 1].key] || null);
    } else {
      // 마지막 질문 답변 후 서버 요청
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const res = await fetch(WORK_RECOMMEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnswers),
        });
        if (!res.ok) throw new Error("서버 오류");
        const data = await res.json();
        setResult(data.data);
      } catch (e) {
        setError("추천 결과를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      const prevKey = questions[step - 1].key;
      setSelected(answers[prevKey] || null);
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: 60 }}>결과를 불러오는 중...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: 60 }}>{error}</div>;
  if (result)
    return (
      <div style={{ minHeight: "100vh", background: "#f4f9fc", padding: 0 }}>
        <div style={{ textAlign: "left", padding: "60px 0 32px 0", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>맞춤형 워케이션 추천 결과</div>
          <div style={{ color: "#666", fontSize: 18, marginBottom: 32 }}>
            입력하신 정보를 바탕으로 최적의 워케이션 장소를 추천해드립니다.
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
            {/* 입력 정보 요약 */}
            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", padding: 32, minWidth: 260, maxWidth: 320 }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>입력 정보 요약</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#222", fontSize: 16, lineHeight: 2 }}>
                <li>📝 <b>업무 유형</b><br />{answerToKorean.q1?.[answers.q1] || "-"}</li>
                <li>⏰ <b>평균 업무 시간</b><br />{answerToKorean.q2?.[answers.q2] || "-"}</li>
                <li>👥 <b>선호 분위기</b><br />{answerToKorean.q3?.[answers.q3] || "-"}</li>
                <li>📍 <b>위치 선호</b><br />{answerToKorean.q4?.[answers.q4] || "-"}</li>
                <li>🔒 <b>독립 공간 필요</b><br />{answerToKorean.q5?.[answers.q5] || "-"}</li>
              </ul>
            </div>
            {/* 추천 장소 카드 */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", padding: 40, minWidth: 340, maxWidth: 420, textAlign: "center", border: "2px solid #2196f3" }}>
                {/* 이미지 자리 */}
                <div style={{ width: 80, height: 80, background: "#f4f4f4", borderRadius: 12, margin: "0 auto 24px auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: 32 }}>
                  <span role="img" aria-label="장소">📍</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>{result.name}</div>
                <div style={{ color: "#222", fontSize: 17, marginBottom: 18 }}>{result.description}</div>
                <div style={{ color: "#2196f3", fontWeight: 500, fontSize: 16, marginBottom: 8 }}>유형: {result.type}</div>
                <div style={{ color: "#666", fontSize: 15 }}>{result.address}</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button style={{ padding: "14px 44px", fontSize: 18, borderRadius: 8, border: "none", background: "#222", color: "#fff", fontWeight: 600, cursor: "pointer" }} onClick={() => { setStep(0); setAnswers({}); setResult(null); setSelected(null); }}>다시 설문하기</button>
          </div>
        </div>
      </div>
    );

  const q = questions[step];
  return (
    <div style={{ minHeight: "100vh", background: "#f4f9fc" }}>
      <div style={{ textAlign: "center", paddingTop: 60, marginBottom: 40 }}>
        <div style={{ fontWeight: 700, fontSize: 32, marginTop: 12 }}>
          질문에 답해주세요 <span style={{ fontSize: 24, color: "#2196f3" }}>({step + 1}/{questions.length})</span>
        </div>
        <div style={{ color: "#666", marginTop: 12, fontSize: 18 }}>당신에게 딱 맞는 워케이션 장소를 찾아드립니다.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #0001", padding: 40, minWidth: 420, maxWidth: 480 }}>
          <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 32, textAlign: "center" }}>{q.question}</div>
          <form onSubmit={e => { e.preventDefault(); handleNext(); }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
              {q.options.map((opt) => (
                <label key={opt.value} style={{ display: "flex", alignItems: "center", fontSize: 18, cursor: "pointer", gap: 12 }}>
                  <input
                    type="radio"
                    name="option"
                    value={opt.value}
                    checked={selected === opt.value}
                    onChange={() => handleSelect(opt.value)}
                    style={{ width: 22, height: 22 }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 0}
                style={{
                  padding: "12px 32px",
                  fontSize: 16,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: step === 0 ? "#f4f4f4" : "#fff",
                  color: step === 0 ? "#bbb" : "#333",
                  cursor: step === 0 ? "not-allowed" : "pointer",
                  fontWeight: 500,
                }}
              >
                ← 이전
              </button>
              <button
                type="submit"
                disabled={!selected}
                style={{
                  padding: "12px 40px",
                  fontSize: 16,
                  borderRadius: 8,
                  border: "none",
                  background: selected ? "#2196f3" : "#bbb",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: selected ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                다음 →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 답변 한글 변환 매핑
const answerToKorean: { [key: string]: { [key: string]: string } } = {
  q1: {
    A: "개발·코딩",
    B: "문서 작성·리서치",
    C: "회의·협업",
    D: "전화·영상 통화",
  },
  q2: {
    A: "1시간 이하",
    B: "1~3시간",
    C: "3~6시간",
    D: "6~9시간",
    E: "9시간 이상",
  },
  q3: {
    A: "완전 조용 (사람 거의 없음)",
    B: "다소 여유로운 편",
    C: "적당히 북적이는 편",
    D: "활기찬 분위기 (사람 많음)",
  },
  q4: {
    A: "완전 조용한 외곽",
    B: "조용하지만 관광지도 근접",
    C: "관광지 한복판",
    D: "상관없음",
  },
  q5: {
    A: "예",
    B: "아니오",
  },
};

export default WorkationSurveyPage;
