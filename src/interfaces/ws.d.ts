interface WSNotification {
  notification_id: number;
  message: string;
  timestamp?: Date | string;
}

interface WSPayload {
  payload: WSNotification;
}