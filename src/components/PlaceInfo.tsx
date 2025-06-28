const PlaceInfo = ({
  name,
  description,
  openTime,
  closeTime,
  unitPrice,
}: {
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  unitPrice: number;
}) => (
  <>
    <h2
      style={{
        fontWeight: 800,
        fontSize: "1.5rem",
        marginBottom: 4,
        color: "#222",
      }}
    >
      {name}
    </h2>
    <div
      style={{
        color: "#888",
        fontWeight: 500,
        fontSize: "1.08rem",
        marginBottom: 8,
      }}
    >
      {description}
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          color: "#3A6351",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span role="img" aria-label="clock">
          ⏰
        </span>
        {openTime.slice(0, 5)} ~ {closeTime.slice(0, 5)}
      </div>
      <div
        style={{
          color: "#3A6351",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 2,
        }}
      >
        <span style={{ fontSize: "1.1em" }}>💵</span>
        1시간 {unitPrice != null ? unitPrice.toLocaleString() : "0"}원
      </div>
    </div>
  </>
);

export default PlaceInfo;
