export class CreateMessageDto {
  message: string;
  doctor_id: string;
  patient_id: string;
}

export class Doctor_patient_message {
  patient_id: string;
  doctor_id: string;
}
