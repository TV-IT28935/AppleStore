import React from "react";
import {
    BsSearch,
    BsLinkedin,
    BsFacebook,
    BsYoutube,
    BsGithub,
    BsInstagram,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-5">
                            <div className="footer-top-data d-flex gap-30 align-items-center">
                                <img
                                    src="images/newsletter.png"
                                    alt="newsletter"
                                />
                                <h2 className="mb-0 text-white">
                                    Sign Up for NewsLetter
                                </h2>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control py-2"
                                    placeholder="Your Email Address..."
                                    aria-label="Your Email Address..."
                                    aria-describedby="basic-addon2"
                                />
                                <span
                                    className="input-group-text p-3"
                                    id="basic-addon2"
                                >
                                    Subscribe
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-white mb-4">Contact Us</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">
                                    Demo Store
                                </Link>
                                <address className="text-white py-2 mb-1">
                                    Vân Hà, Đông Anh, Hà Nội
                                </address>
                                <Link className="text-white py-2 mb-1">
                                    +84 469614473
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    nguyentruongviet0305@gmail.com
                                </Link>
                                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                                    <Link className="text-white" to="/">
                                        <BsLinkedin className="fs-4" />
                                    </Link>
                                    <Link className="text-white" to="/">
                                        <BsInstagram className="fs-4" />
                                    </Link>
                                    <Link className="text-white" to="/">
                                        <BsGithub className="fs-4" />
                                    </Link>
                                    <Link className="text-white" to="/">
                                        <BsYoutube className="fs-4" />
                                    </Link>
                                    <Link className="text-white" to="/">
                                        <BsFacebook className="fs-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Information</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">
                                    Privacy Policy
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Refund Policy
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Shipping Policy
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Terms Of Services
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Blogs
                                </Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Account</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">
                                    Search
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    About Us
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Faq
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Contact
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Size Chart
                                </Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <h4 className="text-white mb-4">Quick Links</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className="text-white py-2 mb-1">
                                    Accessories
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Laptops
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Headphones
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Tablets
                                </Link>
                                <Link className="text-white py-2 mb-1">
                                    Watch
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center mb-0 text-white">
                                &copy; {new Date().getFullYear()} : Powered by
                                Developer NTV
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
