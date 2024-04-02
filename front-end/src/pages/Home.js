import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
const Home = () => {
    return (
        <>
            <section className="home-wrapper-1 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <div className="main-banner position-relative">
                                <img
                                    src="images/main-banner.jpg"
                                    className="img-fluid rounded-3"
                                    alt="main banner"
                                />
                                <div className="main-banner-content position-absolute">
                                    <h4>SUPERCHARGED FOR PROS.</h4>
                                    <h5>iPad S13+ Pro.</h5>
                                    <p>From $999.00 or $41.62</p>
                                    <Link className="button">BUY NOW</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                                <div className="small-banner position-relative">
                                    <img
                                        src="images/catbanner-01.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>BEST SAKE</h4>
                                        <h5>But IPad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative ">
                                    <img
                                        src="images/catbanner-02.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But IPad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative ">
                                    <img
                                        src="images/catbanner-03.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But IPad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative ">
                                    <img
                                        src="images/catbanner-04.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But IPad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="services d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-15">
                                    <img
                                        src="images/service.png"
                                        alt="services"
                                    />
                                    <div>
                                        <h6 className="title-service mb-0">
                                            Free Shipping
                                        </h6>
                                        <p className="mb-0">
                                            From all orders over $100
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img
                                        src="images/service-02.png"
                                        alt="services"
                                    />
                                    <div>
                                        <h6 className="title-service mb-0">
                                            Daily Surprise Offers
                                        </h6>
                                        <p className="mb-0">
                                            Save up to 25% of
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img
                                        src="images/service-03.png"
                                        alt="services"
                                    />
                                    <div>
                                        <h6 className="title-service mb-0">
                                            Support 24/7
                                        </h6>
                                        <p className="mb-0">
                                            Shop with an expert
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img
                                        src="images/service-04.png"
                                        alt="services"
                                    />
                                    <div>
                                        <h6 className="title-service mb-0">
                                            Affordable Prices
                                        </h6>
                                        <p className="mb-0">
                                            Get Factory direct price
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img
                                        src="images/service-05.png"
                                        alt="services"
                                    />
                                    <div>
                                        <h6 className="title-service mb-0">
                                            Secure Payments
                                        </h6>
                                        <p className="mb-0">
                                            100% Protected Payments
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Computers & Laptop</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Cameras & Videos</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Smart Television</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img src="images/tv.jpg" alt="camera" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Smartwatches</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img
                                        src="images/headphone.jpg"
                                        alt="camera"
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Computers & Laptop</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Cameras & Videos</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Smart Television</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img src="images/tv.jpg" alt="camera" />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6>Smartwatches</h6>
                                        <p>10 Items</p>
                                    </div>
                                    <img
                                        src="images/headphone.jpg"
                                        alt="camera"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="featured-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">
                                Featured Collection
                            </h3>
                        </div>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </section>
            <section className="famous-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <div className="famous-card position-relative bg-white">
                                <img
                                    src="images/watch-02.jpg"
                                    className="img-fluid"
                                    alt=""
                                />
                                <div className="famous-content position-absolute">
                                    <h5 className="">Big Screen</h5>
                                    <h6>Smart Watch Series 7</h6>
                                    <p>From $299 or $16.62/mo for 24 mo</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="famous-card position-relative bg-white">
                                <img
                                    src="images/mac-01.png"
                                    className="img-fluid"
                                    alt=""
                                />
                                <div className="famous-content position-absolute">
                                    <h5 className="">studio display</h5>
                                    <h6>600 nít of brightness</h6>
                                    <p>27-inch 5k Retina display</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="famous-card position-relative bg-white">
                                <img
                                    src="images/iphone-01.png"
                                    className="img-fluid"
                                    alt=""
                                />{" "}
                                <div className="famous-content position-absolute">
                                    <h5 className="">smartphones</h5>
                                    <h6>Smartphone 13 Pro.</h6>
                                    <p>
                                        Now in Green, From $999.00 or $41.62/mo
                                        for 24 mo Footnote
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="famous-card position-relative bg-white">
                                <img
                                    src="images/speaker-02.jpg"
                                    className="img-fluid"
                                    alt=""
                                />
                                <div className="famous-content position-absolute">
                                    <h5 className="">home speakers</h5>
                                    <h6>Room-filling sound</h6>
                                    <p>From $699 or $116.58/mo for 12 mo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="special-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">
                                Special Products
                            </h3>
                        </div>
                    </div>
                    <div className="row flex-wrap">
                        <SpecialProduct />
                        <SpecialProduct />
                        <SpecialProduct />
                        <SpecialProduct />
                    </div>
                </div>
            </section>
            <section className="popular-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">
                                Our Popular Products
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="card"></div>
                        </div>
                        <div className="col-3"></div>
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </section>
            <section className="marque-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="rơ">
                        <div className="col-12">
                            <div className="marquee-inner-wrapper card-wrapper">
                                <Marquee className="d-flex">
                                    <div className="mx-4 w-25">
                                        <img
                                            src="images/brand-01.png"
                                            alt="brand"
                                        />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img
                                            src="images/brand-02.png"
                                            alt="brand"
                                        />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img
                                            src="images/brand-03.png"
                                            alt="brand"
                                        />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img
                                            src="images/brand-04.png"
                                            alt="brand"
                                        />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img
                                            src="images/brand-05.png"
                                            alt="brand"
                                        />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img
                                            src="images/brand-06.png"
                                            alt="brand"
                                        />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="" alt="" />
                                    </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">
                                Our Latest Blogs
                            </h3>
                        </div>
                        <BlogCard
                            date="01 April, 2024"
                            title="A beautifull sunday morning renaissance"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat accusamus offcia"
                        />
                        <BlogCard
                            date="01 April, 2024"
                            title="A beautifull sunday morning renaissance"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat accusamus offcia"
                        />
                        <BlogCard
                            date="01 April, 2024"
                            title="A beautifull sunday morning renaissance"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat accusamus offcia"
                        />
                        <BlogCard
                            date="01 April, 2024"
                            title="A beautifull sunday morning renaissance"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat accusamus offcia"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
