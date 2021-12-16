interface Props {
  fill: string;
  height: number;
  width: number;
}
export default function ChevronDownIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.25 5.75L15.5 12.25L9.25 18.75" fill={props.fill} />
    </svg>
  );
}
