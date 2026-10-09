import { FooterLife } from "./footer-life";
import { Home } from "./home";

/* Light cover and footer, graphite accent, Life in the footer. Dark mode
   follows the visitor's system setting (data-theme="auto"). */
export default function HomePage() {
  return (
    <div data-theme="auto" className="bg-ground text-ink">
      <Home slots={{ cover: "light", footer: "light", footerArt: <FooterLife /> }} />
    </div>
  );
}
