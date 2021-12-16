interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ListViewIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 16.5H5.5V18H18.5V16.5Z" fill={props.fill} />
      <path d="M18.5 11H5.5V12.5H18.5V11Z" fill={props.fill} />
      <path d="M18.5 5.5H5.5V7H18.5V5.5Z" fill={props.fill} />
    </svg>
  );
}
