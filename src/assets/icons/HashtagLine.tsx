interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function HashtagLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.64448 5L8.99416 8.5H5V10H8.71545L7.97224 14H4.25V15.5H7.69353L7.04321 19H8.77231L9.42262 15.5H13.2763L12.6257 19H14.3549L15.0054 15.5H19V14H15.2843L16.0278 10H19.75V8.5H16.3066L16.9572 5H15.2281L14.5775 8.5H10.7233L11.3736 5H9.64448ZM13.5551 14L14.2987 10H10.4445L9.70133 14H13.5551Z"
        fill={props.fill}
      />
    </svg>
  );
}
