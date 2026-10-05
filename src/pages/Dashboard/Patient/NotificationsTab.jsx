import { useEffect, useState } from 'react';
import { getMyNotifications } from '../../../services/notificationService';

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getMyNotifications(0, 20);
        setNotifications(res.data?.content || []);
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">Notifications</h2>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>You have no new notifications.</p>
      ) : (
        <div className="notifications-list">
          {notifications.map(notif => (
            <div key={notif.id} className="notification-item">
              <div className="notification-content">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {notif.title}
                  {!notif.read && <span style={{ width: '8px', height: '8px', background: 'var(--color-error)', borderRadius: '50%', display: 'inline-block' }}></span>}
                </h4>
                <p>{notif.message}</p>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {new Date(notif.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
