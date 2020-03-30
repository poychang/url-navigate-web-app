class Router {
    // 路由表
    routes: Route[] = [];
    // 路由器設定選項
    private options: Options = {
        mode: window.history.pushState ? RouterMode.History : RouterMode.Hash,
        root: '/'
    } as Options;
    // 目前的路由值
    private current: string;
    // 監聽器
    private listener: any;

    constructor(options: Options) {
        this.options = options;
        this.activateRouterListening();
    }

    // 增加路由設定至路由表，path 是路由網址路徑，action 要執行的動作
    add(path: string, action: Function): Router {
        this.routes.push({ path, action });
        return this;
    }

    // 刪除路由表中的路由設定，path 是路由網址路徑
    remove(path: string): Router {
        this.routes = [...this.routes.filter(r => r.path === path)];
        return this;
    }

    // 清空路由表
    flush(): Router {
        this.routes = [];
        return this;
    }

    // 轉跳到指定路由值
    navigate(path: string = ''): Router {
        if (this.options.mode === RouterMode.History) {
            window.history.pushState(null, null, `${this.options.root}#${this.clearSlashes(path)}`);
        } else {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
        }
        return this;
    }

    // 執行路由行為
    action = () => {
        // 取得路由值
        const fragment = window.location.hash.slice(2);
        if (this.current === fragment) return;

        this.current = fragment;
        this.routes.some(route => {
            if (fragment.match(route.path)) {
                route.action.apply({}, []);
                return true;
            }
            return false;
        });
    }

    // 移除路由網址前後的 / 字符
    private clearSlashes(path: string): string {
        return path
            .toString()
            .replace(/\/$/, '')
            .replace(/^\//, '');
    }

    // 啟動路由器監聽
    private activateRouterListening() {
        clearInterval(this.listener);
        const listenInterval = 100;
        this.listener = setInterval(this.action, listenInterval);
    }
}

// 路由模式
const enum RouterMode {
    // 使用瀏覽器的 window.history API
    History,
    // 使用 # 辨別路由
    Hash
}

// 路由器設定選項
interface Options {
    // 設定要使用 Hash 或 History 模式
    mode: RouterMode;
    // 使用 History 模式時，設定應用程式的根路徑在哪裡
    root: string;
}

// 路由值
interface Route {
    // 路由網址路徑
    path: string;
    // 要執行的動作
    action: Function;
}

export { Router, RouterMode, Options, Route };
