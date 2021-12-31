interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ShareLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M11 15.5V6.74354L7.51601 10.0445L6.48401 8.95554L11.75 3.96704L17.016 8.95554L15.984 10.0445L12.5 6.74354V15.5H11Z" fill={props.fill} />
      <path d="M15 13V11.5H18.5V20H5V11.5H8.5V13H6.5V18.5H17V13H15Z" fill={props.fill} />
    </svg>
  );
}
