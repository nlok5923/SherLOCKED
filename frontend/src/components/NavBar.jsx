import ConnectWallet from "@/components/ConnectWallet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const NavMenu = () => {
  const handleAboutClick = () => {
    document.getElementById("about-container").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" className="text-4xl font-bold text-[#702963]">
            SherLOCKED
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div className="flex gap-x-6 items-center text-[#702963]">
            <ConnectWallet />
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
