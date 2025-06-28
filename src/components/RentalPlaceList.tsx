import type { Place } from "../types/place";

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
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: 32,
      width: "100%",
      justifyItems: "center",
      alignItems: "stretch",
    }}
  >
    {places.map((place) => (
      <div
        key={place.id}
        onClick={() => onSelect(place.id)}
        style={{
          width: 340,
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
          cursor: "pointer",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.2s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(58,99,81,0.18)";
          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.10)";
          e.currentTarget.style.transform = "none";
        }}
      >
        <div
          style={{
            width: "100%",
            height: 160,
            background: "#f5f5f5",
            position: "relative",
          }}
        >
          {place.thumbnailUrl ? (
            <img
              src={place.thumbnailUrl}
              alt={place.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #3A6351, #22543D)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {place.name.charAt(0)}
            </div>
          )}
        </div>
        <div style={{ padding: "22px 20px 18px 20px", flex: 1 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.25rem",
              marginBottom: 8,
              color: "#222",
            }}
          >
            {place.name}
          </div>
          <div style={{ color: "#888", fontSize: "1.08rem", fontWeight: 400 }}>
            {place.address}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RentalPlaceList;
