import PricingTable from '@/app/landing-components/PricingTable';
import LandingNavbar from '@/app/landing-components/LandingNavbar';
import LandingFooter from '@/app/landing-components/LandingFooter';


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
