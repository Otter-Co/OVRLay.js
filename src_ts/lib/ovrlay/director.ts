import * as events from 'events';
import * as vr from './vr';


export class C_Director extends events.EventEmitter
{
    public isStarted (): boolean { return true; }
    public getLastError (): string { return ''; }
    public startup (appType: vr.VRApplicationType) { }
    public shutdown () { }
    public pollForEvents () { }
}

export interface C_Director extends events.EventEmitter
{
    on (event: "standby-change", cv: (inStandby: boolean) => void);
    on (event: "dashboard-change", cv: (dashboardOpen: boolean) => void);
    on (event: "chaperone-settings-change", cv: () => void);
    on (event: "openvr-signaled-quit", cv: () => void);
}