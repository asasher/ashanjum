import { type Metadata } from "next";
import Link from "next/link";

import { APP_NAME, LegalPage, Mail, Section } from "../legal";

export const metadata: Metadata = {
  title: "Data deletion",
  description: `How to delete data held by the ${APP_NAME} Meta app.`,
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      eyebrow="Data deletion"
      title="Data deletion"
      intro={
        <p>
          The {APP_NAME} app is a private tool that automates advertising for my
          own business. It has no public users, but if you have connected it to
          a Facebook account or think it holds data about you, here is how to
          remove its access and have that data deleted.
        </p>
      }
    >
      <Section title="Option 1: Remove the app from Facebook">
        <p>This stops the app&apos;s access straight away.</p>
        <ol>
          <li>
            On Facebook, open <strong>Settings &amp; privacy</strong> then{" "}
            <strong>Settings</strong>.
          </li>
          <li>
            Go to <strong>Apps and websites</strong>. If you connected through a
            business account, check <strong>Business integrations</strong> too.
          </li>
          <li>
            Find <strong>{APP_NAME}</strong> and click <strong>Remove</strong>,
            then confirm.
          </li>
        </ol>
        <p>
          Removing the app invalidates its access token, so it can no longer
          read or change anything in your accounts.
        </p>
      </Section>

      <Section title="Option 2: Email a deletion request">
        <p>
          Email <Mail /> with the subject <strong>Data deletion request</strong>{" "}
          and the name on your Facebook account, so I can find the right
          records. I will delete the data and confirm by email within 30 days.
        </p>
      </Section>

      <Section title="What gets deleted">
        <ul>
          <li>Any stored access tokens.</li>
          <li>Your name, Meta user ID and any identifiers linked to you.</li>
          <li>Any cached data and request logs related to you.</li>
        </ul>
      </Section>

      <Section title="Questions">
        <p>
          Email <Mail />. The <Link href="/privacy">privacy policy</Link> covers
          what the app accesses and why.
        </p>
      </Section>
    </LegalPage>
  );
}
