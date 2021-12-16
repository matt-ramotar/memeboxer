interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ColumnViewIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 6V18H19.5V6H4.5ZM13.514 7.5L13.5 16.5H10.5L10.5125 7.5H13.514ZM6 7.5H9.014L9 16.5H6V7.5ZM18 16.5H15L15.0125 7.5H18V16.5Z" fill={props.fill} />
    </svg>
  );
}
