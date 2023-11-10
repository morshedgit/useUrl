"use client";

import { useUrl } from "@/common/hooks/useUrl";
import { Notification } from "@/common/types";

const NotificationManager = (props: {}) => {
  const [notifications, setNotifications] =
    useUrl<Notification[]>("notifications");
  return (
    <div className="fixed bottom-10 left-10 grid grid-cols-1 gap-4">
      {/* <button
        onClick={() => {
          setNotifications([
            ...(notifications || []),
            {
              title: "Test",
              body: `${Math.random().toString()} Test`,
              open: true,
              type: "info",
            },
          ]);
        }}
      >
        Add Notif
      </button>
      <button
        onClick={() => {
          setNotifications([
            ...(notifications || []),
            {
              title: "Test",
              body: `${Math.random().toString()} Test`,
              open: true,
              type: "success",
            },
          ]);
        }}
      >
        Add Success
      </button> */}
      {notifications
        ?.filter((notif) => notif.open)
        .map((notification) => (
          <div
            key={notification.body}
            className={`p-4 ${
              notification.type === "danger"
                ? "bg-red-200"
                : notification.type === "info"
                ? "bg-blue-200"
                : notification.type === "success"
                ? "bg-green-200"
                : ""
            } rounded-lg min-w-[30rem] shadow-lg relative`}
          >
            <header
              className={`text-xl ${
                notification.type === "danger"
                  ? "text-red-700"
                  : notification.type === "info"
                  ? "text-blue-700"
                  : notification.type === "success"
                  ? "text-green-700"
                  : ""
              }`}
            >
              {notification.title}
            </header>
            <p className="px-2">{notification.body}</p>
            <button
              type="button"
              onClick={() =>
                setNotifications(
                  notifications?.filter(
                    (notif) => notif.body !== notification.body
                  )
                )
              }
              className="absolute top-2 right-4 text-gray-500 text-2xl"
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default NotificationManager;
