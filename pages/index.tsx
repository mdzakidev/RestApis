import Layout from "@/components/layouts";
import AboutLanding from "@/layouts/Landing/about.landing";
import FooterLanding from "@/layouts/Landing/footer.landing";
import HomeLanding from "@/layouts/Landing/home.landing";
import Navbar from "@/layouts/Landing/navbar.landing";
import PricingLanding from "@/layouts/Landing/pricing.landing";

export default function LandingPage() {
    return (
        <Layout title="Zayden APIs | Landing Page" >
            <div className="min-h-screen bg-white">
                <Navbar />
                <HomeLanding />
                <div className="px-8 md:px-44 pt-24 pb-16 flex flex-col gap-24">
                    <PricingLanding />
                    <AboutLanding />
                </div>
                <FooterLanding />
            </div>
        </Layout>
    );
}