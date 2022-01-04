import { Box, Typography, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setReactions } from "../../store/meme";
import { GodMeme, Reaction } from "../../types";
import { API_URL } from "../../util/secrets";
import { UserIdToMemeReactionIdsMap } from "./MemeFeedItem";

interface Props {
    reactionId: string;
    count: number;
    userIds: string[];
    memeId: string;
    userIdToMemeReactionIdsMap: UserIdToMemeReactionIdsMap;
}

export default function ReactionChip(props: Props): JSX.Element | null {
    const theme = useTheme();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);

    const [reaction, setReaction] = useState<Reaction | null>(null);
    const [count, setCount] = useState(props.count);
    const [userHasReacted, setUserHasReacted] = useState<boolean | null>(null);
    const [userMemeReactionIds, setUserMemeReactionIds] = useState<string[] | null>(null);

    const onClick = () => {
        async function deleteMemeReactionAsync(memeReactionIds: string[]) {
            for (const memeReactionId of memeReactionIds) {
                const response = await axios.delete(`${API_URL}/v1/memes/${props.memeId}/reactions/${memeReactionId}`, { data: { userId: user.id, token: user.token } });
                const godMeme: GodMeme = response.data;

                if (godMeme.reactions) {
                    dispatch(setReactions(godMeme.reactions));
                }
                setCount(count - 1);
                setUserHasReacted(false);
            }
        }

        async function createMemeReactionAsync() {
            const addMemeReactionInput = {
                reactionId: props.reactionId,
                userId: user.id,
            };

            const response = await axios.post(`${API_URL}/v1/memes/${props.memeId}/reactions`, addMemeReactionInput);
            setCount(count + 1);
            setUserHasReacted(true);
        }

        if (user.id && userHasReacted == true && userMemeReactionIds) {
            deleteMemeReactionAsync(userMemeReactionIds);
        } else if (user.id && userHasReacted == false) {
            createMemeReactionAsync();
        }
    };

    useEffect(() => {
        async function fetchReaction() {
            const response = await axios.get(`${API_URL}/v1/reactions/${props.reactionId}`);
            console.log("fetched reaction", response.data);
            setReaction(response.data);
        }
        fetchReaction();
    }, [props.reactionId]);

    useEffect(() => {
        if (user && user.id) {
            setUserHasReacted(Boolean(props.userIds.includes(user.id)));
        } else {
            setUserHasReacted(false);
        }
    }, [user]);

    useEffect(() => {
        if (user && user.id) {
            if (props.userIdToMemeReactionIdsMap[user.id] && props.userIdToMemeReactionIdsMap[user.id][props.reactionId]) {
                setUserMemeReactionIds(props.userIdToMemeReactionIdsMap[user.id][props.reactionId]);
            }
        }
    }, [user, props.userIdToMemeReactionIdsMap]);

    useEffect(() => {
        setCount(props.count);
    }, [props.count]);

    if (!reaction) return null;

    return (
        <Box
            key={reaction.id}
            style={{
                display: count > 0 ? "flex" : "none",
                visibility: count > 0 ? "visible" : "hidden",
                flexDirection: "row",
                backgroundColor: userHasReacted ? "#E3F2FD" : "#f1f1f1",
                padding: "2px 6px",
                border: userHasReacted ? `1px solid ${theme.palette.primary.main}` : "none",
                borderRadius: 16,
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <Typography variant="body2">{reaction.native}</Typography>
            <Typography variant="body2" style={{ marginLeft: 4, color: userHasReacted ? theme.palette.primary.main : theme.palette.text.primary, fontFamily: "Space Grotesk" }}>
                {count}
            </Typography>
        </Box>
    );
}
