import CartScreen from "./screens/CartScreen";
import Error404Page from "./screens/Error404Screen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { parseRequestUrl } from "./utils";


const routes = {
    '/': HomeScreen,
    '/product/:id' : ProductScreen,
    '/cart/:id' : CartScreen,
    '/cart' : CartScreen,
};

const router = async() => {
    const request = parseRequestUrl();
    const parseUrl = 
        (request.resource ? `/${request.resource}` : '/') + 
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}`:  '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    await screen.after_render();
};
window.addEventListener('load', router);

window.addEventListener('hashchange', router);