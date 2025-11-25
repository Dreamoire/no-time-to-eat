import { useState } from "react";

import blogImageBeginner from "../assets/images/blog-image-beginner.jpg";
import blogImageChristmas from "../assets/images/blog-image-christmas.jpg";
import blogImageFrigo from "../assets/images/blog-image-frigo.jpg";

import "../styles/Blog.css";

export default function Blog() {
	const [openArticle, setOpenArticle] = useState<number | null>(null);

	const toggleArticle = (id: number) => {
		setOpenArticle(openArticle === id ? null : id);
	};

	return (
		<section className="blog-page">
			<article className="blog-article">
				<img
					src={blogImageChristmas}
					alt="French Christmas table"
					className="blog-image"
				/>

				<h2 className="article-title">Christmas on a French Plate</h2>

				<p className="article-meta">
					<strong className="article-author">By Florent Goujon</strong>
					<span className="article-dot"> • </span>
					<time dateTime="2024-12-01">December 1, 2024</time>
				</p>

				<p className="article-intro">
					Christmas dinner in France changes from region to region — but one
					thing stays the same: it’s serious food business.
				</p>

				{openArticle === 1 && (
					<p className="article-full-text">
						In Alsace, near Germany, you’ll find Baeckeoffe (a slow-cooked meat
						and potato stew) and foie gras, served with sweet Alsatian white
						wine.
						<br />
						In Burgundy, the star is turkey with chestnuts and dishes cooked
						with local wine, like boeuf bourguignon.
						<br />
						Along the coast in Brittany and Provence, seafood rules: oysters,
						scallops (Saint-Jacques), mussels and sometimes a full seafood
						tower.
						<br />A sweet classic across all France is Bûche de Noël — a
						Christmas log cake shaped like a piece of firewood.
						<br />
						This tradition comes from old rural customs where families burned
						huge logs during winter to bring luck and warmth.
						<br />
						Fun fact: in some families, the Christmas dinner can last up to 6
						hours with more than 7 courses. French Christmas food is not just
						about eating — it’s about sharing time, memory and warmth.
					</p>
				)}

				<button
					type="button"
					className="read-more-button"
					onClick={() => toggleArticle(1)}
				>
					{openArticle === 1 ? "Show less" : "Read more"}
				</button>
			</article>

			<div className="blog-separator" />

			<article className="blog-article">
				<img
					src={blogImageBeginner}
					alt="Beginner cooking in kitchen"
					className="blog-image"
				/>

				<h2 className="article-title">
					Cooking for Beginners: 10 Essential Techniques
				</h2>

				<p className="article-meta">
					<strong className="article-author">By Julien Bill Gates</strong>
					<span className="article-dot"> • </span>
					<time dateTime="2024-11-15">November 15, 2024</time>
				</p>

				<p className="article-intro">
					Good cooking is not magic — it’s technique. Here are 10 simple skills
					that change everything:
				</p>

				{openArticle === 2 && (
					<>
						<p className="article-full-text">
							From knife handling and sautéing to understanding heat levels and
							seasoning properly, mastering basics changes everything. One key
							concept is <em>mise en place</em>: preparing everything before
							cooking.
						</p>

						<ol className="article-full-text">
							<li>
								How to hold a knife properly – safer, faster, more precise.
							</li>
							<br />
							<li>
								Sautéing – cooking quickly in a pan with little fat, great for
								vegetables.
							</li>
							<br />
							<li>
								Boiling vs simmering – boiling = high heat bubbles, simmering =
								gentle heat. Big difference.
							</li>
							<br />
							<li>
								Deglazing a pan – adding liquid (water, wine, broth) to dissolve
								flavors stuck to the bottom.
							</li>
							<br />
							<li>Taste as you cook – your tongue is your best tool.</li>
							<br />
							<li>
								Using salt correctly – salt enhances flavor, it doesn’t just
								make food salty.
							</li>
							<br />
							<li>
								Resting meat – let it rest after cooking so juices redistribute.
							</li>
							<br />
							<li>Understanding heat levels – high heat ≠ better cooking.</li>
							<br />
							<li>
								Reading a recipe fully before starting – it avoids 80% of
								beginner mistakes.
							</li>
							<br />
							<li>
								<em>Mise en place</em> – preparing all ingredients before
								cooking.
							</li>
						</ol>

						<p className="article-full-text">
							<strong>Term explained:</strong>
							<br />
							<em>Mise en place</em> (French) means &quot;everything in its
							place&quot;.
							<br />
							It’s a key principle in professional kitchens.
						</p>

						<p className="article-full-text">
							Cooking is a skill — and every skill starts with basics.
						</p>
					</>
				)}

				<button
					type="button"
					className="read-more-button"
					onClick={() => toggleArticle(2)}
				>
					{openArticle === 2 ? "Show less" : "Read more"}
				</button>
			</article>

			<div className="blog-separator" />

			<article className="blog-article">
				<img
					src={blogImageFrigo}
					alt="Person looking inside a fridge"
					className="blog-image"
				/>

				<h2 className="article-title">
					The Smart Fridge: How Tech Reinvents Cooking
				</h2>

				<p className="article-meta">
					<strong className="article-author">
						By Serah de Magic Fridge Team
					</strong>
					<span className="article-dot"> • </span>
					<time dateTime="2024-10-28">October 28, 2024</time>
				</p>

				<p className="article-intro">
					Everyone knows this moment: You open your fridge, stare for 2 minutes…
					and close it without any idea. When you don’t know what to cook, let
					your ingredients guide you.
				</p>

				{openArticle === 3 && (
					<>
						<p className="article-full-text">
							Our app is built exactly for this situation.
						</p>

						<p className="article-full-text">
							Instead of asking:
							<br />
							<em>&ldquo;What should I cook today?&rdquo;</em>
						</p>

						<p className="article-full-text">
							You just type:
							<br />
							<em>&ldquo;eggs + cheese + spinach&rdquo;</em>
						</p>

						<p className="article-full-text">
							And the app shows you only recipes containing those ingredients.
							<br />
							It’s like turning your fridge into a creative engine instead of a
							stress source.
						</p>

						<p className="article-full-text">This helps you:</p>

						<ul className="article-full-text">
							<li>Avoid food waste</li>
							<li>Save money</li>
							<li>Discover new combinations</li>
							<li>Cook with what you already have</li>
						</ul>

						<p className="article-full-text">
							It’s not just a recipe app.
							<br />
							It’s a bridge between your real fridge and your ideas.
						</p>

						<p className="article-full-text">
							That’s the idea of a smart kitchen:
							<br />
							Not more complexity — just better suggestions.
						</p>
					</>
				)}

				<button
					type="button"
					className="read-more-button"
					onClick={() => toggleArticle(3)}
				>
					{openArticle === 3 ? "Show less" : "Read more"}
				</button>
			</article>
		</section>
	);
}
