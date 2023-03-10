import { isSupportStorage } from "../utils";
import { IStorage } from "./Types";
import { NativeStorage } from "./Storage";
import { Cookie } from "./Cookie";
export type UseType = 'auto' | 'storage' | 'cookie'
export type StorageOption = {
    use?:UseType
}
class DataStorage implements IStorage{
    #config:StorageOption = {}
    constructor(options:StorageOption = {}) {
        this.#config = options;
    }
    setSession<T extends Object>(key: string, value: T): boolean {
        return this.Storage.setSession(key,value);
    }
    getSession(key: string) {
       return this.Storage.getSession(key);
    }
    setLocal<T extends Object>(key: string, value: T): boolean {
        return this.Storage.setLocal(key,value);
    }
    getLocal(key: string) {
        return this.Storage.getLocal(key);
    }
    removeSession(key: string): boolean {
        return this.Storage.removeSession(key);
    }
    removeLocal(key: string): boolean {
        return this.Storage.removeLocal(key);
    }
    get Storage(){
        return this.#config?.use === 'cookie' || !isSupportStorage ? Cookie : NativeStorage
    }

}
export const useStorage = (options?:StorageOption):IStorage=>{
    return new DataStorage(options);
}
