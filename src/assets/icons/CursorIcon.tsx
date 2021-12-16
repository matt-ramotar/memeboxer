interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function CursorIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 6.5V5H8V6.5H11V17.5H8V19H15.5V17.5H12.5V6.5H15.5Z" fill={props.fill} />
    </svg>
  );
}
