import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
const ProductCard = ({ grid }) => {
    let location = useLocation();

    return (
        <div
            className={`${
                location.pathname === "/store" ? `gr-${grid}` : "col-3"
            }`}
        >
            <Link className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <Link>
                        <img src="images/wish.svg" alt="wish" />
                    </Link>
                </div>

                <div className="product-image">
                    <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="product image"
                    />
                    <img
                        src="images/tab.jpg"
                        className="img-fluid"
                        alt="product image"
                    />
                </div>
                <div className="product-details">
                    <h6 className="brand">Havels</h6>
                    <h5 className="product-title">
                        Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                    />
                    <p className="description">
                        At vero eos et accusamus et iusto odio dignissimos
                        decimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quó dolores et quas molestias excepturi
                        sint occaecati cupiditate non prvident, similique
                        sunt...
                    </p>
                    <h5 className="price">$100.00</h5>
                </div>

                <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-10">
                        <Link>
                            <img src="images/view.svg" alt="view" />
                        </Link>
                        <Link>
                            <img
                                src="images/prodcompare.svg"
                                alt="productcompare"
                            />
                        </Link>
                        <Link>
                            <img src="images/add-cart.svg" alt="addcart" />
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
