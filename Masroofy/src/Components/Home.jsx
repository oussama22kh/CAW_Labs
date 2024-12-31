import inc from "/increase.png";
import bln from "/balance.png";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className=" text-[36px] text-[#0B666A] font-semibold">Home</h1>
      <div className="mt-[100px] flex w-full h-[200px] gap-[50px]">
        <div className="relative  flex px-[50px] py-[20px] bg-[#35A29F] w-full h-full rounded-2xl  overflow-hidden group shadow-xl ">
          <h1 className="z-10 text-[28px] text-white font-semibold">
            Total Income
          </h1>
          <div
            className="absolute opacity-20 top-[-50px] right-5 w-[200px] h-[200px] bg-no-repeat bg-contain transform rotate-[192deg] translate-x-[20%] translate-y-[20%] transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-[200deg]"
            style={{ backgroundImage: `url(${inc})` }}
          ></div>
        </div>
        <div className=" relative flex px-[50px] py-[20px] bg-[#F95454] w-full h-full rounded-2xl  overflow-hidden group shadow-xl ">
          <div
            className="absolute opacity-20 bottom-5 right-5 w-[200px] h-[200px] bg-no-repeat bg-contain transform rotate-12 translate-x-[20%]  translate-y-[20%] transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-[20deg] "
            style={{ backgroundImage: `url(${inc})` }}
          ></div>
          <h1 className="z-10 text-[28px] text-white font-semibold">
            Total Expenses
          </h1>
          <h1 className="z-10 text-[28px] text-white font-semibold">0 Dzd</h1>
        </div>
        <div className="relative flex px-[50px] py-[20px] bg-[#77CDFF] w-full h-full rounded-2xl overflow-hidden group shadow-xl">
          <div
            className="absolute opacity-20 bottom-10 right-10 w-[180px] h-[180px] bg-no-repeat bg-contain transform rotate-12 translate-x-[20%] translate-y-[20%] transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-[20deg]"
            style={{ backgroundImage: `url(${bln})` }}
          ></div>
          <h1 className="z-10 text-[28px] text-white font-semibold">
            Balance{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
