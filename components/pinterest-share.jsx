import { absoluteUrl } from "@/lib/site-config";

function PinterestIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.966 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641 0 12.017 0Z" />
    </svg>
  );
}

export function PinterestShare({
  title,
  description,
  path,
  image,
  variant = "button",
  className = "",
}) {
  const articleUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    articleUrl,
  )}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(
    `${title} — ${description}`,
  )}`;

  if (variant === "icon") {
    return (
      <a
        href={pinUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Open Pinterest's Pin creator in a new tab"
        aria-label={`Share ${title} on Pinterest`}
        className={`inline-flex h-11 w-11 items-center justify-center border border-espresso/25 text-espresso transition hover:border-burgundy hover:bg-burgundy hover:text-ivory ${className}`}
      >
        <PinterestIcon className="h-4 w-4" />
      </a>
    );
  }

  return (
    <a
      href={pinUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Open Pinterest's Pin creator in a new tab"
      className={`button-secondary ${className}`}
    >
      <PinterestIcon className="h-4 w-4" />
      Pin this outfit
    </a>
  );
}
