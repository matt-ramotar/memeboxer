interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function AddIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.75 4.5V19M19 11.75H4.5" stroke={props.fill} strokeWidth="2.5" strokeMiterlimit="10" />
    </svg>
  );
}
