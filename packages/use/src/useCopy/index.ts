import { inBrowser } from "../utils";

async function clipboardCopy(text:string):Promise<boolean>{
    if (navigator?.clipboard?.write) {
        try {
            const textBlob = new Blob([text], { type: "text/plain" });
            const item = new ClipboardItem({
                [textBlob.type]: textBlob,
            });
            await navigator.clipboard.write([item]);
            return true;
        } catch (error) {
            return false;
        }
    }
    return false;
}
function execCommand(text:string):boolean{
    const textarea:HTMLTextAreaElement = document.createElement('textarea')
    textarea.value = text;
    document.body.appendChild(textarea)
    textarea.select();
    const isCopied:boolean = !!document.execCommand && document.execCommand('copy')
    document.body.removeChild(textarea)
    return isCopied;
}
/**
 * @desc 复制文本
 * @param text 需要复制的文本
 * */
export  const useCopy = async (text: string): Promise<boolean> => {
    return inBrowser &&( await clipboardCopy(text) || execCommand(text) )
}
