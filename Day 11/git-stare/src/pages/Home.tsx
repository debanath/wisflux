import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import ActivityList from "../components/ActivityList";

export interface Activity {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

function Home() {
  const [username, setUsername] = useState("octocat");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (!username) return;
    fetch(`https://api.github.com/users/${username}/events`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setActivities(data);
        } else {
          setActivities([]);
        }
      });
  }, [username]);

  const filteredActivities = filter
    ? activities.filter(a => a.type === filter)
    : activities;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        GitHub Activity Viewer
      </h1>
      <SearchBar onSearch={setUsername} />
      <Filter onChange={setFilter} />
      <ActivityList activities={filteredActivities} />
    </div>
  );
}

export default Home;
