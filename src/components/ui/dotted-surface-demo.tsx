import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from '@/lib/utils';
import { MousePointerClick } from 'lucide-react';

export default function DemoOne() {
 return (
		<DottedSurface className="size-full">
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
				<MousePointerClick className="w-12 h-12" />
				<h1 className="font-mono text-4xl font-semibold">Dotted Surface</h1>
			</div>
		</DottedSurface>
	);
}
