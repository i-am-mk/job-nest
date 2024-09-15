import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "UI/UX Designer",
  "Mobile App Developer",
  "DevOps Engineer",
  "AI/ML Engineer",
  "Cloud Architect",
  "Product Manager",
  "Blockchain Developer",
];

const CategoryCarousel = () => {
  return (
    <div className="py-10 relative">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="flex gap-4 px-12">
          {roles.map((role, i) => (
            <CarouselItem key={i} className="flex-1 min-w-[170px]">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium py-3 rounded-lg shadow-md">
                {role}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className=" bg-gray-800 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 z-10" />
        <CarouselNext className="bg-gray-800 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 z-10" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
