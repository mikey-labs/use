export interface IStorage {
    setSession<T extends Object>(key:string,value:T):boolean;
    getSession(key:string):any;
    setLocal<T extends Object>(key:string,value:T):boolean;
    getLocal(key:string):any;
    removeSession(key:string):boolean;
    removeLocal(key:string):boolean;
}
