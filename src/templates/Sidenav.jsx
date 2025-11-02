import React from "react";
import { Link } from "react-router-dom";

import { Clapperboard, Film, Heart, Users, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTrigger,
} from "../components/ui/sheet";
import { ThemeToggle } from "../components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Movies", icon: Film },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/person", label: "People", icon: Users },
];
function Sidenav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-background border-l-border text-foreground flex flex-col"
      >
        <SheetHeader>
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Clapperboard className="h-7 w-7 text-[#6556CD]" />
            <span className="text-xl font-bold text-foreground">
              Movie Explorer
            </span>
          </Link>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                to={link.href}
                className="flex items-center gap-3 rounded-lg p-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Sidenav;