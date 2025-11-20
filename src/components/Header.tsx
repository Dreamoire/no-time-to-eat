import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import headerImage1 from "../assets/images/header_image_1.jpg";
import headerImage2 from "../assets/images/header_image_2.jpg";
import headerImage3 from "../assets/images/header_image_3.jpg";
import headerImage4 from "../assets/images/header_image_4.jpg";

import "../styles/Header.css";

const headerImages = [headerImage1, headerImage2, headerImage3, headerImage4];

export default function Header() {
	const location = useLocation();
	const [headerImage, setHeaderImage] = useState(headerImages[0]);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * headerImages.length);
		setHeaderImage(headerImages[randomIndex]);
	}, [location.pathname]);

	return (
		<header className="header">
			<img src={headerImage} alt="Header banner" className="header-image" />
		</header>
	);
}
