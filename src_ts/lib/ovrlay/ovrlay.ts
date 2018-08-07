import * as events from 'events';
import * as vr from './vr';

export class C_OVRLay extends events.EventEmitter
{
    public overlayType: OVRLayType;
    public getOptions (): OVRLayOptions { return null };
    public getLastError (): string { return ''; }

    public name: string;
    public key: string;

    public isCreated (): boolean { return false }

    constructor (
        overlayType: OVRLayType,
        overlayKey: string,
        overlayName: string,
        initalOptions?: OVRLayOptions
    ) { super(); }

    public createOverlay (): boolean { return false };
    public destroyOverlay (): boolean { return false };

    public setOverlayOptions ( opts: OVRLayOptions ): boolean { return false };
    public pollForEvents (): void { };

    public setTextureType (): boolean { return false; }
    public setTexture (): boolean { return false; }

    public setDashboardIconType (): boolean { return false; }
    public setDashboardIcon (): boolean { return false; }

    public hide (): void { };
    public show (): void { };

    public showKeyboard ( description: string, placeholder: string ): boolean { return false };
    public hideKeyboard (): boolean { return false };
}

export interface C_OVRLay
{
    on ( event: "dashboard-change", cb: ( currentActive: boolean ) => void );
    on ( event: "focus-change", cb: ( hasFocus: boolean ) => void );
    on ( event: "visibility-change", cb: ( isVisible: boolean ) => void );
    on ( event: "keyboard-input", cb: ( input: string ) => void );
    on ( event: "keyboard-closed", cb: () => void );
    on ( event: "keyboard-done", cb: () => void );
}

export enum OVRLayType
{
    StandardOverlay,
    DashboardOverlay,
}

export interface OVRLayOptions
{
    Color?: number[];
    Alpha?: number;
    WidthInMeters?: number;
    AutoCurveDistanceRangeInMeters?: number[];
    TextureBounds?: vr.VRTextureBounds;
    MouseScale?: vr.HmdVector2;
}