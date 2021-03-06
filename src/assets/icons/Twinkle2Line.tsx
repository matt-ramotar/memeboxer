interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function Twinkle2Line(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.25 16C18.04 16 17.5 15.4605 17.5 14.25V13.5H16V14.25C16 15.4605 15.46 16 14.25 16H13.5V17.5H14.25C15.46 17.5 16 18.0395 16 19.25V20H17.5V19.25C17.5 18.0395 18.04 17.5 19.25 17.5H20V16H19.25Z"
        fill={props.fill}
      />
      <path
        d="M16.5 9.5C12.8 9.5 11 7.7 11 4H9.5C9.5 7.7 7.7 9.5 4 9.5V11C7.7 11 9.5 12.8 9.5 16.5H11C11 12.8 12.8 11 16.5 11V9.5ZM10.25 12.8C9.71588 11.6839 8.81608 10.7841 7.7 10.25C8.81608 9.71588 9.71588 8.81608 10.25 7.7C10.7841 8.81608 11.6839 9.71588 12.8 10.25C11.6839 10.7841 10.7841 11.6839 10.25 12.8Z"
        fill={props.fill}
      />
    </svg>
  );
}
