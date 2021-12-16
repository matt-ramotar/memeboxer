interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function CropIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 2.5H6V6L2.5 6V7.5L16.5 7.5V15H18V6L7.5 6V2.5Z" fill={props.fill} />
      <path d="M21.5 16.5L7.5 16.5V9H6V18L16.5 18V21.5H18V18H21.5V16.5Z" fill={props.fill} />
    </svg>
  );
}
