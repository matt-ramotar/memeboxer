import { Grid, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../../lib/user";
import { MemeTag, User } from "../../types";

interface Props {
    memeTag: MemeTag;
}

export default function UserTag(props: Props): JSX.Element | null {
    const theme = useTheme();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUserAsync() {
            const response = await getUser(props.memeTag.userId);
            setUser(response);
        }

        fetchUserAsync();
    }, [props.memeTag.userId]);

    if (!user) return null;

    return (
        <Grid style={{ padding: 8, cursor: "pointer" }} onClick={() => navigate(`/${user.username}`)}>
            <Typography variant="caption" style={{ fontWeight: "bold" }}>
                {user.username}
            </Typography>
        </Grid>
    );
}
