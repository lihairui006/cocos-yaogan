

export default class Handler {

    private caller: any = null;
    private method: Function = null
    private args: Array<any> = [];
    private once: boolean = false;

    constructor(caller: any = null, method: Function = null, args: Array<any> = [], once: boolean = true) {
        this.setTo(caller, method, args, once);
    }

    private setTo(caller: any, method: Function, args: Array<any>, once: boolean): void {
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
    }

    /**
     * 从对象池内创建一个Handler,默认会执行一次立即回收，如果不需要自动回收，设置once为false
     * @param caller 执行域
     * @param method 回调函数
     * @param args 携带的参数
     * @param once 是否只执行一次
     * @return 返回创建的Handler的实例
     */
    public static create(caller: any, method: Function, args: Array<any> = null, once: boolean = true) {
        return new Handler(caller, method, args, once);
    }
}
