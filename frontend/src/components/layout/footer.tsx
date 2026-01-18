export function Footer() {
    return (
        <footer className="border-t py-8 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                <p>© 2026 TaskFlow Inc. Built for Mittwald interview.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-zinc-900">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-zinc-900">
                        Terms
                    </a>
                    <a href="#" className="hover:text-zinc-900">
                        Support
                    </a>
                </div>
            </div>
        </footer>
    );
}
