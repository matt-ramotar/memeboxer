interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function PuzzlePieceIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 11H9V12.5H14.5V11Z" fill={props.fill} />
      <path d="M13 14H9V15.5H13V14Z" fill={props.fill} />
      <path
        d="M17.341 6.0305L15.97 4.6595C15.5472 4.23879 14.9755 4.00182 14.379 4H5.5V20H18V7.6215C18.0008 7.32591 17.9429 7.0331 17.8298 6.76001C17.7167 6.48692 17.5506 6.23897 17.341 6.0305ZM7 18.5V5.5H14V8H16.5V18.5H7Z"
        fill={props.fill}
      />
    </svg>
  );
}
