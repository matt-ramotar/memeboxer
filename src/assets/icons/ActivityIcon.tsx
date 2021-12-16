interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ActivityIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 64 64" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M50.37 27H38V7.625L12.63 37H25V56.375L50.37 27ZM21.37 33L34 18.375V31H41.63L29 45.625V33H21.37Z" fill={props.fill} />
    </svg>
  );
}
