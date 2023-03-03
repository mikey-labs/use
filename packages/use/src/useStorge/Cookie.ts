import { IStorage } from "./Types";

export const Cookie:IStorage = {
    getLocal(key: string): any {
    },
    getSession(key: string): any {
    },
    removeLocal(key: string): boolean {
        return false;
    },
    removeSession(key: string): boolean {
        return false;
    },
    setLocal<T extends Object>(key: string, value: T): boolean {
        return false;
    },
    setSession<T extends Object>(key: string, value: T): boolean {
        // if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        // var sExpires = "";
        // if (vEnd) {
        //     switch (vEnd.constructor) {
        //         case Number:
        //             sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
        //             break;
        //         case String:
        //             sExpires = "; expires=" + vEnd;
        //             break;
        //         case Date:
        //             sExpires = "; expires=" + vEnd.toUTCString();
        //             break;
        //     }
        // }
        // document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
        
    }

}
