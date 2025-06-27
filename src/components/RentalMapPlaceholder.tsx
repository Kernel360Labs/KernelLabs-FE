const RentalMapPlaceholder = ({ address }: { address: string }) => (
  <div
    style={{
      width: "100%",
      height: 220,
      background: "#e9ecef",
      borderRadius: 12,
      marginBottom: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#888",
    }}
  >
    [카카오맵 위치: {address}]
  </div>
);

export default RentalMapPlaceholder;
