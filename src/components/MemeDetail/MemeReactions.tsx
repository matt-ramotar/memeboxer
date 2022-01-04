import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GodMeme } from "../../types";
import { ReactionIdToUserIdsMap, UserIdToMemeReactionIdsMap } from "../MemeFeedItem/MemeFeedItem";
import ReactionChip from "../MemeFeedItem/ReactionChip";

interface Props {
  meme: GodMeme;
}

interface MemeReactionInfo {
  reactionIdToUserIds: [string, string[]][];
  userIdToMemeReactionIdsMap: UserIdToMemeReactionIdsMap;
}

export default function MemeReactions(props: Props): JSX.Element | null {
  const reactions = useSelector((state: RootState) => state.meme.reactions);

  const [reactionIdToUserIdsMap, setReactionIdToUserIdsMap] = useState<ReactionIdToUserIdsMap | null>(null);
  const [userIdToMemeReactionIdsMap, setUserIdToMemeReactionIdsMap] = useState<UserIdToMemeReactionIdsMap | null>(null);
  const [memeReactionInfo, setMemeReactionInfo] = useState<MemeReactionInfo | null>(null);

  useEffect(() => {
    if (reactions) {
      const reactionIdToUserIdsMap: ReactionIdToUserIdsMap = {};
      const userIdToMemeReactionIdsMap: UserIdToMemeReactionIdsMap = {};

      for (const reaction of reactions) {
        if (reactionIdToUserIdsMap[reaction.reactionId]) reactionIdToUserIdsMap[reaction.reactionId].push(reaction.userId);
        else reactionIdToUserIdsMap[reaction.reactionId] = [reaction.userId];

        if (userIdToMemeReactionIdsMap[reaction.userId]) userIdToMemeReactionIdsMap[reaction.userId].push(reaction.id);
        else userIdToMemeReactionIdsMap[reaction.userId] = [reaction.id];
      }

      setReactionIdToUserIdsMap(reactionIdToUserIdsMap);
      setUserIdToMemeReactionIdsMap(userIdToMemeReactionIdsMap);
    }
  }, [reactions]);

  useEffect(() => {
    const reactionIdToUserIds = reactionIdToUserIdsMap && Object.keys(reactionIdToUserIdsMap) ? Object.entries(reactionIdToUserIdsMap) : [];
    const memeReactionInfo: MemeReactionInfo = {
      reactionIdToUserIds,
      userIdToMemeReactionIdsMap: userIdToMemeReactionIdsMap ?? {},
    };

    setMemeReactionInfo(memeReactionInfo);
  }, [reactionIdToUserIdsMap, userIdToMemeReactionIdsMap]);

  if (!memeReactionInfo) return null;

  return (
    <Grid container>
      <Grid container spacing={1} style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
        {memeReactionInfo.reactionIdToUserIds.map(([reactionId, userIds]) => (
          <Grid item xs={2} key={reactionId} style={{}}>
            <ReactionChip reactionId={reactionId} count={userIds.length} userIds={userIds} memeId={props.meme.id} userIdToMemeReactionIdsMap={memeReactionInfo.userIdToMemeReactionIdsMap} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
