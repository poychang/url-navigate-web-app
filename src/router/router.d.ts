declare class Router {
    routes: Route[];
    private options;
    private current;
    private listener;
    constructor(options: Options);
    add(path: string, action: Function): Router;
    remove(path: string): Router;
    flush(): Router;
    navigate(path?: string): Router;
    action: () => void;
    private clearSlashes;
    private activateRouterListening;
}
declare const enum RouterMode {
    History = 0,
    Hash = 1
}
interface Options {
    mode: RouterMode;
    root: string;
}
interface Route {
    path: string;
    action: Function;
}
export { Router, RouterMode, Options, Route };
