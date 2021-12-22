interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function HeartLine(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0315 5.73628C9.49474 5.55003 8.92392 5.47277 8.35554 5.50848C7.78717 5.47277 7.21634 5.55003 6.67957 5.73628C6.12481 5.92878 5.61772 6.23381 5.19468 6.63292C4.77151 7.03215 4.44233 7.51628 4.23297 8.05331C4.02749 8.58039 3.94303 9.14419 3.98621 9.70642C3.98813 10.0148 4.01877 10.3223 4.07772 10.6254C4.51752 12.994 6.51813 14.9309 8.23187 16.217C9.11115 16.8769 9.96268 17.4004 10.5934 17.7587C10.9094 17.9383 11.1716 18.0773 11.3562 18.172C11.4485 18.2194 11.5216 18.2558 11.5723 18.2808C11.5977 18.2933 11.6176 18.3029 11.6315 18.3096L11.6479 18.3174L11.6526 18.3197L11.6547 18.3207L11.975 18.4717L12.2952 18.3207L12.2973 18.3197L12.3021 18.3174L12.3185 18.3096C12.3324 18.3029 12.3522 18.2933 12.3776 18.2808C12.4284 18.2558 12.5014 18.2194 12.5938 18.172C12.7784 18.0773 13.0406 17.9383 13.3566 17.7587C13.9873 17.4004 14.8388 16.8769 15.7181 16.217C17.4318 14.9309 19.4324 12.994 19.8722 10.6254C19.9312 10.3223 19.9618 10.0148 19.9637 9.70641C20.0069 9.14419 19.9225 8.58038 19.717 8.05331C19.5076 7.51628 19.1784 7.03215 18.7553 6.63292C18.3322 6.23381 17.8251 5.92878 17.2704 5.73628C16.7336 5.55003 16.1628 5.47277 15.5944 5.50848C15.026 5.47277 14.4552 5.55003 13.9184 5.73628C13.3637 5.92878 12.8566 6.23381 12.4335 6.63292C12.2653 6.79166 12.1119 6.96382 11.975 7.14739C11.8381 6.96382 11.6847 6.79166 11.5164 6.63292C11.0934 6.23381 10.5863 5.92878 10.0315 5.73628ZM12.6156 16.4545C12.3569 16.6015 12.1382 16.7186 11.975 16.8034C11.8117 16.7186 11.593 16.6015 11.3344 16.4545C10.7422 16.1181 9.94729 15.629 9.13222 15.0173C7.45815 13.761 5.87972 12.1206 5.55202 10.3489L5.55134 10.3453L5.55063 10.3416C5.50766 10.1216 5.48608 9.89847 5.48611 9.67502L5.48611 9.64296L5.48338 9.61101C5.45407 9.26838 5.50386 8.92304 5.63052 8.59814C5.75725 8.27307 5.95872 7.97428 6.22403 7.72399C6.48946 7.47357 6.81224 7.27798 7.17128 7.1534C7.53039 7.02879 7.91525 6.97892 8.29861 7.00811L8.35554 7.01244L8.41248 7.00811C8.79583 6.97892 9.18069 7.02879 9.5398 7.1534C9.89884 7.27798 10.2216 7.47357 10.4871 7.72399C10.7524 7.97428 10.9538 8.27307 11.0806 8.59814C11.1229 8.70678 11.1656 8.94961 11.1938 9.23546C11.2064 9.36412 11.2144 9.4815 11.2192 9.56679C11.2216 9.60921 11.2232 9.64314 11.2241 9.6659L11.2251 9.69119L11.2252 9.69517L11.225 10.1952H12.725V9.69517L12.7249 9.69119L12.7258 9.6659C12.7268 9.64314 12.7283 9.60921 12.7307 9.56679C12.7355 9.4815 12.7435 9.36412 12.7562 9.23546C12.7843 8.94961 12.827 8.70678 12.8694 8.59814C12.9961 8.27307 13.1976 7.97428 13.4629 7.72399C13.7283 7.47357 14.0511 7.27798 14.4102 7.1534C14.7693 7.02879 15.1541 6.97892 15.5375 7.00811L15.5944 7.01244L15.6513 7.00811C16.0347 6.97892 16.4196 7.02879 16.7787 7.1534C17.1377 7.27798 17.4605 7.47357 17.7259 7.72399C17.9912 7.97428 18.1927 8.27307 18.3194 8.59814C18.4461 8.92304 18.4959 9.26838 18.4666 9.61101L18.4638 9.64296L18.4638 9.67503C18.4639 9.89846 18.4423 10.1216 18.3993 10.3416L18.3986 10.3453L18.3979 10.3489C18.0702 12.1206 16.4918 13.761 14.8177 15.0173C14.0027 15.629 13.2077 16.1181 12.6156 16.4545Z"
        fill={props.fill}
      />
    </svg>
  );
}
