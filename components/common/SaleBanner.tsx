import Link from "next/link";

const Sale = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[url('/banners/sale.webp')] bg-no-repeat bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      <div className="relative z-20 text-center text-[#f1f1f1] px-6 max-w-3xl mx-auto py-14 md:py-24" >
        <h3 className="text-2xl md:text-5xl font-bold tracking-wider">
          Flash Sale: Up to 50% Off <br />
          On Select Items!
        </h3>
        <p className="mt-4 text-xs md:text-lg">
          Don’t miss out on our flash sale event! For a limited time, enjoy up to 50%
          off on a selection of our best-selling products.
        </p>

        <Link href='/shop'>
          <button className=" cursor-pointer mt-6 bg-transparent hover:bg-[#f1f1f1] text-white hover:text-[#030303] border border-white py-3 px-8 rounded-full transition-all duration-300 tracking-wider capitalize">

            Shop Now

          </button>
        </Link>
      </div>
    </div>

  );
};

export default Sale;
