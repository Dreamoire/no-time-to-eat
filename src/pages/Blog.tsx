import { useState } from "react";

import blogImageBeginner from "../assets/images/blog-image-beginner.jpg";
import blogImageChristmas from "../assets/images/blog-image-christmas.jpg";
import blogImageFrigo from "../assets/images/blog-image-frigo.jpg";
import blogImageWorld from "../assets/images/blog-image-world.jpg";

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
					<strong className="article-author">
						<a
							href="https://www.linkedin.com/in/florent-goujon-903308387/"
							target="_blank"
							rel="noopener noreferrer"
							className="article-author-link"
						>
							Florent Goujon
						</a>
					</strong>
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
					<strong className="article-author">
						<a
							href="https://www.linkedin.com/in/julien-paultes/"
							target="_blank"
							rel="noopener noreferrer"
							className="article-author-link"
						>
							Julien Paultes
						</a>
					</strong>
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
						<a
							href="https://www.linkedin.com/in/serah-abijo-developpeuse/"
							target="_blank"
							rel="noopener noreferrer"
							className="article-author-link"
						>
							Serah Rietsch
						</a>
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
			<div className="blog-separator" />
			<article className="blog-article">
				<img
					src={blogImageWorld}
					alt="French cook preparing world cuisine at home"
					className="blog-image"
				/>

				<h2 className="article-title">
					World Cuisine at Home: How Global Flavors Transformed Modern French
					Cooking
				</h2>

				<p className="article-meta">
					<strong className="article-author">
						<a
							href="https://www.linkedin.com/in/yuliana-krasulya/"
							target="_blank"
							rel="noopener noreferrer"
							className="article-author-link"
						>
							Yuliana Krasulya
						</a>
					</strong>
					<span className="article-dot"> • </span>
					<time dateTime="2025-11-27">November 27, 2025</time>
				</p>

				<p className="article-intro">
					From miso butter to harissa mayonnaise, today’s French kitchens are no
					longer confined to classical borders. They have become a crossroads of
					world cuisines — not by imitation, but through intelligent integration
					into everyday cooking.
				</p>
				{openArticle === 4 && (
					<>
						<p className="article-full-text">
							Modern French cuisine has not lost its identity. On the contrary,
							it has expanded it — by absorbing ingredients, techniques, and
							culinary philosophies from multiple cultures, and reinterpreting
							them through its own sensibility.
						</p>

						<p className="article-full-text">
							<strong>Italy &amp; Spain — The Mediterranean Backbone</strong>
							<br />
							Italian and Spanish influences are now fully part of daily French
							cooking. Olive oil has replaced butter in many preparations,
							especially for vegetables and fish. Tomato-based sauces,
							mozzarella, burrata, Parmigiano Reggiano, serrano ham, and chorizo
							are everyday products in French supermarkets.
							<br />
							Spanish <em>pimentón</em> (smoked paprika) is widely used in
							roasted vegetables, braised meats, and sauces for poultry and
							seafood. Italian risotto technique — gradually adding hot stock
							while stirring — is often applied in modern French bistros to
							barley, quinoa, or spelt, not only rice. Tapas culture has also
							influenced French dining habits, especially in urban wine bars
							where small plates, olives, tortilla, and cured meats have become
							standard.
						</p>

						<p className="article-full-text">
							<strong>Turkey &amp; the Eastern Mediterranean</strong>
							<br />
							Turkish and Levantine food cultures have strongly influenced
							contemporary French cooking via migration and restaurant culture.
							Ingredients such as tahini, bulgur, sumac, and za&apos;atar are
							now common in French home kitchens. Tahini is often used in
							dressings for roasted vegetables or as a base for light sauces
							replacing cream, and bulgur has become a lighter alternative to
							semolina in vegetable stuffings and grain salads. Mezze culture
							also introduced the idea of shared plates and yogurt-based sauces,
							now frequently seen in casual French dining.
						</p>

						<p className="article-full-text">
							<strong>Algeria, Morocco, and Tunisia (Maghreb)</strong>
							<br />
							Couscous is one of the most widely consumed family dishes in
							France. Harissa, originally from Tunisia, is now used not only
							with couscous, but also in French-style sauces, mayonnaise, and
							grilled meat marinades.
							<br />
							<br />
							<strong>Senegal &amp; Côte d&apos;Ivoire</strong>
							<br />
							Dishes inspired by <em>mafé</em> (peanut stew) and{" "}
							<em>thiéboudienne</em> have influenced French interpretations of
							slow-cooked sauces and spiced fish dishes, often adapted with
							local vegetables and meats.
							<br />
							<br />
							<strong>Cameroon &amp; Nigeria</strong>
							<br />
							Ingredients like plantain, okra, and peanuts are now widely
							available in French supermarkets and used increasingly in fusion
							home cooking and restaurant cuisine. These culinary influences are
							deeply rooted in France&apos;s social and historical realities,
							not a passing trend.
						</p>

						<p className="article-full-text">
							<strong>Japan &amp; China — Precision and Umami</strong>
							<br />
							Japanese cuisine has had a major impact on modern French
							gastronomy, particularly in high-end and &quot;bistronomy&quot;
							restaurants. Soy sauce, miso, sesame oil, rice vinegar, dashi, and
							kombu are frequently used in broths, sauces, and marinades. Miso
							butter, miso-marinated fish, and soy-based vinaigrettes are now
							part of modern French cooking.
							<br />
							Chinese techniques like wok stir-frying and steaming have
							influenced lighter, faster home cooking. Steamed fish, stir-fried
							vegetables, and dumplings have become familiar dishes in French
							households, especially in large cities.
						</p>

						<p className="article-full-text">
							<strong>India — Spices and Rice Culture</strong>
							<br />
							Indian cuisine brought not only spices, but cooking methods.
							Basmati rice is now a premium everyday rice in many French homes.
							The traditional Indian method — rinsing several times, soaking,
							cooking by absorption, and letting it rest with a lid — is widely
							recommended in French cooking media and culinary schools. Spices
							like turmeric, cumin, garam masala, ginger, and cardamom are now
							used in soups, lentil dishes, vegetable purées, and modern
							interpretations of French stews.
						</p>

						<p className="article-full-text">
							<strong>Latin America — Freshness and Acidity</strong>
							<br />
							South American culinary influences are clearly visible in French
							food culture today. From Peru, ceviche has been adopted by many
							French restaurants, especially for seafood dishes based on lime
							and fresh herbs. From Mexico, the combination of chili, lime, and
							avocado has influenced tartares, salads, and street-food-inspired
							dishes. From the Andes (especially Bolivia and Peru), quinoa has
							become a fully normalized ingredient in French supermarkets and
							vegetarian menus. Avocado, lime, sweet potatoes, and fresh chilies
							are now everyday products for a significant part of the French
							population.
						</p>

						<p className="article-full-text">
							<strong>A Living Culinary Dialogue</strong>
							<br />
							Modern French cuisine is no longer isolated. It is a dynamic
							conversation between traditions — and that’s exactly what keeps it
							alive. Each ingredient, technique, or flavor borrowed from another
							culture becomes part of a living dialogue between traditions. What
							we now call &quot;French cuisine&quot; is no longer just a
							national cuisine — it is a refined intersection of global
							histories, products, and <em>savoir-faire</em>.
						</p>
					</>
				)}

				<button
					type="button"
					className="read-more-button"
					onClick={() => toggleArticle(4)}
				>
					{openArticle === 4 ? "Show less" : "Read more"}
				</button>
			</article>
		</section>
	);
}
