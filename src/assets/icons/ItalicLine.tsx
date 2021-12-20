interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ItalicLine(props: Props) {
  return (
    <svg width={props.width} height={props.height} fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M18 7V5.5H9V7H12.637L9.81 17.5H6V19H15V17.5H11.363L14.19 7H18Z" fill={props.fill} />
    </svg>
  );
}
