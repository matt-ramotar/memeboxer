interface Props {
  width: number;
  height: number;
  fill: string;
}

export default function AnalyticsLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.5 6H6V17.5H17.5V6ZM4.5 4.5V19H19V4.5H4.5Z" fill={props.fill} />
      <path d="M8 11.5H9.5V15H8V11.5Z" fill={props.fill} />
      <path d="M11 10H12.5V15H11V10Z" fill={props.fill} />
      <path d="M14 8.5H15.5V15H14V8.5Z" fill={props.fill} />
    </svg>
  );
}
