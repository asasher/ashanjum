import { type Metadata } from "next";
import Link from "next/link";

import { APP_NAME, LegalPage, Mail, OPERATOR, Section } from "../legal";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `Terms for the ${APP_NAME} Meta app.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of service"
      title="Terms of service"
      intro={
        <p>
          The {APP_NAME} app is a private automation tool operated by {OPERATOR}
          . It runs advertising for my own business through Meta&apos;s
          Marketing API and isn&apos;t offered to anyone else.
        </p>
      }
    >
      <Section title="Who can use it">
        <p>
          Only me and people I authorise to work on my business&apos;s ad
          accounts. There is no public sign-up, and the app is not offered as a
          product or service.
        </p>
      </Section>

      <Section title="Use of Meta platforms">
        <p>
          The app is used in line with Meta&apos;s Terms, Platform Terms,
          Developer Policies and Advertising Standards, and with the law where
          the ads run. It only accesses accounts, Pages and businesses I own or
          am authorised to manage.
        </p>
      </Section>

      <Section title="Data">
        <p>
          How the app handles data is set out in the{" "}
          <Link href="/privacy">privacy policy</Link>. Instructions for removing
          its access and deleting data are on the{" "}
          <Link href="/data-deletion">data deletion page</Link>.
        </p>
      </Section>

      <Section title="No warranty">
        <p>
          The app is provided as is. It depends on Meta&apos;s API, which can
          change or stop without notice.
        </p>
      </Section>

      <Section title="Changes and law">
        <p>
          I may update these terms and will change the date at the top when I
          do. They are governed by the laws of the Emirate of Dubai and the
          federal laws of the UAE.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Email <Mail />.
        </p>
      </Section>
    </LegalPage>
  );
}
