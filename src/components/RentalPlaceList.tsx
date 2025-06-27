type Place = { id: number; name: string; address: string };

const RentalPlaceList = ({
  places,
  onSelect,
}: {
  places: Place[];
  onSelect: (id: number) => void;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 28,
      justifyItems: "center",
      alignItems: "stretch",
    }}
  >
    {places.map((place) => (
      <div
        key={place.id}
        onClick={() => onSelect(place.id)}
        style={{
          width: 260,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          cursor: "pointer",
          overflow: "hidden",
          border: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.2s, border 0.2s, transform 0.15s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(74,144,226,0.13)";
          e.currentTarget.style.border = "1.5px solid #4A90E2";
          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
          e.currentTarget.style.border = "1px solid #eee";
          e.currentTarget.style.transform = "none";
        }}
      >
        <div
          style={{
            width: "100%",
            height: 120,
            background: "#222",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/image/workation.png"
            alt="장소 이미지"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            padding: "1.1rem 1.1rem 0.7rem 1.1rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.08rem",
              marginBottom: 6,
              textAlign: "left",
              color: "#222",
            }}
          >
            {place.name}
          </div>
          <div
            style={{
              color: "#666",
              fontWeight: 400,
              fontSize: "0.97rem",
              marginBottom: 10,
              textAlign: "left",
              lineHeight: 1.4,
            }}
          >
            {place.address}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RentalPlaceList;
