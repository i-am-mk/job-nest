import { Button } from "./ui";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-4 my-10">
        <span className="mx-auto px-4 py-2 text-yellow-400 bg-gray-900 rounded-full font-medium">
          Your No. 1 Platform for Career Growth
        </span>
        <h1 className="text-5xl font-bold">
          Find, Apply, and <br />
          Land Your <span className="text-purple-600">Dream Job</span>
        </h1>
        <p>
          Empowering your career journey with endless opportunities. Unlock your
          potential and step into the future with confidence.
        </p>
      </div>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Search for your dream role"
          className="outline-none border-none w-full"
        ></input>
        <Button className="rounded-r-full bg-purple-600">
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
