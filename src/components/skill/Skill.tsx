import './Skill.css';

interface SkillProps {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  img: string;
}

export function Skill(props: SkillProps) {
  return (
    <div>
      <img src={props.img}/>
      <span className="skill-level">{props.level} / 5 --- </span>
      <span className="skill-name">{props.name}</span>
    </div>
  );
}