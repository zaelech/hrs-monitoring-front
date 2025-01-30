import Link from 'next/link';
import { languages } from '@/i18n/settings';

interface LanguageSwitcherProps {
    lng: string;
}

const LanguageSwitcher = ({ lng }: LanguageSwitcherProps) => {
    return (
        <div className="ml-auto flex gap-2">
            {languages.map((l) => (
                <Link
                    key={l}
                    href={`/${l}`}
                    className={`text-white hover:text-gray-200 text-sm ${
                        l === lng ? 'font-bold underline' : 'font-normal'
                    }`}
                >
                    {l.toUpperCase()}
                </Link>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
