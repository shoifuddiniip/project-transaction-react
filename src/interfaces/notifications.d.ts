
interface NotificationList {
  notification_id: number;
  message: string;
  timestamp?: Date | string;
  is_read: boolean;
  read_status: string;
}