export interface Lead {
  id: number;
  detail_lead_id: string;
  lead_name: string;
  contact_number: string | null;
  email: string | null;

  department: string;
  sub_category: string;
  product_type: string;

  lead_status: string;
  final_lead_confirm_status: boolean;

  created_at: string;

  dsa_id: number;
  dsa_name: string;
  dsa_adv_id: string;
  dsa_email: string;
  dsa_mobile: string;

  assigned_rm_id: number;
  assigned_rm_name: string;
  assigned_rm_email: string;
  assigned_rm_mobile: string;

  bank_verified: boolean | null;
  kyc_completed: boolean | null;

  agreement_id: number | null;
  agreement_status: string | null;

  disbursement_amount: string | null;
  gross_payout_amount: string | null;
  gst_amount: string | null;
  tds_amount: string | null;
  net_payout_amount: string | null;

  payout_date: string | null;
  payout_id: string | null;

  payment_mode: string | null;
  transaction_reference_no: string | null;

  invoice_number: string | null;
  invoice_date: string | null;

  policy_number: string | null;
}