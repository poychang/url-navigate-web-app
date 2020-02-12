import Router from './Router';

const router = new Router({
    mode: 'hash',
    root: '/'
});

router
    .add('about', () => {
        alert('welcome in about page');
    })
    .add('', () => {
        // general controller
        console.log('welcome in catch all controller');
    });
