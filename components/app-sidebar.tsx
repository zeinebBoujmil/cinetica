'use client'
import { LogOut, Film, PlayCircle, TrendingUp, Star } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";

// Menu items.
const movies = [
  {
    title: "Now Playing",
    url: "/dashboard/movies/now-playing",
    icon: PlayCircle,
  },
  {
    title: "Popular",
    url: "/dashboard/movies/popular",
    icon: TrendingUp,
  },
  {
    title: "Top Rated",
    url: "/dashboard/movies/top-rated",
    icon: Star,
  },
];
const tvShows = [
  {
    title: "On the air",
    url: "/dashboard/TVShows/on-the-air",
    icon: PlayCircle,
  },
  {
    title: "Popular",
    url: "/dashboard/TVShows/popular",
    icon: TrendingUp,
  },
  {
    title: "Top Rated",
    url: "/dashboard/TVShows/top-rated",
    icon: Star,
  },
];
const favorites = [
  {
    title: "Favorite Movies",
    url: "/dashboard/Favorites/FavoriteMovies",
    icon: Star,
  },
  {
    title: "Favorite Shows",
    url: "/dashboard/Favorites/FavoriteShows",
    icon: Star,
  },
];


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <br />
          <br />
          <br />
          <SidebarGroupContent>
            <SidebarMenu>
              
                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/discover">
                      <Film/>
                      <span>Discover</span>

                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Movies</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {movies.map((movie) => (
                <SidebarMenuItem key={movie.title}>
                  <SidebarMenuButton asChild>
                    <a href={movie.url}>
                      <movie.icon />
                      <span>{movie.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>TV Shows</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tvShows.map((tvshow) => (
                <SidebarMenuItem key={tvshow.title}>
                  <SidebarMenuButton asChild>
                    <a href={tvshow.url}>
                      <tvshow.icon />
                      <span>{tvshow.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favorites.map((favorite) => (
                <SidebarMenuItem key={favorite.title}>
                  <SidebarMenuButton asChild>
                    <a href={favorite.url}>
                      <favorite.icon />
                      <span>{favorite.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Menu de déconnexion */}
          <div >
          <SidebarGroupLabel>Logout</SidebarGroupLabel>
          <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key="logout">
                  <SidebarMenuButton
                    asChild
                    onClick={() => {
                      signOut({ callbackUrl: "/login" }); // Gère la déconnexion et redirige vers la page de login
                    }}
                  >
                    <button >
                      <LogOut />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
