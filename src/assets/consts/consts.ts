export enum ROUTES {
    about = "/about",
    products = "/products",
    reviews = "/reviews",
    faq = "/faq",
    contacts = "/contacts"
}

export const menuItems = [
    { id: 1, name: "О нас", to: ROUTES.about },
    { id: 2, name: "Наши продукты", to: ROUTES.products },
    { id: 3, name: "Отзывы", to: ROUTES.reviews },
    { id: 4, name: "FAQ", to: ROUTES.faq },
    { id: 5, name: "Контакты", to: ROUTES.contacts },
];