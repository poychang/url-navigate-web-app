import { Router, RouterMode } from './router';

const router = new Router({
    mode: RouterMode.Hash,
    root: '/'
});

router
    .add('home', () => {
        console.log(`In home page (${window.location.hash})`);
    })
    .add('about', () => {
        console.log(`In about page (${window.location.hash})`);
    })
    .add('', () => {
        console.log(`Using general route controller (${window.location.hash})`);
    })
    .navigate('home');

console.table(router.routes);
