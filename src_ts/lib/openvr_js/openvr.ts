import CVRApplications from './lib/cvr_applications';
import CVRChaperone from './lib/cvr_chaperone';
import CVRChaperoneSetup from './lib/cvr_chaperone_setup';
import CVRCompositor from './lib/cvr_compositor';
import CVROverlay from './lib/cvr_overlay';
import CVRSettings from './lib/cvr_settings';
import CVRSystem from './lib/cvr_system';

class OpenVR 
{
    public Applications: CVRApplications;
    public Chaperone: CVRChaperone;
    public ChaperoneSetup: CVRChaperoneSetup;
    public Compositor: CVRCompositor;
    public Overlay: CVROverlay;
    public Settings: CVRSettings;
    
    Init(): CVRSystem { return null; }
    Shutdown(){}
}