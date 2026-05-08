export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="12" fill="url(#paint0_linear)" />
            <path
                d="M16 24C16 20.6863 18.6863 18 22 18H26C29.3137 18 32 20.6863 32 24C32 27.3137 29.3137 30 26 30H22C18.6863 30 16 27.3137 16 24Z"
                stroke="white"
                strokeWidth="2.5"
            />
            <path
                d="M20 24H28"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <circle cx="16" cy="24" r="3" fill="white" />
            <circle cx="32" cy="24" r="3" fill="white" />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="0"
                    y1="0"
                    x2="48"
                    y2="48"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#9333EA" />
                </linearGradient>
            </defs>
        </svg>
    );
}
