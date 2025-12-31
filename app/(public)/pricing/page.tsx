import PricingTable from '../landing-components/PricingTable';
import LandingNavbar from '../landing-components/LandingNavbar';
import LandingFooter from '../landing-components/LandingFooter';

export default function Pricing() {
    return (
        <main>
            <LandingNavbar />
            <div style={{ paddingTop: '4rem' }}>
                <PricingTable />
            </div>
            <LandingFooter />
        </main>
    );
}
