interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function SproutLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 64 64" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.9347 19.6056C39.1397 7.19541 54.0802 10.5 53.7235 10.5H56.1631L55.6847 12.8922C55.2937 14.8471 54.0468 18.1257 51.8206 21.0789C49.5801 24.051 46.1864 26.8952 41.4716 27.4846C38.9215 27.8033 37.2429 28.2242 36.1759 28.6195C35.8056 28.7567 35.5291 28.8834 35.3258 28.9904C35.4599 29.3142 35.5739 29.6555 35.6638 30.0149C38.1856 40.1021 36.0366 49.6026 34.5805 53.2428L30.8666 51.7572C32.0483 48.8029 33.9672 40.5064 31.939 31.6361C31.6043 31.6838 31.0203 31.8377 30.1179 32.2889C29.4259 32.6349 28.8361 33.1534 28.0674 33.922C27.9529 34.0366 27.8333 34.1579 27.7086 34.2844C27.0434 34.9594 26.2304 35.7842 25.2437 36.5317C22.7472 38.423 19.2782 39.7548 13.2004 39.5008C13.1888 39.5014 13.1728 39.5024 13.1523 39.504C13.1052 39.5077 13.0421 39.5142 12.964 39.525C12.8073 39.5466 12.603 39.5835 12.3618 39.6426C11.8783 39.761 11.2708 39.9624 10.6179 40.2889L8.07005 41.5628L7.73722 38.7337C7.35006 35.4429 8.19755 30.8195 11.3829 27.3891C14.6785 23.84 20.117 21.9391 28.1157 23.5388C29.0172 23.7191 30.2723 24.1372 31.5097 24.8548C31.9032 22.0946 32.6006 20.2738 32.9347 19.6056ZM29.3706 28.24C28.5928 27.8096 27.8183 27.5586 27.3313 27.4612C20.33 26.0609 16.4352 27.8266 14.3141 30.1109C12.8139 31.7265 12.0274 33.7823 11.758 35.6782C12.3656 35.5503 12.8721 35.5 13.2235 35.5H13.267L13.3104 35.5019C18.6931 35.7359 21.2085 34.5704 22.8283 33.3433C23.5652 32.7851 24.1489 32.1946 24.8114 31.5244C24.9498 31.3844 25.0916 31.241 25.239 31.0936C26.0485 30.2841 27.0212 29.3651 28.3291 28.7111C28.6858 28.5328 29.033 28.3756 29.3706 28.24ZM35.6035 24.5915C35.9411 22.7317 36.3982 21.6227 36.5124 21.3944C40.0991 14.221 47.191 13.9217 51.1052 14.2262C50.5793 15.56 49.7627 17.1638 48.6265 18.6711C46.7836 21.1157 44.2606 23.1048 40.9754 23.5154C38.7185 23.7976 36.9619 24.1693 35.6035 24.5915Z"
        fill="#1E1919"
      />
      <path d="M29.7235 54C30.7235 52.5 31.5569 50 31.7235 49L35.1835 51.5C34.7335 53 34.4402 53.6667 34.2735 54H29.7235Z" fill="#1E1919" />
    </svg>
  );
}
