import { useEffect, useRef, useState } from 'react';

/**
 * WhiskTimer: an interactive React "island".
 *
 * This is a client-side interactive component. In Astro it renders to static
 * HTML at build time (good for SEO) and only "hydrates" into live JavaScript
 * in the browser when you add a client directive, e.g.:
 *
 *   <WhiskTimer client:visible />
 *
 * Use React islands like this for the interactive/flashy bits; keep everything
 * else as plain Astro for the fastest, most indexable pages.
 */
const DEFAULT_SECONDS = 30;

export default function WhiskTimer() {
	const [remaining, setRemaining] = useState(DEFAULT_SECONDS);
	const [running, setRunning] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (!running) return;
		intervalRef.current = setInterval(() => {
			setRemaining((s) => {
				if (s <= 1) {
					setRunning(false);
					return 0;
				}
				return s - 1;
			});
		}, 1000);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [running]);

	const done = remaining === 0;
	const pct = (remaining / DEFAULT_SECONDS) * 100;

	return (
		<div className="whisk-timer">
			<div className="whisk-ring" style={{ '--pct': `${pct}%` } as React.CSSProperties}>
				<span className="whisk-count">{done ? '🍵' : remaining}</span>
			</div>
			<p className="whisk-label">
				{done
					? 'Perfect. Enjoy your bowl.'
					: running
						? 'Whisk briskly in a “W” motion…'
						: 'Whisk for 30 seconds for a smooth, frothy bowl.'}
			</p>
			<div className="whisk-actions">
				<button
					type="button"
					onClick={() => {
						if (done) {
							setRemaining(DEFAULT_SECONDS);
							setRunning(true);
						} else {
							setRunning((r) => !r);
						}
					}}
				>
					{done ? 'Whisk again' : running ? 'Pause' : 'Start whisking'}
				</button>
				<button
					type="button"
					className="ghost"
					onClick={() => {
						setRunning(false);
						setRemaining(DEFAULT_SECONDS);
					}}
				>
					Reset
				</button>
			</div>

			<style>{`
				.whisk-timer {
					text-align: center;
					padding: 2em 1.5em;
					border: 1px solid var(--color-line);
					border-radius: 20px;
					background: var(--color-card);
					box-shadow: var(--shadow-soft);
				}
				.whisk-ring {
					position: relative;
					width: 132px;
					height: 132px;
					margin: 0 auto 1em;
					border-radius: 50%;
					display: grid;
					place-items: center;
					background:
						conic-gradient(var(--color-crimson) var(--pct), var(--color-line) 0);
					transition: background 1s linear;
				}
				.whisk-ring::after {
					content: '';
					position: absolute;
					width: 104px;
					height: 104px;
					border-radius: 50%;
					background: var(--color-card);
				}
				.whisk-count {
					position: relative;
					font-family: var(--font-display, Georgia, serif);
					font-size: 2.6em;
					font-weight: 600;
					color: var(--color-crimson-dark);
				}
				.whisk-label {
					margin: 0 0 1.2em;
					color: var(--color-muted);
				}
				.whisk-actions {
					display: flex;
					flex-wrap: wrap;
					gap: 0.6em;
					justify-content: center;
				}
				.whisk-actions button {
					font: inherit;
					font-weight: 600;
					letter-spacing: 0.02em;
					padding: 0.6em 1.4em;
					border-radius: 999px;
					border: 2px solid var(--color-crimson);
					background: var(--color-crimson);
					color: var(--color-cream);
					cursor: pointer;
					transition: transform 0.2s ease, background 0.2s ease;
				}
				.whisk-actions button:hover {
					background: var(--color-crimson-dark);
					transform: translateY(-1px);
				}
				.whisk-actions button.ghost {
					background: transparent;
					color: var(--color-crimson);
				}
				.whisk-actions button.ghost:hover {
					background: color-mix(in srgb, var(--color-crimson) 8%, transparent);
					transform: none;
				}
			`}</style>
		</div>
	);
}
