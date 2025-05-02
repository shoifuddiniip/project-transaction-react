import React, { useState, useEffect, useReducer } from "react";
import {
  Button,
  Popover,
  PopoverInteractionKind,
  Position,
  Card,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { notifGetByUserID as getNotification } from "../../../../service/notification";
import { useAuth } from "../../../../contexs/AuthContext";
import { API_WS_URL } from "../../../../service/apiConfig";
import { dataReducer, initialState } from "./dataReducer";

const NotificationButton: React.FC = () => {
  const { payload } = useAuth();
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);

  const getToken = (payload?: LoginPayload | null): string =>
    payload?.token ?? "-";

  const getUser = (payload?: LoginPayload | null): User =>
    payload?.user ?? { id: 0, email: "", role_id: 0, username: "" };

  const token = getToken(payload);
  const user = getUser(payload);
  const unreadCount = state.data.length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotification(token, user.id);
        if (response.status === 200 && Array.isArray(response.data)) {
          dispatch({ type: "SET", data: response.data });
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();

    const ws = new WebSocket(`${API_WS_URL}?user_id=${user.id}&&token=${token}`);

    ws.onopen = () => {
      console.log("🔌 WebSocket Connected");
    };

    ws.onmessage = (event) => {
      try {
        const data: WSPayload = JSON.parse(event.data);
        const convertNotif: NotificationList = {
          notification_id: data.payload.notification_id,
          message: data.payload.message,
          timestamp: data.payload.timestamp,
          is_read: false,
          read_status: "Unread",
        };
        
        dispatch({
          type: "ADD",
          payload: convertNotif,
        });
      } catch (err) {
        console.error("Invalid WebSocket message:", event.data);
      }
    };

    ws.onclose = () => {
      console.log("🔌 WebSocket Disconnected");
    };

    return () => {
      ws.close();
    };
  }, [token, user.id]); // Note: Removed `state` and `dispatch` from dependencies

  return (
    <Popover
      isOpen={isOpen}
      onInteraction={(state) => setIsOpen(state)}
      interactionKind={PopoverInteractionKind.CLICK}
      position={Position.BOTTOM_RIGHT}
      content={
        <Card style={{ minWidth: "200px", maxHeight: "80vh", overflow: "auto" }}>
          {state.data.length > 0 ? (
            state.data.map((notif, index) => (
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
