"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MOVIES = [
    { id: 1, title: "Movie 1", posterURL: "/movie1.jpg" },
    { id: 2, title: "Movie 2", posterURL: "/movie2.jpg" },
    { id: 3, title: "Movie 3", posterURL: "/movie3.jpg" },
    { id: 4, title: "Movie 4", posterURL: "/movie4.jpg" },
    { id: 5, title: "Movie 5", posterURL: "/movie5.jpg" },
    { id: 6, title: "Movie 6", posterURL: "/movie6.jpg" },
    { id: 7, title: "Movie 7", posterURL: "/movie7.jpg" },
];

const HeroSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 mb-8">
            <Slider {...settings}>
                {MOVIES.map((movie) => (
                    <div key={movie.id} className="w-full h-120 relative border-2 border-gray-300 rounded overflow-hidden">
                        <img
                            src={movie.posterURL}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSection;
