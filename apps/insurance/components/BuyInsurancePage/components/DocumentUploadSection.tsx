import UploadBox from "@/components/common/UploadBox";

interface DocumentUploadSectionProps {
  nationalCardId: number | null;
  medicalCardId: number | null;
  lastInsuranceFileId: number | null;
  showLastInsuranceUpload: boolean;
  onNationalCardChange: (id: number | null) => void;
  onMedicalCardChange: (id: number | null) => void;
  onLastInsuranceFileChange: (id: number | null) => void;
}

export const DocumentUploadSection = ({
  nationalCardId,
  medicalCardId,
  lastInsuranceFileId,
  showLastInsuranceUpload,
  onNationalCardChange,
  onMedicalCardChange,
  onLastInsuranceFileChange,
}: DocumentUploadSectionProps) => (
  <div className="mb-5">
    <div className="rounded-xl bg-[#f0f0f0] p-4">
      <UploadBox
        title=" کارت ملی"
        type={1}
        fileId={nationalCardId}
        onUploadSuccess={(id) => onNationalCardChange(id)}
        onDeleteSuccess={() => onNationalCardChange(null)}
      />
      <div style={{ height: 10 }} />
      <UploadBox
        title=" کارت نظام پزشکی"
        type={2}
        fileId={medicalCardId}
        onUploadSuccess={(id) => onMedicalCardChange(id)}
        onDeleteSuccess={() => onMedicalCardChange(null)}
      />
      <div style={{ height: 10 }} />

      {showLastInsuranceUpload && (
        <UploadBox
          type={3}
          title=" بیمه‌نامه قبلی"
          fileId={lastInsuranceFileId}
          onUploadSuccess={(id) => onLastInsuranceFileChange(id)}
          onDeleteSuccess={() => onLastInsuranceFileChange(null)}
        />
      )}
    </div>
  </div>
);
