import { Box, Typography, useTheme } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MemeTagInput } from "../../lib/meme";
import { addMemeTagInput } from "../../store/createMeme";
import { User } from "../../types";
import { FALLBACK_AVATAR } from "../../util/constants";

interface Props {
    user: User;
    xOffset: number;
    yOffset: number;
}

export default function TagSearchResult(props: Props): JSX.Element {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [profilePicture, setProfilePicture] = useState<string>(FALLBACK_AVATAR);

    const onClick = () => {
        if (props.user._id) {
            const memeTagInput: MemeTagInput = {
                userId: props.user._id,
                xOffset: props.xOffset,
                yOffset: props.yOffset,
            };

            dispatch(addMemeTagInput(memeTagInput));
        }
    };

    useEffect(() => {
        if (props.user) {
            setProfilePicture(`https://dropbox-appbox-media.s3.amazonaws.com/dropboxer-photos/${props.user.username}.jpg`);
        }
    }, [props.user]);

    return (
        <Box style={{ display: "flex", flexDirection: "row", padding: 8, flexWrap: "nowrap", overflowY: "hidden", cursor: "pointer" }} onClick={onClick}>
            <img
                src={profilePicture ?? ""}
                onError={() => setProfilePicture(FALLBACK_AVATAR)}
                alt="avatar"
                style={{ height: 30, width: 30, borderRadius: "50%", objectFit: "cover", objectPosition: "center" }}
            />
            <Box>
                <Typography variant="body1">{props.user.name}</Typography>
                <Typography variant="body1">{props.user.username}</Typography>
            </Box>
        </Box>
    );
}
