interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function SyncIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 9V7.5H6.7715C7.833 6.162 9.567 5.5 12 5.5C16.374 5.5 18.5 7.626 18.5 12H20C20 6.8415 17.159 4 12 4C9.0265 4 6.831 4.95 5.5 6.7405V4.5H4V9H8.5Z" fill={props.fill} />
      <path
        d="M15.5 15V16.5H17.2285C16.167 17.838 14.4335 18.5 12 18.5C7.626 18.5 5.5 16.374 5.5 12H4C4 17.1585 6.841 20 12 20C14.9735 20 17.169 19.05 18.5 17.2595V19.5H20V15H15.5Z"
        fill={props.fill}
      />
    </svg>
  );
}
