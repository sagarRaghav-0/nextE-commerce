'use client';

import { addNewUser } from "@/lib/services/userRelated/addUsers";
import { clearCart } from "@/redux/slices/cartslice";
import { RootState } from "@/redux/store";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import {
  FaBars,
  FaShoppingBag, FaTimes
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  const dispatch = useDispatch();


  const isAdmin = user?.publicMetadata?.role === "admin";

  const isShop = pathname === "/shop";
  const isContact = pathname === "/contact";
  const isCheckout = pathname === "/checkout";
  const isOrders = pathname === "/orders";
  const isCart = pathname === "/cart";

  const isProductDetail = pathname.startsWith("/shop/productdetail/");





  const cart = useSelector((state: RootState) => state.cart.cart);



  let len = 0

  for (const row of cart!) {
    len = len + row.quantity
  }

  useEffect(() => {
    if (isLoaded && user) {
      const userData = {
        id: '',
        created_at: '',
        clerk_id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress || "",
        username: user.username || "",
        full_name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        image_url: user.imageUrl || "",
      };


      addNewUser(userData);
    }
  }, [isLoaded, user]);


  const clearDataOnSignOut = () => {
    console.log("clear data");
    dispatch(clearCart());
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-transparent z-50 tracking-widest w-full">
      <div
        className={`flex items-center justify-between px-4 md:px-10 py-4 md:py-6 w-full transition-colors duration-300 ${isShop || isContact || isCart || isCheckout || isProductDetail || isOrders
          ? "text-black"
          : "text-[var(--nav-color)]"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          E COM
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-md font-medium">
          <Link href="/" className={pathname === "/" ? "text-[var(--btn-color)]" : ""}>Home</Link>
          <Link href="/shop" className={isShop ? "text-[var(--btn-color)]" : ""}>Shop</Link>
          <Link href="/about" className={pathname === "/about" ? "text-[var(--btn-color)]" : ""}>About</Link>
          <Link href="/contact" className={isContact ? "text-[var(--btn-color)]" : ""}>Contact</Link>

          {
            user && (
              <Link href="/orders" className={isOrders ? "text-[var(--btn-color)]" : ""}>Orders</Link>

            )
          }

          {/* Show Dashboard link only if admin */}
          {isAdmin && (

            <Link href="/dashboard" className={pathname === "/dashboard" ? "text-[var(--btn-color)]" : ""}>
              Dashboard
            </Link>

          )}

          <div className=" items-center justify-center gap-3 hidden md:flex">
            <SignedOut >
              <SignInButton mode="modal" forceRedirectUrl="/">
                <button className="py-2 px-4 cursor-pointer bg-[var(--btn-color)] text-white font-bold hover:bg-lime-800 rounded-full">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
              <SignOutButton redirectUrl="/" >
                <button onClick={clearDataOnSignOut} className="py-2 px-4 cursor-pointer bg-red-600 text-white font-bold hover:bg-red-700 rounded-full">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>
          </div>


          <Link href="/cart">
            <div className="relative">
              <div className="absolute top-[-5px] right-[-10px] w-5 h-5 rounded-full bg-red-500 text-white text-center text-[12px] font-bold">{len}</div>
              <FaShoppingBag className="w-7 h-7" />
            </div>
          </Link>
        </nav>

        {/* Cart + Menu for mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <SignedOut >
            <SignInButton mode="modal" forceRedirectUrl="/">
              <button className="py-2 px-4 cursor-pointer bg-[var(--btn-color)] text-white font-bold hover:bg-lime-800 rounded-full">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <SignOutButton redirectUrl="/" >
              <button onClick={clearDataOnSignOut} className="py-2 px-4 cursor-pointer bg-red-600 text-white font-bold hover:bg-red-700 rounded-full">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>


        <div className="flex items-center gap-6 md:hidden">
          <Link href="/cart">
            <div className="relative">
              <div className="absolute top-[-5px] right-[-10px] w-5 h-5 rounded-full bg-red-500 text-white text-center text-[12px] font-bold">
                {len}
              </div>
              <FaShoppingBag className="w-7 h-7" />
            </div>
          </Link>
          <button onClick={toggleMenu} aria-label="Menu">
            <FaBars className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-[999] shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>

        <div className="flex justify-end items-center px-6 py-4 border-b  ">
          <button onClick={toggleMenu} aria-label="Close">
            <FaTimes className="w-6 h-6 text-black cursor-pointer" />
          </button>
        </div>

        <nav className="flex flex-col items-center px-6 py-4 gap-4 text-black text-md font-medium">
          <Link href="/" onClick={toggleMenu} className={pathname === "/" ? "text-[var(--btn-color)]" : ""}>Home</Link>
          <Link href="/shop" onClick={toggleMenu} className={isShop ? "text-[var(--btn-color)]" : ""}>Shop</Link>
          <Link href="/about" onClick={toggleMenu} className={pathname === "/about" ? "text-[var(--btn-color)]" : ""}>About</Link>
          <Link href="/contact" onClick={toggleMenu} className={isContact ? "text-[var(--btn-color)]" : ""}>Contact</Link>

          {
            user && (
              <Link href="/orders" className={isOrders ? "text-[var(--btn-color)]" : ""}>Orders</Link>

            )
          }

          {isAdmin && (
            <Link href="/dashboard" onClick={toggleMenu} className={pathname === "/dashboard" ? "text-[var(--btn-color)]" : ""}>
              Dashboard
            </Link>
          )}


        </nav>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-white/20 backdrop-blur-sm z-[998]"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};

export default Header;
