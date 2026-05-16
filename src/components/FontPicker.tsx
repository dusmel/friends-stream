import { useEffect, useState } from 'react';

const STORAGE_KEY = 'hadad-private-streaming-font';

const fontOptions = [
	{ id: 'jakarta', label: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', system-ui, sans-serif" },
	{ id: 'inter', label: 'Inter', family: "'Inter', system-ui, sans-serif" },
	{ id: 'manrope', label: 'Manrope', family: "'Manrope', system-ui, sans-serif" },
	{ id: 'sora', label: 'Sora', family: "'Sora', system-ui, sans-serif" },
	{ id: 'space-grotesk', label: 'Space Grotesk', family: "'Space Grotesk', system-ui, sans-serif" },
];

export default function FontPicker() {
	const [selectedFont, setSelectedFont] = useState('jakarta');

	useEffect(() => {
		const storedFont = window.localStorage.getItem(STORAGE_KEY);
		const nextFont = fontOptions.some((option) => option.id === storedFont) ? storedFont : 'jakarta';

		setSelectedFont(nextFont);
		document.documentElement.dataset.font = nextFont;
	}, []);

	useEffect(() => {
		document.documentElement.dataset.font = selectedFont;
		window.localStorage.setItem(STORAGE_KEY, selectedFont);
	}, [selectedFont]);

	return (
		<div className="mt-4 flex flex-wrap gap-2">
			{fontOptions.map((option) => {
				const isActive = option.id === selectedFont;

				return (
					<button
						key={option.id}
						type="button"
						onClick={() => setSelectedFont(option.id)}
						className={[
							'rounded-full border px-4 py-2 text-sm transition',
							isActive
								? 'border-white/40 bg-white text-slate-950 shadow-sm'
								: 'border-white/12 bg-white/5 text-white/78 hover:border-white/25 hover:bg-white/10',
						].join(' ')}
						style={{ fontFamily: option.family }}
					>
						{option.label}
					</button>
					);
				})}
			</div>
		);
}
