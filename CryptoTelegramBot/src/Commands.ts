export const commands = [
  { command: "/help", description: "get bot description and functionality" },
  { command: "/list_recent", description: "get 50 most populare currencies" },
  {
    command: "/{currency_symbol}",
    description: "get currency statistics",
  },
  {
    command: "addToFavourite {cur_symbol}",
    description: "add currency to list of favourites",
  },
  {
    command: "/listFavourite",
    description: "list currencies from favourites",
  },
  {
    command: "/deleteFavourite {cur_symbol}",
    description: "delete currency from favourites",
  },
];

export const commandsToDisplayInMenu = [
  { command: "/help", description: "get bot description and functionality" },
  { command: "/list_recent", description: "get 50 most populare currencies" },
  {
    command: "/listfavourite",
    description: "list currencies from favourites",
  },
];
