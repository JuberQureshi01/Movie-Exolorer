import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Clapperboard,
  Film,
  Heart,
  Users,
  Search,
  XIcon,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../components/ui/dialog";
import SearchComponent from "../templates/SearchComponent";
import Sidenav from "../templates/Sidenav";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Movies", icon: Film },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/person", label: "People", icon: Users },
];
function Header() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full h-[10vh] border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <Clapperboard className="h-7 w-7 text-[#6556CD]" />
          <span className="hidden text-xl font-bold text-foreground sm:inline-block">
            Movie Explorer
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
          <SearchComponent />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Dialog
            open={isMobileSearchOpen}
            onOpenChange={setIsMobileSearchOpen}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 " />
              </Button>
            </DialogTrigger>
            <DialogContent className="top-4 translate-y-0 rounded-none border-0 bg-background p-4">
              <DialogClose
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <XIcon />
              </DialogClose>
              <SearchComponent isMobile={true} />
            </DialogContent>
          </Dialog>
          <ThemeToggle />
          <Sidenav />
        </div>
      </div>
    </header>
  );
}

export default Header;
