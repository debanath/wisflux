interface Props {
  onChange: (filter: string) => void;
}

function Filter({ onChange }: Props) {
  const events = ["", "PushEvent", "PullRequestEvent", "IssuesEvent"];

  return (
    <select onChange={e => onChange(e.target.value)} className="border p-2 ml-2">
      {events.map(ev => (
        <option key={ev} value={ev}>
          {ev || "All Events"}
        </option>
      ))}
    </select>
  );
}

export default Filter;
