export enum COLORS {
  ORANGE = "#ff7f50",
  GREEN = "#377E7F",
}

export enum ROUTES {
  about = "/about",
  products = "/products",
  reviews = "/reviews",
  faq = "/faq",
  contacts = "/contacts",

  broker = "/user/broker",
  portfolios = "/user/portfolios",
  finance = "/user/finance",
  cabinet = "/user/cabinet",
  charity = "/user/charity",
  settings = "/user/settings",
  pulse = "/user/pulse",

  market = "/user/market",
  stocks = "/user/stocks",
  tarif = "/user/tarif",
  documents = "/user/documents",

  conservative = "/user/conservative",
  moderate = "/user/moderate",
  agressive = "/user/agressive",

  refill = "/user/refill",
  withdrawal = "/user/withdrawal",
  operations = "/user/operations",

  refProgram = "/user/refprogram",
  statistics = "/user/statistics",
  structure = "/user/structure",
  chats = "/user/chats",
  chat = "/user/chat/",
  career = "/user/career",

  promo = "/user/promo",

  shop = "/user/shop",
  product = "/user/shop/product/",
  busket = "/user/shop/busket",
}

export const menuItems = [
  { id: 1, name: "О нас", to: ROUTES.about },
  { id: 2, name: "Наши продукты", to: ROUTES.products },
  { id: 3, name: "Отзывы", to: ROUTES.reviews },
  { id: 4, name: "FAQ", to: ROUTES.faq },
  { id: 5, name: "Контакты", to: ROUTES.contacts },
];

export const menuUserItems = [
  { id: 1, name: "Брокерский счет", to: ROUTES.broker },
  { id: 2, name: "Портфели", to: ROUTES.portfolios },
  { id: 3, name: "Финансы", to: ROUTES.finance },
  { id: 4, name: "Кабинет партнера", to: ROUTES.cabinet },
  { id: 5, name: "Благотворительность", to: ROUTES.charity },
  { id: 6, name: "Настройки профиля", to: ROUTES.settings },
  { id: 7, name: "PULSE APT", to: ROUTES.pulse },
];

export const menuUserSubItems = [
  {
    id: 1,
    title: "broker_account",
    sub: [
      { name: "stock_market", to: ROUTES.market },
      { name: "you_stocks", to: ROUTES.stocks },
      { name: "tarifs", to: ROUTES.tarif },
      { name: "documents", to: ROUTES.documents },
    ],
  },
  {
    id: 2,
    title: "profiles",
    sub: [
      { name: "portfel_1", to: ROUTES.conservative },
      { name: "portfel_2", to: ROUTES.moderate },
      { name: "portfel_3", to: ROUTES.agressive },
    ],
  },
  {
    id: 3,
    title: "finance",
    sub: [
      { name: "refill", to: ROUTES.refill },
      { name: "withdrawal", to: ROUTES.withdrawal },
      { name: "history", to: ROUTES.operations },
    ],
  },
  {
    id: 4,
    title: "cabinet_of_partner",
    sub: [
      { name: "program", to: ROUTES.refProgram },
      { name: "stat", to: ROUTES.statistics },
      { name: "structure_ref", to: ROUTES.structure },
      { name: "chats", to: ROUTES.chats },
      { name: "career", to: ROUTES.career },
    ],
  },
  { id: 5, title: "charity", to: ROUTES.charity },
  { id: 6, title: "settings", to: ROUTES.settings },
  { id: 7, title: "platform", to: ROUTES.pulse },
];

export const StatusDeal = {
  Active: "Активен",
  Reinvest: "Реинвестирован",
  Term: "Выплачены проценты",
  Terminate: "Завершен",
};

export const speedMaxEnum = [3, 4, 5];

export enum AccountsFullEnum {
  Usd = "Usd",
  Usdc = "Usdc",
  Bitcoin = "Bitcoin",
  Ethereum = "Ethereum",
  Litecoin = "Litecoin",
}
export enum AccountsForRdEnum {
  Usd = "Inner",
  Usdc = "Usdc",
  Bitcoin = "Bitcoin",
  Ethereum = "Ethereum",
  Litecoin = "Litecoin",
}

export const UserIds = [
  { id: "61", name: "techSupport" },
  { id: "350169", name: "manager" },
];
export enum UserIdsEnum {
  manager = "350169",
  techSupport = "61",
}
