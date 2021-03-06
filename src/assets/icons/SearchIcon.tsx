interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function SearchIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.0305 17.9695L15.0215 13.9605C15.7005 12.9372 16.0426 11.7273 16 10.5C16 7.056 13.944 5 10.5 5C7.056 5 5 7.056 5 10.5C5 13.944 7.056 16 10.5 16C11.7275 16.0427 12.9376 15.7006 13.961 15.0215L17.97 19.0305L19.0305 17.9695ZM6.5 10.5C6.5 7.8835 7.8835 6.5 10.5 6.5C13.1165 6.5 14.5 7.8835 14.5 10.5C14.5 13.1165 13.1165 14.5 10.5 14.5C7.8835 14.5 6.5 13.1165 6.5 10.5Z"
        fill={props.fill}
      />
    </svg>
  );
}
