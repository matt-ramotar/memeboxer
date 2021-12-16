interface Props {
  fill: string;
  height: number;
  width: number;
}

export default function SettingsIcon(props: Props): JSX.Element {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 9.00004C11.5988 8.97211 11.1963 9.03056 10.8197 9.17145C10.443 9.31233 10.101 9.53237 9.81664 9.81672C9.53229 10.1011 9.31225 10.4431 9.17136 10.8198C9.03048 11.1964 8.97203 11.5989 8.99996 12C8.97203 12.4012 9.03048 12.8037 9.17136 13.1803C9.31225 13.557 9.53229 13.899 9.81664 14.1834C10.101 14.4677 10.443 14.6878 10.8197 14.8286C11.1963 14.9695 11.5988 15.028 12 15C12.4011 15.028 12.8036 14.9695 13.1802 14.8286C13.5569 14.6878 13.8989 14.4677 14.1833 14.1834C14.4676 13.899 14.6877 13.557 14.8286 13.1803C14.9694 12.8037 15.0279 12.4012 15 12C15.0279 11.5989 14.9694 11.1964 14.8286 10.8198C14.6877 10.4431 14.4676 10.1011 14.1833 9.81672C13.8989 9.53237 13.5569 9.31233 13.1802 9.17145C12.8036 9.03056 12.4011 8.97211 12 9.00004ZM12 13.5C11.7969 13.5253 11.5909 13.5038 11.3974 13.4374C11.2039 13.3709 11.0282 13.2612 10.8835 13.1165C10.7388 12.9719 10.6291 12.7961 10.5626 12.6026C10.4962 12.4091 10.4747 12.2031 10.5 12C10.4747 11.797 10.4962 11.5909 10.5626 11.3975C10.6291 11.204 10.7388 11.0282 10.8835 10.8836C11.0282 10.7389 11.2039 10.6292 11.3974 10.5627C11.5909 10.4963 11.7969 10.4748 12 10.5C12.203 10.4748 12.4091 10.4963 12.6025 10.5627C12.796 10.6292 12.9718 10.7389 13.1164 10.8836C13.2611 11.0282 13.3708 11.204 13.4373 11.3975C13.5037 11.5909 13.5252 11.797 13.5 12C13.5252 12.2031 13.5037 12.4091 13.4373 12.6026C13.3708 12.7961 13.2611 12.9719 13.1164 13.1165C12.9718 13.2612 12.796 13.3709 12.6025 13.4374C12.4091 13.5038 12.203 13.5253 12 13.5Z"
        fill={props.fill}
      />
      <path
        d="M18 12C18 11.85 17.995 11.7 17.985 11.5375L19.374 9.7725L17.6165 6.7275L15.6275 7.014C15.2865 6.7851 14.9207 6.59556 14.537 6.449L13.758 4.5H10.242L9.46249 6.45C9.07882 6.59656 8.71299 6.7861 8.37199 7.015L6.38299 6.7285L4.62549 9.7735L6.01449 11.5385C6.00449 11.6985 5.99949 11.852 5.99949 12.001C5.99949 12.15 6.00449 12.301 6.01449 12.4635L4.62549 14.2285L6.38299 17.2735L8.37199 16.987C8.71299 17.2159 9.07882 17.4054 9.46249 17.552L10.242 19.5H13.7575L14.537 17.55C14.9207 17.4034 15.2865 17.2139 15.6275 16.985L17.6165 17.2715L19.374 14.2265L17.985 12.4615C17.995 12.3 18 12.15 18 12ZM16.468 11.3755C16.4875 11.5755 16.5 11.7845 16.5 12C16.5 12.2155 16.487 12.4225 16.468 12.6245L16.4395 12.9245L17.5675 14.358L16.825 15.643L15.225 15.413L14.975 15.608C14.6035 15.8908 14.1851 16.1059 13.739 16.2435L13.4 16.35L12.742 18H11.258L10.6 16.35L10.263 16.2425C9.81687 16.1049 9.39848 15.8898 9.02699 15.607L8.77699 15.412L7.17699 15.642L6.43449 14.357L7.56249 12.9235L7.53399 12.6235C7.51299 12.4225 7.49999 12.2155 7.49999 12C7.49999 11.7845 7.51299 11.5775 7.53199 11.3755L7.56049 11.0755L6.43249 9.642L7.17499 8.357L8.77499 8.587L9.02499 8.392C9.39648 8.10924 9.81487 7.89412 10.261 7.7565L10.6 7.65L11.258 6H12.7425L13.4 7.65L13.737 7.7575C14.1831 7.89512 14.6015 8.11023 14.973 8.393L15.223 8.588L16.823 8.358L17.5655 9.643L16.4375 11.0765L16.468 11.3755Z"
        fill={props.fill}
      />
    </svg>
  );
}
