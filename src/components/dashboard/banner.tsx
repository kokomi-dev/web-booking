import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
interface BannerProps {
  children: React.ReactNode;
  image: StaticImageData;
}
const Banner: React.FC<BannerProps> = ({ children, image }) => {
  return (
    <div
      className={cn(
        "absolute w-full px-[-9rem] mt-[-1.5rem]  mx-[-9rem] h-auto "
      )}
    >
      <Image
        width={2000}
        height={2000}
        src={image}
        alt="img__banner"
        className="z-[5] max-h-[100vh] h-full object-cover brightness-75"
        priority
      />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Banner;
