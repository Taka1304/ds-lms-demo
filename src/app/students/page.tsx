import { redirect } from "next/navigation";

const Home = () => {
  // 暫定対応
  redirect("/students/courses");

  return <div>Home</div>;
};

export default Home;
