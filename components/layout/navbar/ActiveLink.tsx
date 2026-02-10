"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { HomeIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "use-intl";

export function ActiveLink() {
  const pathname = usePathname();
  const t = useTranslations('Navbar');
  const locations = [
    {id: 1,href: "/", name: t("home")},
    {id: 2,href: "/contact", name: t("contact")},
    {id: 3, href: "/search", name: t("store")},
  ]



  const desktopLinkStyle = "text-sm text-gray-700 font-semibold whitespace-nowrap px-3 py-1 rounded-lg transition-colors duration-150 hover:bg-gray-100 hover:text-black";

  return (
    <>
    {locations.map((location) => {
        const isActive =
    pathname === location.href || pathname.startsWith(`${location.href}/`);
      return(
      <Link href={location.href} className={`relative`} key={location.id}>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className={desktopLinkStyle}>{location.name}</p>
            </motion.span>
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
      );
    })}
   
        </>

  );
}

export function AnimatedMenuLink() {
  const pathname = usePathname();
  const prefetch = true;

    const t = useTranslations("Navbar");
  const locations = [
    {id: 1, href: "/", name: t("home"), icon: HomeIcon},
    {id: 2, href: "/contact", name: t("contact"), icon: EnvelopeIcon},
    {id: 3,href: "/search", name: t("store"), icon: ShoppingBag},
  ]


  return (
    <>
    {locations.map((location) => {
       const isActive =
      pathname === location.href || pathname.startsWith(`${location.href}/`);
    

      return(
        <Link href={location.href} prefetch={prefetch} key={location.id} className={`w-full block relative`}>
          <motion.div
            className="text-neutral-500 block relative w-full"
            whileHover={{ 
              color: "#000000",
              transition: { duration: 0.2 }
            }}
          >
             <motion.div 
                        className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-black transition-colors w-full"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <location.icon className="h-5 w-5 mr-3" />
                        <span className="text-base font-medium">{location.name}</span>
            </motion.div>
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.div>
        </Link>
      );
    })}

    </>
  );
}

export function AnimatedMenuLink2({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const prefetch = true;
  const isActive =
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} prefetch={prefetch} className={`${className} block relative`}>
      <motion.div
        className="text-neutral-500 block relative w-full"
        whileHover={{ 
          color: "#000000",
          transition: { duration: 0.2 }
        }}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
            layoutId="underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
}