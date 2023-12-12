import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/inpage-navigation.component";

const HomePage = () => {
    return(
    <AnimationWrapper>
        <section className="h-cover flex justify-center gap-10">

                {/* latest blog */}

            <div className="w-full">

                <InPageNavigation routes = {[ "home" , "trending blogs"]} defaultHidden={["trending blogs"]}>

                    <h1>latest blog here</h1>
                    <h1>trending blog here</h1>

                </InPageNavigation>


            </div>


                {/* filter and trending blog */}
            <div>

            </div>


        </section>
    </AnimationWrapper>
    )
}

export default HomePage;