interface CardProp {
  title: string;
  children: any;
}

export function Card(props: CardProp) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}