interface Activity {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: any;
}

interface Props {
  activities: Activity[];
}

function ActivityList({ activities }: Props) {
  if (!activities || activities.length === 0) {
    return <p className="mt-4 text-gray-500">No activities found.</p>;
  }

  const getGithubUrl = (act: Activity) => {
    const repoUrl = `https://github.com/${act.repo.name}`;

    switch (act.type) {
      case "PushEvent": {
        const sha = act.payload?.commits?.[0]?.sha;
        if (sha) return `${repoUrl}/commit/${sha}`;
        return repoUrl;
      }

      case "PullRequestEvent": {
        return act.payload?.pull_request?.html_url || repoUrl;
      }

      case "IssuesEvent": {
        return act.payload?.issue?.html_url || repoUrl;
      }

      case "IssueCommentEvent": {
        return act.payload?.comment?.html_url || repoUrl;
      }

      default:
        return repoUrl;
    }
  };

  return (
    <ul className="mt-4">
      {activities.map((act) => (
        <li key={act.id} className="border-b py-2">
          <a
            href={getGithubUrl(act)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            <strong>{act.type}</strong> in <em>{act.repo.name}</em>
          </a>
          <span className="text-gray-500 ml-2">
            ({new Date(act.created_at).toLocaleString()})
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ActivityList;
