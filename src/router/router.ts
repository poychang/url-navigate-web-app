import { Route, Options } from './';

class Router {
    /** 路由表
     *
     * @private
     * @type {Route[]}
     * @memberof Router
     */
    routes: Route[] = [];
    /** 路由器的設定
     *
     * @private
     * @type {Options}
     * @memberof Router
     */
    private options: Options = {
        mode: window.history.pushState ? RouterMode.History : RouterMode.Hash,
        root: '/'
    } as Options;
    /** 目前的路由值
     *
     * @private
     * @type {string}
     * @memberof Router
     */
    private current: string;
    /** 監聽器
     *
     * @private
     * @type {*}
     * @memberof Router
     */
    private listener: any;

    constructor(options: Options) {
        this.options = options;
        this.activateRouterListening();
    }

    /** 增加路由設定至路由表
     *
     * @param {string} path 路由值，路由網址路徑
     * @param {Function} cb 要執行的方法
     * @returns {Router}
     * @memberof Router
     */
    add(path: string, cb: Function): Router {
        this.routes.push({ path, callback: cb });
        return this;
    }

    /** 刪除路由表中的路由設定
     *
     * @param {string} path 路由值，路由網址路徑
     * @returns {Router}
     * @memberof Router
     */
    remove(path: string): Router {
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].path === path) {
                this.routes.slice(i, 1);
                return this;
            }
        }
        return this;
    }

    /** 清空路由表
     *
     * @returns {Router}
     * @memberof Router
     */
    flush(): Router {
        this.routes = [];
        return this;
    }

    navigate(path: string = ''): Router {
        if (this.options.mode === RouterMode.History) {
            window.history.pushState(
                null,
                null,
                `${this.options.root}${this.clearSlashes(path)}`
            );
        } else {
            window.location.href = `${window.location.href.replace(
                /#(.*)$/,
                ''
            )}#${path}`;
        }
        return this;
    }

    /** 移除路由網址前後的 / 字符
     *
     * @private
     * @param {string} path 路由值，路由網址路徑
     * @returns {string}
     * @memberof Router
     */
    private clearSlashes(path: string): string {
        return path
            .toString()
            .replace(/\/$/, '')
            .replace(/^\//, '');
    }

    /** 取得路由值
     *
     * @private
     * @returns {string}
     * @memberof Router
     */
    private getFragment(): string {
        let fragment = '';
        if (this.options.mode === RouterMode.History) {
            fragment = this.clearSlashes(
                decodeURI(window.location.pathname + window.location.search)
            );
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment =
                this.options.root !== '/'
                    ? fragment.replace(this.options.root, '')
                    : fragment;
        } else {
            const match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    }

    /** 啟動路由器監聽
     *
     * @private
     * @memberof Router
     */
    private activateRouterListening() {
        clearInterval(this.listener);
        this.listener = setInterval(this.action, 100);
    }

    action = () => {
        if (this.current === this.getFragment()) return;

        this.current = this.getFragment();
        this.routes.some(route => {
            const match = this.current.match(route.path);
            if (match) {
                match.shift();
                route.callback.apply({}, match);
                return match;
            }
            return false;
        });
    };
}

/** 路由模式
 *
 * @enum {number}
 */
const enum RouterMode {
    /** 使用瀏覽器的 window.history API */
    History,
    /** 使用 # 辨別路由 */
    Hash
}

export { Router, RouterMode };
