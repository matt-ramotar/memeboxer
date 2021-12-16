interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function BannerIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.5 8.5H5.5V12.5H18.5V8.5ZM4 7V14H20V7H4Z" fill={props.fill} />
      <path fillRule="evenodd" clipRule="evenodd" d="M13 17H4V15.5H13V17Z" fill={props.fill} />
    </svg>
  );
}
