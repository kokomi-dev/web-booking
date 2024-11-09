import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { Dot, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import SheetShowComments from "./sheet-show";

interface IShowCommentsImage {
  comments: [
    {
      name: string;
      nameShow: string;
      content: string;
      commmentDate: string;
      ratingVote: number;
    }
  ];
  rating: number;
  slug: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowCommentsImage: React.FC<IShowCommentsImage> = ({
  comments,
  rating,
  slug,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <React.Fragment>
      <div className="absolute top-[25px] left-[30px] bg-bg_primary_white rounded-8  text-black shadow-2xl">
        <Carousel
          setApi={setApi}
          className="w-full min-w-[16rem] max-w-[17rem] select-none relative p-2 "
        >
          <div
            className="flex items-center justify-start gap-x-1 pt-3 p-2 text-small select-none hover:cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <div>
              <Star className="size-6 text-yellow_main fill-yellow_main" />
            </div>
            <h4 className="text-normal font-semibold">{rating}</h4>
            <Dot />
            <span className="text-small text-blue_main_sub font-normal">
              {comments.length} đánh giá
            </span>
          </div>
          <h5 className="text-small font-semibold p-2 ">Đánh giá gần đầy</h5>
          <CarouselContent>
            {comments &&
              comments.length > 0 &&
              comments.map((comment, index) => (
                <CarouselItem key={index} className="">
                  <Card>
                    <CardContent className="w-full grid gap-y-1 p-2  shadow-none border-none ">
                      <div className="w-full flex  items-center justify-start gap-x-1  ">
                        <div className=" size-9 bg-bg_primary_active rounded-full  relative">
                          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <span className="text-white capitalize font-medium text-small">
                              {comment.nameShow}
                            </span>
                          </div>
                        </div>
                        <h5 className="text-smallest font-semibold capitalize">
                          {comment.name}
                        </h5>
                      </div>
                      <p className="text-smallest font-normal first:uppercase pl-3 text-justify">
                        {comment.content}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
          <div className="max-w-[80%] w-full h-[45px] absolute bottom-[-60px] left-[50%] right-0 translate-x-[-50%] translate-y-[-50%]  flex items-center gap-x-2">
            <CarouselPrevious className="absolute left-0 bg-bg_primary_blue_sub text-white" />
            <CarouselNext className="absolute right-0 bg-bg_primary_blue_sub text-white" />
          </div>
        </Carousel>
        <div className="p-2 flex items-center justify-center text-small min-w-[50%]">
          {Array.from({ length: comments.length }).map((_, index) => {
            return (
              <Dot
                key={index}
                className={cn(
                  "size-6",
                  current === index + 1 && "text-yellow_main size-7"
                )}
              />
            );
          })}
        </div>
      </div>
      <SheetShowComments
        open={open}
        setOpen={setOpen}
        rating={rating}
        comments={comments}
        slug={slug}
      />
    </React.Fragment>
  );
};
export default ShowCommentsImage;
