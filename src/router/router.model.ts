import { RouterMode } from "./";

/** 路由器的設定選項
 *
 * @interface Options
 */
interface Options {
    /** 設定要使用 Hash 或 History 模式
     *
     * @type {RouteMode}
     * @memberof Options
     */
    mode: RouterMode;
    /** 使用 History 模式時，設定應用程式的跟路徑在哪裡
     *
     * @type {string}
     * @memberof Options
     */
    root: string;
}

/** 路由值
 *
 * @interface Route
 */
interface Route {
    /** 路由值，路由網址路徑
     *
     * @type {string}
     * @memberof Route
     */
    path: string;
    /** 要執行的方法
     *
     * @type {Function}
     * @memberof Route
     */
    callback: Function;
}

export { Options, Route };
