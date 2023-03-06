import { IStorage } from "./Types";

export const formatResult = (value:string | null):any=>{
    if(value === 'undefined')return undefined;
    if(value === null)return null;
    return JSON.parse(value);
}
export const NativeStorage:IStorage = {
    getLocal(key: string): any {
        return formatResult(localStorage.getItem(key));
    },
    getSession(key: string): any {
        return formatResult(sessionStorage.getItem(key));
    },
    removeLocal(key: string): boolean {
        try {
            localStorage.removeItem(key);
            return true;
        }catch (e){
            return false;
        }
    },
    removeSession(key: string): boolean {
        try {
            sessionStorage.removeItem(key);
            return true;
        }catch (e){
            return false;
        }
    },
    setLocal<T extends Object>(key: string, value: T): boolean {
        try {
            localStorage.setItem(key,JSON.stringify(value));
            return true;
        } catch (e){
            return false;
        }
    },
    setSession<T extends Object>(key: string, value: T): boolean {
        try {
            sessionStorage.setItem(key,JSON.stringify(value));
            return true;
        } catch (e){
            return false;
        }
    }

}
