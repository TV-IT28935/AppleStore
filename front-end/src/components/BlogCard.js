import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({date , title, description}) => {
    return (
        <div className="col-3">
            <div className="blog-card">
                <div className="card-image">
                    <img
                        src="images/blog-1.jpg"
                        className="img-fluid"
                        alt="blog"
                    />
                </div>
                <div className="blog-content">
                    <p className="date">{date}</p>
                    <h5 className="title">{title}</h5>
                    <p className="desc">{description}</p>
                    <Link to="/" className="button">Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
