import moment from "moment";

/**
 * 日期格式化
 * @param {Object} value create_time
 * @param {Object} context "YYYY-MM-DD HH:mm:ss"
 * @returns {Object}
 */
export function formatTime(value, context) {
    if (!context) {
        context = "YYYY-MM-DD HH:mm:ss";
    }
    return moment(value).format(context);
}

/**
 * 深拷贝
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== "object") {
        throw new Error("error arguments", "deepClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === "object") {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
}