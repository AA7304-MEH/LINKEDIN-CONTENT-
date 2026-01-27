import PricingTable from '@/app/(marketing)/landing-components/PricingTable';
import LandingNavbar from '@/app/(marketing)/landing-components/LandingNavbar';
import LandingFooter from '@/app/(marketing)/landing-components/LandingFooter';

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
