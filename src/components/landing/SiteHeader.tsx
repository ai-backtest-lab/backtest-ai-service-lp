"use client";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
const links = [
  ["Platform", "#product"],
  ["Claude AI", "#claude-ai"],
  ["Architecture", "#architecture"],
  ["Roadmap", "#roadmap"],
  ["About", "#about"],
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="AI Backtest Lab home">
        <span className="brand-symbol">
          ai<span>↗</span>
        </span>
        <span>
          BACKTEST<span className="brand-lab"> LAB</span>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#product"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Explore workflow <ArrowUpRight data-icon="inline-end" />
      </a>
      <div className="mobile-nav">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger aria-label="Open navigation">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>AI Backtest Lab</SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-6 p-6"
              aria-label="Mobile navigation"
            >
              {links.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
