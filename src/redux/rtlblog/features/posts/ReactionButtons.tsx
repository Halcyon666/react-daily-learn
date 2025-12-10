import {
  useAddReactionMutation,
  type PostData,
  type Reactions,
} from "./postsSlice";

const reactionEmoji: Record<keyof Reactions, string> = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ id, reactions }: PostData) => {
  const [addReaction] = useAddReactionMutation();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    // fix error
    const reaction = name as keyof Reactions;
    return (
      <button
        key={name}
        className="reactionButton"
        onClick={() => {
          const newValue = reactions[reaction] + 1;
          addReaction({
            postId: id,
            reactions: { ...reactions, [reaction]: newValue },
          });
        }}
      >
        {emoji} {reactions[reaction]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
