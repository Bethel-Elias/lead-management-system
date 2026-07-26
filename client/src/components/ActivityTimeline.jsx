import { useEffect, useState } from "react";

import api from "../Api/axios";

function ActivityTimeline({ leadId }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get(`/leads/${leadId}/activity`).then((res) => setActivities(res.data));
  }, []);

  return (
    <div>
      <h3>Activity</h3>

      {activities.map((activity) => (
        <p key={activity.id}>{activity.action}</p>
      ))}
    </div>
  );
}

export default ActivityTimeline;
