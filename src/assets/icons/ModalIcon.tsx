interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ModalIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5 6.5H9.5V14.5H14.5V6.5ZM8 5V16H16V5H8Z" fill={props.fill} />
      <path fillRule="evenodd" clipRule="evenodd" d="M13 19H8V17.5H13V19Z" fill={props.fill} />
    </svg>
  );
}
