export enum VRApplicationType
{
    VRApplication_Other = 0,
    VRApplication_Scene = 1,
    VRApplication_Overlay = 2,
    VRApplication_Background = 3,
    VRApplication_Utility = 4,
    VRApplication_VRMonitor = 5,
    VRApplication_SteamWatchdog = 6,
    VRApplication_Bootstrapper = 7,
    VRApplication_Max = 8,
}

export interface VRTextureBounds
{
    uMin: number;
    vMin: number;
    uMax: number;
    vMax: number;
}

export interface HmdVector2
{
    v0: number;
    v1: number;
}

export const enum DirectorMethodType
{
    IsStarted,
    GetLastStartupError,
    Startup,
    Shutdown,
    PollForEvents,
}

export const enum DirectorCallbackType
{
    OnStandby,
    OnDashboardChange,
    OnChaperoneSettingsChange,
    OnOpenVRSignaledQuit,
}