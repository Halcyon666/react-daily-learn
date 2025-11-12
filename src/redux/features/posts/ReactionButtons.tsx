import { useAppDispatch } from "../../hooks";
import { reactionAdded, type PostData, type Reactions } from "./postsSlice";

const reactionEmoji: Record<keyof Reactions, string> = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ id, reactions }: PostData) => {
  const dispatch = useAppDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const reaction = name as keyof Reactions;
    return (
      <button
        key={name}
        className="reactionButton"
        onClick={() => dispatch(reactionAdded({ postId: id, reaction }))}
      >
        {emoji} {reactions[reaction]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
