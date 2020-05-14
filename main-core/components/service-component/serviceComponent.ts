import { ComponentCommonInterface } from "../componentCommonInterface.ts";

export class ServiceComponent implements ComponentCommonInterface {

    name?: string;
    classHandler: any;

    constructor(name?: string, classHandler?: any) {
        this.name = name;
        this.classHandler= classHandler;
    }

    public getName() {
        return this.name;
    }

    public getClassHandler() {
        return this.classHandler;
    }

    public setClassHandler(handler: any) {
        this.classHandler = handler;
    }

}