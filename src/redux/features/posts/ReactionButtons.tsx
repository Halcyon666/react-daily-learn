import { useAppDispatch } from "../../hooks";
import { reactionAdded, type PostData, type Reactions } from "./postsSlice";

const reactionEmoji: Record<keyof Reactions, string> = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ id, reaction, reactions }: PostData) => {
  const dispatch = useAppDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        className="reactionButton"
        onClick={() => dispatch(reactionAdded({ postId: id, reaction }))}
      >
        {emoji} {reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
