interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function MoveIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.2905 8.89L16.2095 9.9295L17.2385 11H12.5V6.2615L13.5705 7.2905L14.61 6.2095L11.75 3.4595L8.88997 6.2095L9.92947 7.2905L11 6.2615V11H6.26147L7.29047 9.9295L6.20947 8.89L3.45947 11.75L6.20947 14.61L7.29047 13.5705L6.26147 12.5H11V17.2385L9.92947 16.2095L8.88997 17.2905L11.75 20.0405L14.61 17.2905L13.5705 16.2095L12.5 17.2385V12.5H17.2385L16.2095 13.5705L17.2905 14.61L20.0405 11.75L17.2905 8.89Z"
        fill={props.fill}
      />
    </svg>
  );
}
