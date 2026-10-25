import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "A starter privacy policy for The Style Edit covering static hosting, newsletter signups, analytics, and affiliate links.",
  path: "/privacy-policy/",
  image: "/images/articles/chic-work-outfits.jpg",
  imageAlt: "Woman in a brown suit walking on a city sidewalk",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container-editorial pb-20 pt-6 sm:pt-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

      <header className="mx-auto mt-12 max-w-3xl sm:mt-16">
        <p className="eyebrow">Site information</p>
        <h1 className="display-title mt-5 text-[3.2rem] sm:text-[4.8rem]">Privacy Policy</h1>
        <p className="mt-5 font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/55">
          Effective date: [EFFECTIVE DATE] · Site owner: [SITE OWNER NAME]
        </p>
      </header>

      <aside className="mx-auto mt-10 max-w-3xl border border-line bg-ivory p-5 sm:p-6">
        <p className="eyebrow">Starter document</p>
        <p className="mt-3 font-sans text-xs leading-6 text-charcoal/70">
          This is a starter policy for a statically hosted fashion blog. It is general information,
          not legal advice. Replace every bracketed placeholder and review the policy with a
          qualified professional after you connect analytics, advertising, email marketing, or
          affiliate programs.
        </p>
      </aside>

      <div className="prose-editorial mx-auto mt-12 max-w-3xl">
        <p>
          {siteConfig.name} (“we,” “us,” or “our”) publishes editorial content about fashion and personal style.
          This policy explains what information may be processed when you visit this website, how it
          may be used, and the choices available to you.
        </p>

        <h2>Information we collect</h2>
        <p>
          This website is a static site. It does not have a user account system, a database, a
          checkout, or a server-side contact form. We do not ask you to create a profile to read the
          journal.
        </p>
        <p>
          If you choose to contact us by email, we will receive the information you include in your
          message, such as your email address, name, and the content of your correspondence. If a
          newsletter service is connected in the future, that provider may collect your email
          address and subscription preferences.
        </p>
        <p>
          The site’s hosting provider may automatically process technical information such as your IP
          address, browser type, requested pages, referring pages, and timestamps for security,
          reliability, and operational purposes. The exact data processed depends on the hosting
          configuration.
        </p>

        <h2>Newsletter</h2>
        <p>
          The newsletter form in this starter is a design preview unless an endpoint has been
          configured. In preview mode, submitting the form does not store or transmit your email
          address. If a newsletter provider is connected, the form will send your email address to
          that provider, and the provider’s privacy policy will apply. Newsletter messages will
          include an unsubscribe mechanism.
        </p>

        <h2>Analytics and cookies</h2>
        <p>
          The starter does not intentionally include analytics, advertising pixels, or tracking
          cookies. The site may use strictly necessary technical storage or security mechanisms
          provided by the hosting platform. If analytics, advertising, or other tracking tools are
          added later, this policy should be updated, and any required consent mechanism should be
          implemented.
        </p>

        <h2>Third-party links</h2>
        <p>
          Articles may link to third-party websites, including Pinterest and, in the future,
          retailers. Those sites operate independently from us and have their own privacy and cookie
          practices. We are not responsible for the content or privacy practices of third-party
          sites.
        </p>

        <h2>Affiliate links</h2>
        <p>
          The site may use affiliate links in the future. If you click an affiliate link and make a
          purchase, we may receive a commission. Affiliate partners may use cookies or similar
          technologies to attribute a purchase. See our{" "}
          <Link href="/affiliate-disclosure/">Affiliate Disclosure</Link> for more information. At
          the time of this starter’s publication, no affiliate links are active.
        </p>

        <h2>How information may be used</h2>
        <ul>
          <li>To respond to messages and editorial enquiries.</li>
          <li>To deliver a newsletter if you have asked to receive one.</li>
          <li>To maintain the security, performance, and reliability of the website.</li>
          <li>To understand aggregate site usage if analytics are added in the future.</li>
          <li>To comply with legal obligations or enforce applicable rights.</li>
        </ul>

        <h2>Sharing information</h2>
        <p>
          We do not sell personal information. Information may be shared with service providers that
          help operate the site, such as hosting, email delivery, analytics, or advertising partners,
          subject to their respective terms and privacy policies. We may also disclose information
          when required by law or necessary to protect legal rights.
        </p>

        <h2>Data retention</h2>
        <p>
          Correspondence is retained only as long as reasonably necessary to respond and maintain
          editorial records. Newsletter data is retained according to the configured email provider’s
          settings and applicable law. Hosting logs are retained according to the hosting provider’s
          policies.
        </p>

        <h2>Your choices and rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct, delete, restrict, or
          object to certain processing of your personal information. You may also have the right to
          withdraw consent or lodge a complaint with a local data protection authority. To make a
          request, contact us using the details below.
        </p>

        <h2>Children</h2>
        <p>
          This website is intended for a general fashion audience and is not directed to children.
          We do not knowingly collect personal information from children. If you believe a child has
          provided personal information, please contact us so we can review the situation.
        </p>

        <h2>International visitors</h2>
        <p>
          The website may be hosted and processed in countries other than your own. Privacy
          protections in those countries may differ from those where you live. Before launch, the
          site owner should document the hosting location and any applicable transfer mechanisms.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as the site or its services change. The effective date at the top
          of this page should be updated when material changes are made.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, contact [CONTACT EMAIL] or use the details on our{" "}
          <Link href="/contact/">contact page</Link>. Replace these placeholders with the site
          owner’s real details before launch.
        </p>
      </div>
    </div>
  );
}
