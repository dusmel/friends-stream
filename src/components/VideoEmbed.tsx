type VideoEmbedProps = {
	url?: string;
	title: string;
};

const isYoutubeEmbed = (url: string) => {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be');
	} catch {
		return false;
	}
};

export default function VideoEmbed({ url, title }: VideoEmbedProps) {
	const hasEmbed = url && isYoutubeEmbed(url);

	if (!hasEmbed) {
		return (
			<div className="flex aspect-video items-center justify-center rounded-[1.5rem] bg-slate-950 p-6 text-center text-white">
				<div className="max-w-sm">
					<p className="text-sm font-medium text-sky-300">Video placeholder</p>
					<h3 className="mt-3 text-xl font-semibold">{title}</h3>
					<p className="mt-3 text-sm leading-6 text-slate-300">
						Replace the embed URL in <code className="rounded bg-white/10 px-1.5 py-0.5">src/pages/index.astro</code> when the final guide is ready.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-[1.5rem] bg-slate-950 shadow-inner">
			<iframe
				className="aspect-video w-full"
				src={url}
				title={title}
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			/>
		</div>
	);
}
