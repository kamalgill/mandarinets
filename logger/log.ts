// Copyright 2020-2020 The Mandarine.TS Framework authors. All rights reserved. MIT license.

import { bold, green, magenta, red, yellow } from "https://deno.land/std@0.84.0/fmt/colors.ts";

export interface LogOptions {
    logDuringTesting: string | undefined;
}
type MsgType = "debug" | "info" | "warn" | "error";

export class Log {

    private className: string | null = null;
    public logOptions: LogOptions;

    constructor(source: any | string) {

        this.logOptions = {
            logDuringTesting: Deno.env.get("LOG_DURING_TESTING")
        };

        if(typeof source === 'string') {
            this.className = source === "-" ? "-" : <string> source + ".class";
            return;
        }
        try {
            this.className = source.prototype.constructor.name + ".class";
        }catch(error) {
            this.className = "unknown";
        }
    }

    public debug(msg: string, ...supportingDetails: any[]): void {
        if(Deno.env.get("DEBUG")) {
            this.emitLogMessage("debug", msg, supportingDetails);
        }
    }

    public info(msg: string, ...supportingDetails: any[]): void {
        this.emitLogMessage("info", msg, supportingDetails);
    }

    public warn(msg: string, ...supportingDetails: any[]): void {
        this.emitLogMessage("warn", msg, supportingDetails);
    }

    public error(msg: string, ...supportingDetails: any[]): void {
        this.emitLogMessage("error", msg, supportingDetails);
    }

    public compiler(msg: string, msgType: MsgType, ...supportingDetails: any[]): void {
        if(this.logOptions && this.logOptions.logDuringTesting === "false") return;
        if(supportingDetails.length > 0) this[msgType](msg, supportingDetails);
        else this[msgType](msg);
    }

    private emitLogMessage(msgType: MsgType, msg: string, supportingDetails: any[]) {

        let finalMessage: string | null = null;

        switch(msgType) {
            case "debug":
                finalMessage = `${magenta(bold(`[${msgType.toUpperCase()} | ${new Date().toLocaleString()}]`))} [${Deno.pid}] [${this.className}] ${msg}`;
            break;
            case "info":
                finalMessage = `${green(bold(`[${msgType.toUpperCase()} | ${new Date().toLocaleString()}]`))} [${Deno.pid}] [${this.className}] ${msg}`;
            break;
            case "warn":
                finalMessage = `${yellow(bold(`[${msgType.toUpperCase()} | ${new Date().toLocaleString()}]`))} [${Deno.pid}] [${this.className}] ${msg}`;
            break;
            case "error":
                finalMessage = `${red(bold(`[${msgType.toUpperCase()} | ${new Date().toLocaleString()}]`))} [${Deno.pid}] [${this.className}] ${msg}`;
            break;
        }
        if(supportingDetails.length > 0) console[msgType](finalMessage, supportingDetails);
        else console[msgType](finalMessage);
    }

    public static getLogger(source: any) {
        return new Log(source);
    }
}