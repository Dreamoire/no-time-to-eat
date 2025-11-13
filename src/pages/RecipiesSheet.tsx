import "../styles/RecipiesSheet.css";

export default function RecipiesSheet() {
	return (
		<main className="recipe-sheet">
			<header className="recipe-header">
				<section className="recipe-hero">
					<section className="recipe-hero-text">
						<p>recette</p>
						<h1>Shakshuka</h1>

						<section>
							<button
								type="button"
								className="icon-button"
								aria-label="add to favorites"
								title="Ajouter aux favoris"
							>
								<span className="icon-star" aria-hidden="true">
									*
								</span>
							</button>

							<button
								type="button"
								className="icon-button"
								aria-label="copy recipe"
								title="Copier"
							/>

							<span>4856 kcal / 100g</span>
						</section>

						<ul className="recipe-tags">
							<li>cuisson : 30 min</li>
							<li>pour 6 personnes</li>
						</ul>
					</section>

					<figure>
						<img
							src="/src/assets/images/header_image_2.jpg"
							alt="Shakshuka dans une poêle"
						/>
					</figure>
				</section>
			</header>

			<section>
				<aside className="ingredients-panel">
					<h2>Ingrédients</h2>
					<ul>
						<li>800g de tomates</li>
						<li>250g de poivrons rouges</li>
						<li>1 oignon</li>
						<li>4 gousses d&apos;ail émincées</li>
						<li>1 c. à café de cumin</li>
						<li>piment d&apos;Espelette</li>
						<li>8 gros œufs bio</li>
						<li>1/2 botte de coriandre émincée</li>
						<li>1/2 botte de persil émincé</li>
						<li>huile d&apos;olive</li>
						<li>sel, fleur de sel</li>
						<li>pour servir</li>
						<li>4 pains pita</li>
					</ul>
				</aside>

				<article className="preparation-panel">
					<h2>Préparation</h2>

					<p>
						Hachez les tomates, les poivrons et l&apos;oignon. Versez un filet
						d&apos;huile d&apos;olive dans une grande poêle et faites-la
						chauffer sur feu moyen avec les tomates, les poivrons et
						l&apos;oignon hachés. Ajoutez les gousses d&apos;ail émincées et le
						piment d&apos;Espelette. Laissez cuire 20 minutes en remuant.
					</p>

					<p>
						Mixez la moitié de la préparation avec un mixeur plongeant et
						remettez-la dans la poêle.
					</p>

					<p>
						Cassez les œufs dans la poêle. Baissez sur feu doux et poursuivez la
						cuisson 7 à 10 minutes.
					</p>

					<p>
						Parsemez d&apos;herbes émincées, d&apos;un peu de fleur de sel et de
						piment d&apos;Espelette. Dégustez chaud en trempant le pain pita
						dans la sauce.
					</p>
				</article>
			</section>

			<footer className="recipe-footer">
				<p>© Magic Fridge - 2025</p>
			</footer>
		</main>
	);
}
