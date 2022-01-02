interface Props {
    width: number;
    height: number;
    fill: string;
}

export default function PersonFill(props: Props): JSX.Element {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.75 11.875H14.1375C14.783 11.265 15.125 10.2945 15.125 9C15.125 6.6625 14.015 5.375 12 5.375C9.985 5.375 8.875 6.6625 8.875 9C8.875 10.2945 9.2165 11.265 9.8625 11.875H9.25C8.22265 11.8762 7.23772 12.2848 6.51128 13.0113C5.78483 13.7377 5.37619 14.7227 5.375 15.75V18.625H18.625V15.75C18.6238 14.7227 18.2152 13.7377 17.4887 13.0113C16.7623 12.2848 15.7773 11.8762 14.75 11.875Z"
                fill={props.fill}
            />
        </svg>
    );
}
