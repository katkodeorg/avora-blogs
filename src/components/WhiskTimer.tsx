import { useEffect, useRef, useState } from 'react';

/**
 * WhiskTimer — an interactive React "island".
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
					padding: 1.5em;
					border: 1px solid rgb(var(--gray-light));
					border-radius: 16px;
					background: #fff;
					box-shadow: var(--box-shadow);
				}
				.whisk-ring {
					width: 120px;
					height: 120px;
					margin: 0 auto 0.75em;
					border-radius: 50%;
					display: grid;
					place-items: center;
					background:
						conic-gradient(var(--accent) var(--pct), rgb(var(--gray-light)) 0);
					transition: background 1s linear;
				}
				.whisk-ring::after {
					content: '';
					position: absolute;
					width: 96px;
					height: 96px;
					border-radius: 50%;
					background: #fff;
				}
				.whisk-count {
					position: relative;
					font-size: 2.2em;
					font-weight: 700;
					color: var(--accent-dark);
				}
				.whisk-label {
					margin: 0 0 1em;
					color: rgb(var(--gray-dark));
				}
				.whisk-actions {
					display: flex;
					gap: 0.5em;
					justify-content: center;
				}
				.whisk-actions button {
					font: inherit;
					padding: 0.5em 1.2em;
					border-radius: 999px;
					border: 2px solid var(--accent);
					background: var(--accent);
					color: #fff;
					cursor: pointer;
				}
				.whisk-actions button.ghost {
					background: transparent;
					color: var(--accent);
				}
			`}</style>
		</div>
	);
}
