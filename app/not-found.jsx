import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
        <h1 className="text-6xl font-bold gradient-title mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Страница Не Найдена</h2>
        <p className="text-gray-600 mb-8">
        Вы находитесь здесь потому, что запрашиваемая страница не существует или была перемещена по другому адресу.
        </p>
        <Link href="/">
        <Button>На Главную</Button>
        </Link>
    </div>
);
}