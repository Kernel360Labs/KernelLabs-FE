import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { usePlaceDetail } from "../hooks/usePlaces";
import RentalMapPlaceholder from "../components/RentalMapPlaceholder";
import RentalCalendar from "../components/RentalCalendar";
import { useReservationStore } from "../stores/placeStore";
import { placeService } from "../services/placeService";

function getHourSlots(open: string, close: string) {
  // open, close: "10:00:00" ~ "21:00:00"
  const openHour = parseInt(open.split(":")[0], 10);
  const closeHour = parseInt(close.split(":")[0], 10);
  const slots: string[] = [];
  for (let h = openHour; h < closeHour; h++) {
    slots.push(`${h}:00`);
  }
  return slots;
}

const RentalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { place, loading, error, refetch } = usePlaceDetail(id);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [reserved, setReserved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const {
    reserving,
    reservationError,
    reservationResult,
    setReserving,
    setReservationError,
    setReservationResult,
    resetReservation,
  } = useReservationStore();

  // 시간 슬롯 계산
  const timeSlots = useMemo(() => {
    if (!place) return [];
    const slots = getHourSlots(place.openTime, place.closeTime);
    return [
      {
        label: `${place.openTime.slice(0, 5)} ~ ${place.closeTime.slice(0, 5)}`,
        slots,
      },
    ];
  }, [place]);

  // 시간 선택 핸들러 (최대 3개, 다시 클릭 시 해제, 연속성 체크)
  const handleTimeClick = (slot: string) => {
    const idx = selectedTime.indexOf(slot);
    let next: string[];
    if (idx > -1) {
      // 이미 선택된 경우 해제
      next = selectedTime.filter((s) => s !== slot);
    } else {
      if (selectedTime.length >= 3) return; // 최대 3개
      next = [...selectedTime, slot].sort();
    }
    // 연속성 체크 (선택된 시간들이 연속인지)
    if (next.length > 1) {
      const indices = next.map((s) => parseInt(s)).sort((a, b) => a - b);
      for (let i = 1; i < indices.length; i++) {
        if (indices[i] !== indices[i - 1] + 1) return; // 불연속이면 무시
      }
    }
    setSelectedTime(next);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div
          style={{ fontSize: "1.2rem", color: "#e74c3c", marginBottom: "1rem" }}
        >
          오류가 발생했습니다: {error}
        </div>
        <button
          onClick={() => refetch()}
          style={{
            padding: "0.8rem 1.5rem",
            borderRadius: 8,
            border: "none",
            background: "#3A6351",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!place) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        장소를 찾을 수 없습니다.
      </div>
    );
  }

  // 예약 API 호출
  const handleReserveRequest = async () => {
    if (!place || !selectedTime.length || password.length !== 4) return;
    setReserving(true);
    setReservationError(null);
    try {
      const res = await placeService.reserve({
        placeId: place.id,
        password,
        reservationDate: date.toISOString().slice(0, 10),
        timeSlots: selectedTime.sort(),
      });
      setReservationResult(res);
      setShowModal(false);
      setPassword("");
      setSelectedTime([]);
    } catch (e: any) {
      setReservationError(
        e?.response?.data?.message || e.message || "예약에 실패했습니다."
      );
    } finally {
      setReserving(false);
    }
  };

  // 예약 버튼 클릭 시 모달 오픈
  const handleReserve = () => {
    setShowModal(true);
    resetReservation();
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setPassword("");
    resetReservation();
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        padding: 0,
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(58,99,81,0.08)",
      }}
    >
      {/* Top image */}
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
      {/* Info section */}
      <div style={{ padding: 24 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: 18,
            background: "none",
            border: "none",
            color: "#3A6351",
            fontWeight: 600,
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          ← 목록으로
        </button>
        <h2
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            marginBottom: 4,
            color: "#222",
          }}
        >
          {place.name}
        </h2>
        <div
          style={{
            color: "#888",
            fontWeight: 500,
            fontSize: "1.08rem",
            marginBottom: 8,
          }}
        >
          {place.description}
        </div>
        {/* 오픈/마감 시간, 가격 두 줄로 */}
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
            {place.openTime.slice(0, 5)} ~ {place.closeTime.slice(0, 5)}
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
            1시간{" "}
            {place.unitPrice != null ? place.unitPrice.toLocaleString() : "0"}원
          </div>
        </div>
        <RentalMapPlaceholder address={place.address} />
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            margin: "18px 0 16px 0",
          }}
        >
          <span role="img" aria-label="calendar">
            📅
          </span>{" "}
          날짜와 시간을 선택해 주세요
        </div>
        {/* 달력/시간 flex row: 완벽히 세로 중앙 정렬, 높이 통일, 가운데 정렬 */}
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 700 ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            width: "100%",
            margin: "0 auto",
            maxWidth: 900,
            minHeight: 340,
          }}
        >
          <div
            style={{
              width: 360,
              minWidth: 260,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 320,
            }}
          >
            <div style={{ width: "100%" }}>
              <RentalCalendar value={date} onChange={setDate} />
            </div>
          </div>
          {/* 시간 선택: open~close 기준 1시간 단위 버튼 */}
          {timeSlots.length > 0 && (
            <div
              style={{
                width: 360,
                minWidth: 180,
                maxWidth: 420,
                marginTop: window.innerWidth < 700 ? 16 : 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 320,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 18,
                  justifyContent: "center",
                }}
              >
                {timeSlots[0].slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeClick(slot)}
                    style={{
                      padding: "0.55rem 0.9rem",
                      borderRadius: 8,
                      border: selectedTime.includes(slot)
                        ? "2.5px solid #3A6351"
                        : "1.5px solid #e0e0e0",
                      background: selectedTime.includes(slot)
                        ? "#3A6351"
                        : "#fff",
                      color: selectedTime.includes(slot) ? "#fff" : "#222",
                      fontWeight: 700,
                      fontSize: "1.01rem",
                      cursor: "pointer",
                      marginBottom: 8,
                      minWidth: 80,
                      transition: "background 0.18s, color 0.18s, border 0.18s",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* 예약 버튼 */}
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
        >
          <button
            onClick={handleReserve}
            disabled={!selectedTime.length}
            style={{
              width: 260,
              maxWidth: "90vw",
              padding: "1.1rem 0",
              borderRadius: 10,
              border: "none",
              background: selectedTime.length
                ? reserved
                  ? "#aaa"
                  : "#3A6351"
                : "#e0e0e0",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.18rem",
              cursor: selectedTime.length ? "pointer" : "not-allowed",
              transition: "background 0.2s",
              boxShadow: "0 2px 8px rgba(58,99,81,0.08)",
            }}
          >
            예약
          </button>
        </div>
        {/* 예약 모달 */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.25)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 32,
                minWidth: 320,
                boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: 18,
                }}
              >
                예약 비밀번호 입력
              </h3>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                pattern="[0-9]*"
                value={password}
                onChange={(e) => {
                  if (/^\d{0,4}$/.test(e.target.value))
                    setPassword(e.target.value);
                }}
                style={{
                  fontSize: "1.3rem",
                  padding: "0.7rem 1.2rem",
                  borderRadius: 8,
                  border: "1.5px solid #3A6351",
                  marginBottom: 18,
                  width: 160,
                  textAlign: "center",
                  letterSpacing: "0.3em",
                }}
                placeholder="4자리 숫자"
              />
              {reservationError && (
                <div style={{ color: "#e74c3c", marginBottom: 10 }}>
                  {reservationError}
                </div>
              )}
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={closeModal}
                  style={{
                    padding: "0.7rem 1.5rem",
                    borderRadius: 8,
                    border: "none",
                    background: "#eee",
                    color: "#333",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    cursor: "pointer",
                  }}
                >
                  취소
                </button>
                <button
                  onClick={handleReserveRequest}
                  disabled={password.length !== 4 || reserving}
                  style={{
                    padding: "0.7rem 1.5rem",
                    borderRadius: 8,
                    border: "none",
                    background:
                      password.length === 4 && !reserving
                        ? "#3A6351"
                        : "#e0e0e0",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    cursor:
                      password.length === 4 && !reserving
                        ? "pointer"
                        : "not-allowed",
                  }}
                >
                  {reserving ? "예약 중..." : "예약 완료"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* 예약 성공 안내 모달 */}
        {reservationResult && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.25)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 32,
                minWidth: 320,
                boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: 18,
                }}
              >
                예약이 완료되었습니다.
              </h3>
              {reservationResult && (
                <div
                  style={{
                    color: "#3A6351",
                    fontWeight: 700,
                    fontSize: "1.13rem",
                    marginBottom: 10,
                  }}
                >
                  예약 번호는 [ {reservationResult.data.reservationId} ] 입니다.
                  <br />
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "1.01rem",
                      color: "#444",
                    }}
                  >
                    예약 조회/변경/취소 시 필요하오니 꼭 기억해주세요.
                  </span>
                </div>
              )}
              <div
                style={{
                  color: "#3A6351",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  marginBottom: 18,
                }}
              >
                [예약 확인] 페이지에서 확인해주세요
              </div>
              <button
                onClick={() => {
                  resetReservation();
                }}
                style={{
                  padding: "0.7rem 1.5rem",
                  borderRadius: 8,
                  border: "none",
                  background: "#3A6351",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalDetailPage;
