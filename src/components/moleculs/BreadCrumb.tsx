import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface BreadCrumbProps {
  route: string;
}

export default function BreadCrumb({ route }: BreadCrumbProps) {
  return (
    <div className="sm:min-h-80 min-h-60 w-full flex justify-center items-center bg-black-100">
      <div className="flex gap-x-10 justify-center items-center">
        <Link
          href="/"
          className="sm:text-3xl text-xl font-bold hover:text-white text-lime duration-300 transition-colors"
        >
          Home
        </Link>
        <MdKeyboardDoubleArrowRight className="w-4 h-4 text-lime" />
        <h1 className="sm:text-3xl text-xl font-bold text-white">{route}</h1>
      </div>
    </div>
  );
}
