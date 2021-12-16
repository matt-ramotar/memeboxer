interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function AddCommentIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 16.5H18V13H16.5V16.5H13V18H16.5V21.5H18V18H21.5V16.5Z" fill={props.fill} />
      <path
        d="M12 7.5C14.858 7.5 16.3245 8.8095 16.4845 11.5H17.987C17.987 11.487 17.987 11.473 17.987 11.4595C17.7955 7.939 15.67 6 12 6C8.131 6 6 8.131 6 12C6 15.67 7.939 17.7955 11.4595 17.986H11.5V16.4845C8.8095 16.325 7.5 14.8585 7.5 12C7.5 8.972 8.972 7.5 12 7.5Z"
        fill={props.fill}
      />
    </svg>
  );
}
