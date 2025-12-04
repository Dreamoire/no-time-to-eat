import { useEffect, useState } from "react";
import "../styles/ScrollToTopButton.css";

export default function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;
			const pageHeight = document.documentElement.scrollHeight;

			setIsVisible(pageHeight > windowHeight && scrollTop > 300);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!isVisible) {
		return null;
	}

	return (
		<button
			type="button"
			className="scroll-to-top"
			onClick={scrollToTop}
			aria-label="Scroll to top"
		>
			↑
		</button>
	);
}
