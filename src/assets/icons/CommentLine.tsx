interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function CommentLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.75 5.5H6.75C6.15326 5.5 5.58097 5.73705 5.15901 6.15901C4.73705 6.58097 4.5 7.15326 4.5 7.75V14.75C4.5 15.3467 4.73705 15.919 5.15901 16.341C5.58097 16.7629 6.15326 17 6.75 17H7V19.492L11.7355 17H17.75C18.0455 17 18.3381 16.9418 18.611 16.8287C18.884 16.7157 19.1321 16.5499 19.341 16.341C19.5499 16.1321 19.7157 15.884 19.8287 15.611C19.9418 15.3381 20 15.0455 20 14.75V7.75C20 7.45453 19.9418 7.16194 19.8287 6.88896C19.7157 6.61598 19.5499 6.36794 19.341 6.15901C19.1321 5.95008 18.884 5.78434 18.611 5.67127C18.3381 5.5582 18.0455 5.5 17.75 5.5ZM18.5 14.75C18.5 14.9489 18.421 15.1397 18.2803 15.2803C18.1397 15.421 17.9489 15.5 17.75 15.5H11.3645L8.5 17.008V15.5H6.75C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V7.75C6 7.55109 6.07902 7.36032 6.21967 7.21967C6.36032 7.07902 6.55109 7 6.75 7H17.75C17.9489 7 18.1397 7.07902 18.2803 7.21967C18.421 7.36032 18.5 7.55109 18.5 7.75V14.75Z"
        fill={props.fill}
      />
      <path d="M15 9H9.5V10.5H15V9Z" fill={props.fill} />
      <path d="M13.5 12H9.5V13.5H13.5V12Z" fill={props.fill} />
    </svg>
  );
}