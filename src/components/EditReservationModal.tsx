import { useState, useMemo } from "react";
import { placeService } from "../services/placeService";
import RentalCalendar from "./RentalCalendar";
import TimeSlotSelector from "./TimeSlotSelector";

type EditReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  placeId: string | number;
  reservationId: string | number;
  currentDate: string;
  onUpdate: (result: any) => void;
  error: string | null;
};

const EditReservationModal = ({
  isOpen,
  onClose,
  placeId,
  reservationId,
  currentDate,
  onUpdate,
  error,
}: EditReservationModalProps) => {
  // 안전한 날짜 파싱
  const parseDate = (dateString: string) => {
    try {
      const parsed = new Date(dateString);
      if (isNaN(parsed.getTime())) {
        return new Date();
      }
      return parsed;
    } catch {
      return new Date();
    }
  };

  const [date, setDate] = useState(parseDate(currentDate));
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  // 날짜를 YYYY-MM-DD로 변환
  const selectedDateStr = date.toISOString().slice(0, 10);

  // 스케줄 데이터 로드
  const loadSchedule = async () => {
    if (!isOpen) return;

    setScheduleLoading(true);
    setScheduleError(null);
    try {
      const data = await placeService.getPlaceScheduleForEdit(
        placeId,
        selectedDateStr,
        reservationId
      );
      setScheduleData(data);
    } catch (e: any) {
      console.error("스케줄 로드 실패:", e);
      setScheduleError(
        e?.response?.data?.message ||
          e?.message ||
          "스케줄을 불러올 수 없습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setScheduleLoading(false);
    }
  };

  // 모달이 열릴 때 스케줄 로드
  useMemo(() => {
    if (isOpen) {
      loadSchedule();
    }
  }, [isOpen, selectedDateStr]);

  // 시간 슬롯 계산
  const timeSlots = useMemo(() => {
    if (!scheduleData?.data) return [];
    if (scheduleData.data.timeSlots && scheduleData.data.timeSlots.length > 0) {
      // API 응답 구조에 맞게 처리 (status 필드 사용)
      const slots = scheduleData.data.timeSlots.map((slot: any) => ({
        time: slot.time,
        status: slot.status,
      }));

      return [
        {
          label: `${scheduleData.data.openTime.slice(
            0,
            5
          )} ~ ${scheduleData.data.closeTime.slice(0, 5)}`,
          slots,
        },
      ];
    }
    return [];
  }, [scheduleData]);

  const handleUpdate = async () => {
    if (!selectedTime.length || password.length !== 4) return;

    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const result = await placeService.updateReservation(reservationId, {
        password,
        newReservationDate: selectedDateStr,
        newTimeSlots: selectedTime.sort(),
      });

      onUpdate(result);
      setShowPasswordModal(false);
      setPassword("");
      setSelectedTime([]);
    } catch (e: any) {
      setUpdateError(
        e?.response?.data?.message || e.message || "예약 수정에 실패했습니다."
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleEditClick = () => {
    if (selectedTime.length > 0) {
      setShowPasswordModal(true);
      setUpdateError(null);
    }
  };

  if (!isOpen) return null;

  return (
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
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          maxWidth: 800,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              fontSize: "1.3rem",
              color: "#3A6351",
            }}
          >
            예약 수정
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ×
          </button>
        </div>

        {error && (
          <div style={{ color: "#e74c3c", marginBottom: 16 }}>{error}</div>
        )}

        {scheduleError && (
          <div
            style={{
              color: "#e74c3c",
              marginBottom: 16,
              padding: 12,
              background: "#fdf2f2",
              borderRadius: 8,
              border: "1px solid #fecaca",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              ⚠️ 스케줄 로드 실패
            </div>
            <div style={{ marginBottom: 12 }}>{scheduleError}</div>
            <button
              onClick={loadSchedule}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 6,
                border: "none",
                background: "#3A6351",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              다시 시도
            </button>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <div
            style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 12 }}
          >
            📅 날짜와 시간을 선택해 주세요
          </div>

          {/* 시간 슬롯 상태 설명 */}
          <div
            style={{
              marginBottom: 16,
              padding: 12,
              background: "#f8faf8",
              borderRadius: 8,
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              시간 슬롯 상태
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    background: "#fff",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: 4,
                  }}
                ></div>
                <span>예약 가능</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    background: "#fff",
                    border: "1.5px solid #FFA500",
                    borderRadius: 4,
                  }}
                ></div>
                <span>내 예약</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    background: "#f2f2f2",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: 4,
                  }}
                ></div>
                <span>다른 사람 예약</span>
              </div>
            </div>
          </div>

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

            {scheduleLoading ? (
              <div
                style={{
                  width: 360,
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                로딩 중...
              </div>
            ) : scheduleError ? (
              <div
                style={{
                  width: 360,
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                스케줄을 불러올 수 없습니다.
                <br />
                위의 "다시 시도" 버튼을 눌러주세요.
              </div>
            ) : timeSlots.length > 0 ? (
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
                <TimeSlotSelector
                  slots={timeSlots[0].slots}
                  selectedTime={selectedTime}
                  onSelect={setSelectedTime}
                  maxSelect={3}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 360,
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                선택 가능한 시간이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button
            onClick={onClose}
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
            onClick={handleEditClick}
            disabled={!selectedTime.length || !!scheduleError}
            style={{
              padding: "0.7rem 1.5rem",
              borderRadius: 8,
              border: "none",
              background:
                selectedTime.length && !scheduleError ? "#3A6351" : "#e0e0e0",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              cursor:
                selectedTime.length && !scheduleError
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            {scheduleError ? "스케줄 오류" : "수정"}
          </button>
        </div>

        {/* 비밀번호 입력 모달 */}
        {showPasswordModal && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              zIndex: 1100,
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
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: 18,
                }}
              >
                비밀번호 입력
              </h4>
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
              {updateError && (
                <div style={{ color: "#e74c3c", marginBottom: 10 }}>
                  {updateError}
                </div>
              )}
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword("");
                    setUpdateError(null);
                  }}
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
                  onClick={handleUpdate}
                  disabled={password.length !== 4 || updateLoading}
                  style={{
                    padding: "0.7rem 1.5rem",
                    borderRadius: 8,
                    border: "none",
                    background:
                      password.length === 4 && !updateLoading
                        ? "#3A6351"
                        : "#e0e0e0",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    cursor:
                      password.length === 4 && !updateLoading
                        ? "pointer"
                        : "not-allowed",
                  }}
                >
                  {updateLoading ? "수정 중..." : "수정 완료"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditReservationModal;
