import { useState, useEffect } from "react";
import { POLICIES_URL } from "../api";

const logoColor = "#6CB33F";

interface PolicyData {
  status: string;
  code: string;
  message: string;
  data: {
    policy: string;
  };
}

const AboutPage = () => {
  const [policyData, setPolicyData] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const response = await fetch(POLICIES_URL);
        if (!response.ok) {
          throw new Error('정책 정보를 가져오는데 실패했습니다.');
        }
        const data: PolicyData = await response.json();
        setPolicyData(data.data.policy);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // 마크다운 텍스트를 HTML로 변환하는 함수
  const parseMarkdown = (text: string) => {
    return text
      // 제목 처리
      .replace(/### \*\*(.*?)\*\*/g, '<h3 style="color: #6CB33F; margin-top: 2rem; margin-bottom: 1rem; font-size: 1.3rem; border-bottom: 2px solid #6CB33F; padding-bottom: 0.5rem;">$1</h3>')
      .replace(/### (.*?)\n/g, '<h3 style="color: #6CB33F; margin-top: 2rem; margin-bottom: 1rem; font-size: 1.3rem; border-bottom: 2px solid #6CB33F; padding-bottom: 0.5rem;">$1</h3>')
      
      // 굵은 텍스트 처리
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #2c5530;">$1</strong>')
      
      // 기울임 텍스트 처리
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // 리스트 항목 처리
      .replace(/\* {3}\*\*(.*?)\*\*/g, '<li style="margin-bottom: 0.5rem;"><strong style="color: #2c5530;">$1</strong>')
      .replace(/\* {3}(.*?)\n/g, '<li style="margin-bottom: 0.5rem;">$1</li>')
      
      // 구분선 처리
      .replace(/—\n/g, '<hr style="border: none; border-top: 1px solid #ddd; margin: 2rem 0;">')
      
      // 단락 처리
      .replace(/\n\n/g, '</p><p style="margin-bottom: 1rem;">')
      .replace(/\n/g, '<br>')
      
      // 시작과 끝에 p 태그 추가
      .replace(/^/, '<p style="margin-bottom: 1rem;">')
      .replace(/$/, '</p>');
  };

  if (loading) {
    return (
      <div
        style={{
          maxWidth: 900,
          margin: "2rem auto",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            background: "#f8fff4",
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(108,179,63,0.15)",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <div style={{ color: logoColor, fontSize: "1.3rem", fontWeight: 500 }}>
            📋 정책 정보를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: 900,
          margin: "2rem auto",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            background: "#f8fff4",
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(108,179,63,0.15)",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#e74c3c", fontSize: "1.3rem", fontWeight: 500 }}>
            ❌ 오류: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        padding: "0 1rem",
      }}
    >
      <div
        style={{
          background: "#f8fff4",
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(108,179,63,0.15)",
          overflow: "hidden",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${logoColor}, #4a7c59)`,
            color: "white",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontWeight: 700,
              fontSize: "2.2rem",
              margin: 0,
              marginBottom: "0.5rem",
            }}
          >
            의성군 정착 지원 정책
          </h1>
          <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.9 }}>
            의성군으로 이주하시는 분들을 위한 다양한 혜택과 지원 정보
          </p>
        </div>

        {/* 콘텐츠 */}
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              color: "#333",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(policyData)
            }}
          />
          
          {/* 참고 사항 */}
          <div
            style={{
              marginTop: 32,
              padding: 20,
              background: "#e8f5e8",
              borderRadius: 12,
              borderLeft: `4px solid ${logoColor}`,
            }}
          >
            <p style={{ margin: 0, fontSize: "0.95rem", color: "#2c5530" }}>
              <strong>📋 참고사항:</strong> 위 정보는 2025년 초 기준이며, 정책은 변경될 수 있습니다. 
              정확한 지원 조건 및 신청 기간은 의성군청 홈페이지 (www.usc.go.kr) 또는 
              해당 담당 부서에 직접 문의하여 확인하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
