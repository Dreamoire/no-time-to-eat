import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { TypeAnimation } from "react-type-animation";

import headerImage1 from "../assets/images/header_image_1.jpg";
import headerImage2 from "../assets/images/header_image_2.jpg";
import headerImage3 from "../assets/images/header_image_3.jpg";
import headerImage4 from "../assets/images/header_image_4.jpg";

import "../styles/Header.css";

const headerImages = [headerImage1, headerImage2, headerImage3, headerImage4];
const cursorClassName = "header-title--type";

export default function Header() {
	const { pathname } = useLocation();
	const [headerImage, setHeaderImage] = useState(headerImages[0]);

	useEffect(() => {
		const currentPath = pathname;
		const randomIndex = Math.floor(Math.random() * headerImages.length);
		void currentPath;
		setHeaderImage(headerImages[randomIndex]);
	}, [pathname]);

	return (
		<header className="header">
			<div className="header-bg">
				<img src={headerImage} alt="Header banner" className="header-image" />
			</div>
			<div className="header-overlay">
				<TypeAnimation
					sequence={[
						"FRIGO",
						2000,
						"STRANGER FRIDGE",
						2000,
						"FRIGO DE LA MAMA",
						2000,
						"",
						200,
						"NO TIME TO EAT",
						2000,
						(el) => {
							if (el instanceof HTMLElement) {
								el.classList.remove(cursorClassName);
							}
						},
					]}
					speed={{ type: "keyStrokeDelayInMs", value: 240 }}
					deletionSpeed={2}
					wrapper="h1"
					repeat={0}
					cursor={false}
					className={`header-title ${cursorClassName}`}
				/>
			</div>
		</header>
	);
}
