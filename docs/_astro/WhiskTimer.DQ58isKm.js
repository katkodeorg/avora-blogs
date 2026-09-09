import{n as e,t}from"./react.B3l9tXpq.js";var n=e((e=>{var t=Symbol.for(`react.transitional.element`);function n(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.jsx=n,e.jsxs=n})),r=e(((e,t)=>{t.exports=n()})),i=t(),a=r(),o=30;function s(){let[e,t]=(0,i.useState)(o),[n,r]=(0,i.useState)(!1),s=(0,i.useRef)(null);(0,i.useEffect)(()=>{if(n)return s.current=setInterval(()=>{t(e=>e<=1?(r(!1),0):e-1)},1e3),()=>{s.current&&clearInterval(s.current)}},[n]);let c=e===0,l=e/o*100;return(0,a.jsxs)(`div`,{className:`whisk-timer`,children:[(0,a.jsx)(`div`,{className:`whisk-ring`,style:{"--pct":`${l}%`},children:(0,a.jsx)(`span`,{className:`whisk-count`,children:c?`🍵`:e})}),(0,a.jsx)(`p`,{className:`whisk-label`,children:c?`Perfect. Enjoy your bowl.`:n?`Whisk briskly in a “W” motion…`:`Whisk for 30 seconds for a smooth, frothy bowl.`}),(0,a.jsxs)(`div`,{className:`whisk-actions`,children:[(0,a.jsx)(`button`,{type:`button`,onClick:()=>{c?(t(o),r(!0)):r(e=>!e)},children:c?`Whisk again`:n?`Pause`:`Start whisking`}),(0,a.jsx)(`button`,{type:`button`,className:`ghost`,onClick:()=>{r(!1),t(o)},children:`Reset`})]}),(0,a.jsx)(`style`,{children:`
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
			`})]})}export{s as default};