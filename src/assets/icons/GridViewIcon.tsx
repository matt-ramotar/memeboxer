interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function GridViewIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 11H5V5H11V11ZM9.5 6.5H6.5V9.5H9.5V6.5Z" fill={props.fill} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V5H19V11H13ZM14.5 9.5H17.5V6.5H14.5V9.5Z" fill={props.fill} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5 19H11V13H5V19ZM6.5 14.5H9.5V17.5H6.5V14.5Z" fill={props.fill} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19 19H13V13H19V19ZM17.5 14.5H14.5V17.5H17.5V14.5Z" fill={props.fill} />
    </svg>
  );
}
