interface Props {
  fill: string;
  height: number;
  width: number;
}
export default function CheckmarkLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 11.5L10 16L18.25 7.75" stroke={props.fill} strokeWidth="1.5" strokeMiterlimit="10" />
    </svg>
  );
}
