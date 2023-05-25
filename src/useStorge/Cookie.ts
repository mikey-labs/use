import { IStorage } from "./Types";
import { formatResult } from "./Storage";

/**
 * @desc 验证存储key是否为关键字
 * @param key
 */
const validateKey = (key: string): boolean => {
    return !!key && !/^(?:expires|max-age|path|domain|secure)$/i.test(key);
};
/**
 * @desc 检查是否存在关键字 key
 * @param key
 */
const hasCookieItem = (key: string): boolean => {
    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=").test(
        document.cookie
    );
};
/**
 * cookie 实现类，继承于IStorage
 */
export const Cookie: IStorage = {
    getLocal(key: string): any {
        return this.getSession(key);
    },
    getSession(key: string): any {
        const valueString = document.cookie.replace(
            new RegExp(
                "(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"
            ),
            "$1"
        );
        try {
            return formatResult(decodeURIComponent(valueString));
        } catch (e) {
            return valueString;
        }
    },
    removeLocal(key: string): boolean {
        return this.removeSession(key);
    },
    removeSession(key: string): boolean {
        if (!key || !hasCookieItem(key)) {
            return false;
        }
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        return true;
    },
    setLocal<T extends Object>(key: string, value: T): boolean {
        if (!validateKey(key)) return false;
        document.cookie =
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(JSON.stringify(value)) +
            "; expires=Thu, 01 Jan 9999 00:00:00 GMT; path=/;"; //cookie 最长400天
        return true;
    },
    setSession<T extends Object>(key: string, value: T): boolean {
        if (!validateKey(key)) return false;
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(value)) + "; path=/;";
        return true;
    },
};
