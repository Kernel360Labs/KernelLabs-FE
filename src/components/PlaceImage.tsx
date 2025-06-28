const PlaceImage = ({
  thumbnailUrl,
  name,
}: {
  thumbnailUrl?: string;
  name: string;
}) => (
  <div
    style={{
      width: "100%",
      height: 260,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      overflow: "hidden",
      background: "#f2f2f2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {thumbnailUrl ? (
      <img
        src={thumbnailUrl}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
          fontSize: 32,
        }}
      >
        이미지 없음
      </div>
    )}
  </div>
);

export default PlaceImage;
