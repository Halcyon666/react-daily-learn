import Markdown from "react-markdown";

// 定义 props 类型
interface ClaudeRecipeProps {
  recipe: string;
}

// 方式 1：使用函数组件
const ClaudeRecipe = ({ recipe }: ClaudeRecipeProps) => {
  return <Markdown>{recipe}</Markdown>;
};

export default ClaudeRecipe;
