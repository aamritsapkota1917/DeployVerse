// import { Moon, Sun } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useTheme } from "@/context/theme_context"

// export function ModeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }



import { useTheme } from "@/context/theme_context"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function Toggle_theme() {
    const { theme,setTheme } = useTheme()
    
    return (
        
        
        <div className="flex items-center space-x-2">
              <Switch
                id="theme-switch"
                checked={theme === "dark"}
                onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <Label htmlFor="theme-switch">{theme === "light" ? "Light" : "Dark"} Mode</Label>
        </div>
            
    
      )
}
