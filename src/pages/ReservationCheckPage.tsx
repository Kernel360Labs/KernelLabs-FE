import { useState } from "react";
import { placeService } from "../services/placeService";
import { useReservationStore } from "../stores/placeStore";
import DeleteReservationModal from "../components/DeleteReservationModal";
import DeleteSuccessModal from "../components/DeleteSuccessModal";
import EditReservationModal from "../components/EditReservationModal";
import EditSuccessModal from "../components/EditSuccessModal";
import ReservationCheckForm from "../components/ReservationCheckForm";
import ReservationInfoCard from "../components/ReservationInfoCard";

const ReservationCheckPage = () => {
  const [reservationId, setReservationId] = useState("");
  const [password, setPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [updatedReservationData, setUpdatedReservationData] =
    useState<any>(null);
  const {
    reserving: loading,
    reservationError: error,
    reservationResult: result,
    setReserving,
    setReservationError,
    setReservationResult,
  } = useReservationStore();

  const handleCheck = async () => {
    setReserving(true);
    setReservationError(null);
    setReservationResult(null);
    try {
      const res = await placeService.checkReservation(reservationId, password);
      setReservationResult(res);
    } catch (e: any) {
      setReservationError(
        e?.response?.data?.message ||
          e.message ||
          "예약 내역을 찾을 수 없습니다."
      );
    } finally {
      setReserving(false);
    }
  };

  const handleDeleteReservation = async () => {
    if (!result?.data.reservationId || deletePassword.length !== 4) return;

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      await placeService.deleteReservation(
        String(result.data.reservationId),
        deletePassword
      );

      // 삭제 성공 시 모달 닫고 결과 초기화
      setShowDeleteModal(false);
      setDeletePassword("");
      setReservationResult(null);
      setReservationId("");
      setPassword("");
      setShowSuccessModal(true);
    } catch (e: any) {
      setDeleteError(
        e?.response?.data?.message || e.message || "예약 취소에 실패했습니다."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditReservation = (updateResult: any) => {
    setShowEditModal(false);
    setUpdatedReservationData(updateResult.data);
    setShowEditSuccessModal(true);
    // 예약 정보 업데이트
    if (result) {
      setReservationResult({
        ...result,
        data: updateResult.data,
      });
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setDeletePassword("");
    setDeleteError(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletePassword("");
    setDeleteError(null);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const openEditModal = () => {
    setShowEditModal(true);
    setEditError(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditError(null);
  };

  const closeEditSuccessModal = () => {
    setShowEditSuccessModal(false);
    setUpdatedReservationData(null);
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "3rem auto",
        padding: 32,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(58,99,81,0.08)",
      }}
    >
      <ReservationCheckForm
        reservationId={reservationId}
        password={password}
        onReservationIdChange={setReservationId}
        onPasswordChange={setPassword}
        onCheck={handleCheck}
        loading={loading}
      />

      {error && <div style={{ color: "#e74c3c", marginTop: 16 }}>{error}</div>}

      {result && (
        <ReservationInfoCard
          reservationData={result.data}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      )}

      <DeleteReservationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteReservation}
        loading={deleteLoading}
        error={deleteError}
        password={deletePassword}
        onPasswordChange={setDeletePassword}
      />

      <DeleteSuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
      />

      <EditReservationModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        placeId={result?.data.placeId || ""}
        reservationId={result?.data.reservationId || ""}
        currentDate={
          result?.data.reservationDate || new Date().toISOString().slice(0, 10)
        }
        onUpdate={handleEditReservation}
        error={editError}
      />

      <EditSuccessModal
        isOpen={showEditSuccessModal}
        onClose={closeEditSuccessModal}
        updatedData={updatedReservationData}
      />
    </div>
  );
};

export default ReservationCheckPage;
