interface Props {
  width: number;
  height: number;
  fill: string;
  strokeWidth: string;
}

export default function ArrowLeftLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 11.75H7M12.25 18.25L6 11.75L12.25 5.25" stroke={props.fill} strokeWidth={props.strokeWidth} strokeMiterlimit="10" />
    </svg>
  );
}
