import Image from "next/image";

interface FeedbackCardProps {
  image: any;
  alt: string;
  feedback: string;
  author: string;
}

const FeedbackCard = ({ image, alt, feedback, author }: FeedbackCardProps) => {
  return (
    <blockquote className="p-4 bg-white rounded-md shadow w-full">
      <div className="flex items-start justify-start gap-x-1">
        <Image
          src={image}
          alt={alt}
          width={400}
          height={400}
          className="size-[40px] lg:size-[50px] rounded-full object-cover flex-shrink-0"
        />
        <p className="text-black_sub text-sm md:text-base font-normal">
          {feedback}
        </p>
      </div>
      <footer className="mt-2 text-right text-sm text-blue_sub font-medium">
        - {author}
      </footer>
    </blockquote>
  );
};

export default FeedbackCard;
