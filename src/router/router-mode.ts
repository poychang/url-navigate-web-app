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

export { RouterMode };