interface Props {
  fill: string;
  height: number;
  width: number;
}

export function HomeFill(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.594 9.41455L12 2.53955L3.40649 9.41455L4.34399 10.5856L5.49999 9.66055V19.0001H9.99999V14.2501C9.99999 14.0511 10.079 13.8604 10.2197 13.7197C10.3603 13.5791 10.5511 13.5001 10.75 13.5001H13.25C13.4489 13.5001 13.6397 13.5791 13.7803 13.7197C13.921 13.8604 14 14.0511 14 14.2501V19.0001H18.5V9.66055L19.6565 10.5856L20.594 9.41455Z"
        fill={props.fill}
      />
    </svg>
  );
}
