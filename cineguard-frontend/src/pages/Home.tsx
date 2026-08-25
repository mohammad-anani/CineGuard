import Buttons from "../components/home/Buttons";
import Intro from "../components/home/Intro";

function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <Intro />
        <Buttons />
      </div>
    </div>
  );
}

export default Home;