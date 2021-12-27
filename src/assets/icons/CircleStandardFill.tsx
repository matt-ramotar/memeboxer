interface Props {
  width: number;
  height: number;
  fill: string;
}

export default function CircleStandardFill(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4C6.8415 4 4 6.841 4 12C4 17.159 6.8415 20 12 20C17.1585 20 20 17.159 20 12C20 6.841 17.1585 4 12 4Z" fill={props.fill} />
    </svg>
  );
}
