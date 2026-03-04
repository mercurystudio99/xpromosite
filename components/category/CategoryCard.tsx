import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href: string;
  imageUrl: string;
}

export function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 justify-between">
      <div className="relative aspect-square w-full max-w-[200px] overflow-hidden ">
        asdfasdfasdfasdf
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="   transition-transform "
          />
        )}
      </div>
      <h3 className="text-center text-sm font-medium">{title}</h3>
      <Link
        href={`/categories/${title}`}
        className=" bg-black text-white py-2 rounded-full   px-6 hover:bg-white  hover:text-newprimary border border-newprimary transition-colors duration-300 ease-in-out"
      >
        Explore
      </Link>
    </div>
  );
}
