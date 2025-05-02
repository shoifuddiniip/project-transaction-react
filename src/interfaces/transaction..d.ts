interface Transaction {
  id: number;
  created_by_user_id: number;
  target_user_id: number;
  action: string;
  description: string;
  created_at?: Date | string;
}

interface TransactionForm {
  created_by_user_id: number;
  action: string;
  description: string;
}