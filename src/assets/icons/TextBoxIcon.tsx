interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function TextBoxIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M21 17.5H19V15.5H17.5V17.5H15.5V19H17.5V21H19V19H21V17.5Z" fill={props.fill} />
      <path d="M8.5 10H11V15H12.5V10H15V8.5H8.5V10Z" fill={props.fill} />
      <path d="M6 6H17.5V14H19V4.5H4.5V19H14V17.5H6V6Z" fill={props.fill} />
    </svg>
  );
}
