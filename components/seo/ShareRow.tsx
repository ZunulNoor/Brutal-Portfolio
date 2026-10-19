import styles from "./ShareRow.module.css";

type Props = {
  url: string;
  text: string;
  label?: string;
};

const networks = (url: string, text: string) => [
  {
    name: "Share on X",
    href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
  },
  {
    name: "Share on Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    name: "Share on LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  },
  {
    name: "Share on WhatsApp",
    href: `https://wa.me/?text=${text}%20${url}`,
  },
  {
    name: "Share via email",
    href: `mailto:?subject=${text}&body=${url}`,
  },
];

export default function ShareRow({ url, text, label = "Share" }: Props) {
  if (!url) return null;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return (
    <div className={styles.share}>
      <span className={styles.label}>{label}</span>
      <ul className={styles.list}>
        {networks(encodedUrl, encodedText).map((n) => (
          <li key={n.name}>
            <a href={n.href} target="_blank" rel="noopener noreferrer">
              {n.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}