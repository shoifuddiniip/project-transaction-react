import React, { useState, useEffect } from "react";
import { Button, Popover, PopoverInteractionKind, Position, Card } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { notifGetByUserID as getNotification } from '../../../../service/notification';
import { useAuth } from '../../../../contexs/AuthContext';

const NotificationButton: React.FC = () => {
  const { payload, login } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationList[]>([]);

  const getToken = (payload?: LoginPayload | null): string => {
    if (payload == null) {
      return '-';
    }

    return payload.token;
  }

  const getUser = (payload?: LoginPayload | null): User => {
    if (payload == null) {
      return {
        id: 0,
        email: '',
        role_id: 0,
        username: '',
      };
    }

    return payload.user;
  }

  const token = getToken(payload);
  const user = getUser(payload)

  const unreadCount:number = notifications.reduce<number>((total, data) => {
    if(data.is_read === false){
      return total+1;
    }
    return total+0;
  }, 0);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotification(token, user.id);

        if (response.status === 200) {
          if (response.data != null && Array.isArray(response.data)) {
            setNotifications(response.data);
          }
        } 
      } catch (error: any) {
      }
    };
    fetchNotifications();

  }, [token, user]);

  return (
    <Popover
      isOpen={isOpen}
      onInteraction={(state) => setIsOpen(state)}
      interactionKind={PopoverInteractionKind.CLICK}
      position={Position.BOTTOM_RIGHT}
      content={
        <Card style={{ minWidth: "200px" }}>
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div key={index} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
                {notif.message}
              </div>
            ))
          ) : (
            <div>Tidak ada notifikasi</div>
          )}
        </Card>
      }
    >
      <Button
        icon={IconNames.NOTIFICATIONS}
        onClick={() => setIsOpen(!isOpen)}
        minimal
        style={{ position: "relative" }}
      >
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              backgroundColor: "#d33",
              color: "#fff",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "0.7rem",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {unreadCount}
          </span>
        )}
      </Button>
    </Popover>
  );
};

export default NotificationButton;
