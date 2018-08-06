import * as events from 'events';
import * as vr from './vr';
import { I_Director } from './ovrlayjs_interopt';

export class C_Director extends events.EventEmitter
{
    constructor ()
    {
        super();

        I_Director.callbacks.onStandbyChange((data, callback) => callback(null, this.emit('standby-change', data) && null), true);
        I_Director.callbacks.onDashboardChange((data, callback) => callback(null, this.emit('dashbaord-change', data) && null), true);
        I_Director.callbacks.onChaperoneSettingsChange((data, callback) => callback(null, this.emit('chaperone-settings-change') && null), true);
        I_Director.callbacks.onOpenVRSignaledQuit((data, callback) => callback(null, this.emit('openvr-signaled-quit')), true);
    }

    public isStarted (): boolean { return I_Director.methods.isStarted(null, true); }
    public getLastError (): string { return ''; }
    public startup (appType: vr.VRApplicationType): boolean { return false; }
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