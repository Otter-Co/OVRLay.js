import * as events from 'events';
import * as vr from './vr';
import { I_Director } from './ovrlayjs_interopt';

export class C_Director extends events.EventEmitter
{
    static isStarted = I_Director.methods.isStarted;
    static getLastError = I_Director.methods.getLastError;
    static startup = I_Director.methods.startup;
    static shutdown = I_Director.methods.shutdown;
    static pollForEvents = I_Director.methods.pollForEvents;

    constructor ()
    {
        super();

        let { onStandbyChange, onDashboardChange, onChaperoneSettingsChange, onOpenVRSignaledQuit } = I_Director.callbacks;

        onStandbyChange( ( data, callback ) => callback( null, this.emit( 'standby-change', data ) && null ), true );
        onDashboardChange( ( data, callback ) => callback( null, this.emit( 'dashbaord-change', data ) && null ), true );
        onChaperoneSettingsChange( ( data, callback ) => callback( null, this.emit( 'chaperone-settings-change' ) && null ), true );
        onOpenVRSignaledQuit( ( data, callback ) => callback( null, this.emit( 'openvr-signaled-quit' ) && null ), true );
    }

    public isStarted (): boolean { return C_Director.isStarted( null, true ); }
    public getLastError (): string { return C_Director.getLastError( null, true ); }
    public startup ( appType: vr.VRApplicationType ): boolean { return C_Director.startup( appType, true ); }
    public shutdown () { C_Director.shutdown( null, true ); }
    public pollForEvents () { C_Director.pollForEvents( null, true ); }
}

export interface C_Director extends events.EventEmitter
{
    on ( event: "standby-change", cv: ( inStandby: boolean ) => void );
    on ( event: "dashboard-change", cv: ( dashboardOpen: boolean ) => void );
    on ( event: "chaperone-settings-change", cv: () => void );
    on ( event: "openvr-signaled-quit", cv: () => void );
}