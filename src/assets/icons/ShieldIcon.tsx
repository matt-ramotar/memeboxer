interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function ShieldIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.78052 10.7195L8.71952 11.7805L11.5 14.5605L15.7805 10.2805L14.7195 9.21952L11.5 12.4395L9.78052 10.7195Z" fill={props.fill} />
      <path
        d="M12 3.91803L5 7.27803V11C5 17.1865 11.447 19.8365 11.7215 19.9465L12 20.058L12.2785 19.9465C12.553 19.8365 19 17.1865 19 11V7.27803L12 3.91803ZM17.5 11C17.5 15.5 13.155 17.8755 12 18.4275C10.8435 17.8745 6.5 15.5 6.5 11V8.22203L12 5.58203L17.5 8.22203V11Z"
        fill={props.fill}
      />
    </svg>
  );
}
