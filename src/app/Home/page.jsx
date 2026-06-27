
import Banner from "@/Components/Banner";
import FeaturedSection from "@/Components/Feature";
import ContactSection from "@/Components/Contact-us";

const Home = () => {
    return (
        <div className="space-y-2">
         
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <ContactSection></ContactSection>
            
        </div>
    );
};

export default Home;