interface Props {
  width: number;
  height: number;
  fill: string;
}

export default function RemoveIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.75 4C6.535 4 4 6.535 4 11.75C4 16.965 6.535 19.5 11.75 19.5C16.965 19.5 19.5 16.965 19.5 11.75C19.5 6.535 16.965 4 11.75 4ZM14.5 12.5H9V11H14.5V12.5Z" fill={props.fill} />
    </svg>
  );
}
