import { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  address: string;
  width?: string;
  height?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = ({
  address,
  width = "100%",
  height = "300px",
}: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setUseFallback(false);

    // 카카오맵 스크립트 로드
    const loadScript = () => {
      if (window.kakao) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      const apiKey =
        import.meta.env.VITE_KAKAO_MAP_API_KEY ||
        "9ae4f34776b3bca52af53f697dae36cb";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
      script.async = true;

      script.onload = () => {
        console.log("Kakao Maps SDK loaded successfully");
        initializeMap();
      };

      script.onerror = () => {
        console.log("Kakao Maps SDK failed to load, using fallback");
        setUseFallback(true);
        setIsLoading(false);
      };

      document.head.appendChild(script);
    };

    const initializeMap = () => {
      try {
        window.kakao.maps.load(() => {
          console.log("Kakao Maps initialized");

          if (!mapRef.current) {
            console.log("Map container not ready, using fallback");
            setUseFallback(true);
            setIsLoading(false);
            return;
          }

          // 주소-좌표 변환 객체 생성
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표 검색
          geocoder.addressSearch(address, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              try {
                const coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );

                // 지도 생성
                const map = new window.kakao.maps.Map(mapRef.current, {
                  center: coords,
                  level: 3,
                });

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords,
                });

                // 인포윈도우 생성
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;font-size:12px;">${address}</div>`,
                });

                // 마커 클릭 시 인포윈도우 표시
                window.kakao.maps.event.addListener(marker, "click", () => {
                  infowindow.open(map, marker);
                });

                // 지도 로드 완료 후 인포윈도우 표시
                setTimeout(() => {
                  infowindow.open(map, marker);
                }, 500);

                setIsLoading(false);
              } catch (mapError) {
                console.error("Map creation error:", mapError);
                setUseFallback(true);
                setIsLoading(false);
              }
            } else {
              console.log("Address not found, using fallback");
              setUseFallback(true);
              setIsLoading(false);
            }
          });
        });
      } catch (error) {
        console.error("Map initialization error:", error);
        setUseFallback(true);
        setIsLoading(false);
      }
    };

    loadScript();
  }, [address]);

  // 폴백 지도 컴포넌트
  if (useFallback) {
    return (
      <div
        style={{
          width,
          height,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          margin: "20px 0",
          background: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📍</div>
        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#3A6351",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          위치 정보
        </div>
        <div
          style={{
            fontSize: "0.95rem",
            color: "#666",
            textAlign: "center",
            lineHeight: "1.4",
          }}
        >
          {address}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width,
          height,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          margin: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f9fa",
          color: "#6c757d",
          fontSize: "0.9rem",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        margin: "20px 0",
        position: "relative",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f9fa",
            color: "#6c757d",
            fontSize: "0.9rem",
            zIndex: 1,
          }}
        >
          지도를 불러오는 중...
        </div>
      )}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "300px",
        }}
      />
    </div>
  );
};

export default KakaoMap;
