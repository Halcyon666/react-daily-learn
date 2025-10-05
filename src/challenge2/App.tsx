// 1:17:01 Custom Components Part 2
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";
// 不要忘记导入 不然css没有效果
import "./app.css";

export default function Page() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}
