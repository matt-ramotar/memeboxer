interface Props {
  fill: string;
  height: number;
  width: number;
}

export function AddCircleLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 7.5H11V11H7.5V12.5H11V16H12.5V12.5H16V11H12.5V7.5Z" fill={props.fill} />
      <path
        d="M11.75 4C6.535 4 4 6.535 4 11.75C4 16.965 6.535 19.5 11.75 19.5C16.965 19.5 19.5 16.965 19.5 11.75C19.5 6.535 16.965 4 11.75 4ZM11.75 18C7.4275 18 5.5 16.0725 5.5 11.75C5.5 7.4275 7.4275 5.5 11.75 5.5C16.0725 5.5 18 7.4275 18 11.75C18 16.0725 16.0725 18 11.75 18Z"
        fill={props.fill}
      />
    </svg>
  );
}
