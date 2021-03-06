interface JobProps {
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  tasks: string[];
}

export function Job(props: JobProps) {
  return (
    <div>
      <h3 className="title">{props.title}</h3>
      <div className="company">{props.desc}</div>
      <div className="dates">
        <span>{props.startDate}</span> - <span>{props.endDate}</span>
      </div>
      <div>
        <ul>
          {
            props.tasks.map((task: string) => <li>{task}</li>)
          }
        </ul>
      </div>
    </div>
  );
}