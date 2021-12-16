interface Props {
  fill: string;
  height: number;
  width: number;
}
export default function ChevronDownIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.25 9.25L11.75 15.5L18.25 9.25" fill={props.fill} />
    </svg>
  );
}
