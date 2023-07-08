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
    operations = "/user/operations"

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
        id: 1, title: "Брокерский счет", sub: [
            { name: "Рынок акций", to: ROUTES.market },
            { name: "Ваши акции", to: ROUTES.stocks },
            { name: "Тарифы", to: ROUTES.tarif },
            { name: "Документы", to: ROUTES.documents },
        ]
    },
    {
        id: 2, title: "Портфели", sub: [
            { name: "Консервативный", to: ROUTES.conservative },
            { name: "Умеренный", to: ROUTES.moderate },
            { name: "Агрессивный", to: ROUTES.agressive },
        ]
    },
    {
        id: 3, title: "Финансы", sub: [
            { name: "Пополнение счета", to: ROUTES.refill },
            { name: "Вывод средств", to: ROUTES.withdrawal },
            { name: "История операций", to: ROUTES.operations },
        ]
    },
    { id: 4, title: "Кабинет партнера", to: ROUTES.cabinet },
    { id: 5, title: "Благотворительность", to: ROUTES.charity },
    { id: 6, title: "Настройки профиля", to: ROUTES.settings },
    { id: 7, title: "PULSE APT", to: ROUTES.pulse },
];

export const StatusDeal = {
    Active: "Активен",
    Reinvest: "Реинвестирован",
    Term: "Выплачены проценты",
    Terminate: "Завершен",
};

export const speedMaxEnum = [3, 4, 5]

