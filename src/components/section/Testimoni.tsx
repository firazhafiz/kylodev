import { QuoteIcon } from "lucide-react";
import Image from "next/image";
import customer1 from "../../../public/images/testimoni1.avif";
import customer2 from "../../../public/images/testimoni2.avif";
import customer3 from "../../../public/images/testimoni3.avif";


export default function Testimoni() {
  const data = [
    {
      name: "Rama Pratama",
      photo: customer2,
      review:
        "Pelayanan sangat memuaskan. Website ini membantu saya menemukan informasi dengan cepat.",
    },
    {
      name: "Dewi Anjani",
      photo: customer1,
      review:
        "Desainnya modern dan responsif. Saya sangat merekomendasikannya untuk kebutuhan profesional.",
    },
    {
      name: "Fajar Nugroho",
      photo: customer3,
      review:
        "Navigasi jelas dan fitur-fiturnya lengkap. Pengalaman pengguna terasa sangat nyaman.",
    },
  ];

  return (
    <div className=" flex justify-center sm:pt-30 sm:pb-14 py-20 px-4">
      <div className="max-w-7xl  w-full">
        <div className="text-center">
          <p className="text-navy tracking-wide uppercase">Testimoni</p>
          <h2 className="text-3xl font-semibold mt-2">
            Apa Kata Pengguna Tentang Layanan Kami
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-lime/70 rounded-2xl  flex flex-col gap-4 justify-between items-start overflow-hidden "
            >
              <div className="p-6 max-w-[280px]">
                <QuoteIcon className="text-navy mb-4" />
                <p className=" text-gray-700 leading-10 text-xl  font-medium">
                  {item.review}
                </p>
              </div>
              <div className="relative flex gap-4 items-center justify-center bg-white rounded-tr-2xl p-4">
                <div className="tag absolute -top-10 left-0 h-10 w-10  rounded-full  shadow-white"></div>
                <div className="tag2 absolute bottom-0 -right-10 h-10 w-10  rounded-full  shadow-white"></div>
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <h3 className="font-semibold text-black-100 text-sm ">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
