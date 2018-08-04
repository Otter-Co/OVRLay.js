import { EDualAnalogWhich, ETrackedDeviceProperty } from "./vr_enum";

export interface VREvent_t {
    eventType: number;
    trackedDeviceIndex: number;
    eventAgeSeconds: number;
}

export interface VREvent_Data_t {
    reserved: VREvent_Reserved_t;
    controller: VREvent_Controller_t;
    mouse: VREvent_Mouse_t;
    scroll: VREvent_Scroll_t;
    process: VREvent_Process_t;
    notification: VREvent_Notification_t;
    overlay: VREvent_Overlay_t;
    status: VREvent_Status_t;
    ipd: VREvent_Ipd_t;
    chaperone: VREvent_Chaperone_t;
    performanceTest: VREvent_PerformanceTest_t;
    touchPadMove: VREvent_TouchPadMove_t;
    seatedZeroPoseReset: VREvent_SeatedZeroPoseReset_t;
    screenshot: VREvent_Screenshot_t;
    screenshotProgress: VREvent_ScreenshotProgress_t;
    applicationLaunch: VREvent_ApplicationLaunch_t;
    cameraSurface: VREvent_EditingCameraSurface_t;
    messageOverlay: VREvent_MessageOverlay_t;
    property: VREvent_Property_t;
    dualAnalog: VREvent_DualAnalog_t;
    hapticVibration: VREvent_HapticVibration_t;
    keyboard: VREvent_Keyboard_t; // This has to be at the end due to a mono bug
}

export interface VREvent_Controller_t {
    button: number;
}

export interface VREvent_Mouse_t {
    x: number;
    y: number;
    button: number;
}

export interface VREvent_Scroll_t {
    xdelta: number;
    ydelta: number;
    repeatCount: number;
}

export interface VREvent_TouchPadMove_t {

    bFingerDown: boolean;
    flSecondsFingerDown: number;
    fValueXFirst: number;
    fValueYFirst: number;
    fValueXRaw: number;
    fValueYRaw: number;
}

export interface VREvent_Notification_t {
    ulUserValue: number;
    notificationId: number;
}

export interface VREvent_Process_t {
    pid: number;
    oldPid: number;

    bool: boolean;
}

export interface VREvent_Overlay_t {
    overlayHandle: number;
}

export interface VREvent_Status_t {
    statusState: number;
}

export interface VREvent_Keyboard_t {

    cNewInput0: number;
    cNewInput1: number;
    cNewInput2: number;
    cNewInput3: number;
    cNewInput4: number;
    cNewInput5: number;
    cNewInput6: number;
    cNewInput7: number;
    uUserValue: number;
}

export interface VREvent_Ipd_t {
    ipdMeters: number;
}

export interface VREvent_Chaperone_t {
    m_nPreviousUniverse: number;
    m_nCurrentUniverse: number;
}

export interface VREvent_Reserved_t {
    reserved0: number;
    reserved1: number;
}

export interface VREvent_PerformanceTest_t {
    m_nFidelityLevel: number;
}

export interface VREvent_SeatedZeroPoseReset_t {

    bool: boolean;
}

export interface VREvent_Screenshot_t {
    handle: number;
    type: number;
}

export interface VREvent_ScreenshotProgress_t {
    progress: number;
}

export interface VREvent_ApplicationLaunch_t {
    pid: number;
    unArgsHandle: number;
}

export interface VREvent_EditingCameraSurface_t {
    overlayHandle: number;
    nVisualMode: number;
}

export interface VREvent_MessageOverlay_t {
    unVRMessageOverlayResponse: number;
}

export interface VREvent_Property_t {
    container: number;
    prop: ETrackedDeviceProperty;
}

export interface VREvent_DualAnalog_t {
    x: number;
    y: number;
    transformedX: number;
    transformedY: number;
    which: EDualAnalogWhich;
}

export interface VREvent_HapticVibration_t {
    containerHandle: number;
    componentHandle: number;
    fDurationSeconds: number;
    fFrequency: number;
    fAmplitude: number;
}