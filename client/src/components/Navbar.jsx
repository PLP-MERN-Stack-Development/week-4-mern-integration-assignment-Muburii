import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent,
         DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { getUserFromToken } from "../utils/auth";

export default function Navbar() {
  const user = getUserFromToken();
     
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-700 px-4 py-2 flex items-center justify-between">
      <div className="font-bold text-lg">Blog Post Manager</div>
       
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <UserCircleIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {user && (
              <>
                <div className="px-2 py-1.5 text-sm text-gray-600 dark:text-gray-300 border-b">
                  @{user.username}
                </div>
              </>
            )}
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}