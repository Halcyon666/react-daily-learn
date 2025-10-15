// 定义 props 类型
interface ClaudeRecipeProps {
  recipe: string;
}

// 方式 1：使用函数组件
const ClaudeRecipe = ({ recipe }: ClaudeRecipeProps) => {
  return <section>{recipe}</section>;
};

export default ClaudeRecipe;
