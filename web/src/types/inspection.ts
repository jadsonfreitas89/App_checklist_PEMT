export interface InspectionItem {
  id: string;
  inspectionId: string;
  category: string;
  description: string;
  status: string;
  observation?: string;
}

export interface Inspection {
  id: string;
  companyId: string;
  userId: string;
  platformId: string;
  date: string;
  time: string;
  hourMeter: string;
  inspectionType: string;
  statusFinal: string;
  justification?: string;
  pdfUrl?: string;
  signatureUrl?: string;
  timestamp: number;
}
