export type LabTest = {
  id: number | null;
  bp: string | null;
  date: string | null;
  pulse: string | null;
  weight: string | null;
  breathing: string | null;
  blood_sugar: string | null;
  temperature: string | null;
  medical_info_id: number;
};

export type History = {
  id: number | null;
  date: string | null;
  family_history: string | null;
  social_history: string | null;
  trauma_history: string | null;
  medication_history: string | null;
  past_medical_history: string | null;
  medical_info_id: number;
};

export type Chat = {
  id: number | null;
  date: string | null;
  type: string | null;
  data: string | null;
};

export type ChatLog = {
  id: number | null;
  date: string | null;
  chats: Chat[] | null;
  summary: string | null;
  case_id: number | null;
  followup_id: number | null;
};

export type Followup = {
  id: number | null;
  date: string | null;
  medicine: string | null;
  progress: string | null;
  new_symptoms: string | null;
  side_effects: string | null;
  doctor_opinion: string | null;
  symptom_changes: string | null;
  followup_summary: string | null;
  impact_on_daily_life: string | null;
  medication_effectiveness: string | null;
  case_id: number;
  chat_log: ChatLog | null;
};

export type Case = {
  id: number | null;
  followups: Followup[] | null;
  chat_log: ChatLog | null;
  A: string | null;
  C: string | null;
  summary: string | null;
  D: string | null;
  F: string | null;
  L: string | null;
  O: string | null;
  CC: string | null;
  date: string | null;
  medical_info_id: number;
};

export type GeneralInfo = {
  id: number | null;
  age: string | null;
  job: string | null;
  gender: string | null;
  country: string | null;
  user_id: number;
};

export type MedicalInfo = {
  id: number | null;
  user_id: number;
  lab_tests: LabTest[] | null;
  histories: History[] | null;
  cases: Case[] | null;
};

export type ApiData = {
  user_id: number | null;
  number: string | null;
  name: string | null;
  summary: string | null;
  key_string: string | null;
  general_info: GeneralInfo | null;
  medical_info: MedicalInfo | null;
};
