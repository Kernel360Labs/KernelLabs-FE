const logoColor = "#6CB33F";

const AboutPage = () => (
  <div
    style={{
      maxWidth: 600,
      margin: "3rem auto",
      padding: 24,
      background: "#f8fff4",
      borderRadius: 16,
      boxShadow: "0 2px 8px rgba(108,179,63,0.08)",
    }}
  >
    <h1
      style={{
        color: logoColor,
        fontWeight: 700,
        fontSize: "2rem",
        marginBottom: 16,
      }}
    >
      의성 안내
    </h1>
    <p style={{ color: "#333", fontSize: "1.1rem" }}>
      의성은 경상북도에 위치한 아름다운 도시로, 다양한 자연과 문화를 경험할 수
      있습니다.
      <br />
      워케이션, 관광, 그리고 다양한 체험을 즐길 수 있는 의성에 대해 더
      알아보세요!
    </p>
  </div>
);

export default AboutPage;
