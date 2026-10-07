import { type Metadata } from "next";
import Link from "next/link";

import { APP_NAME, LegalPage, Mail, OPERATOR, Section } from "../legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How the ${APP_NAME} Meta app handles data it accesses through Meta's APIs.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy policy"
      title="Privacy policy"
      intro={
        <p>
          The {APP_NAME} app is a private automation tool. I, {OPERATOR}, use it
          to run advertising for my own business in Dubai, UAE, through
          Meta&apos;s Marketing API. It isn&apos;t offered to the public, nobody
          else signs in to it, and I don&apos;t sell or share the data it
          handles.
        </p>
      }
    >
      <Section title="Who is responsible">
        <p>
          {OPERATOR} operates the app and is responsible for the data it
          processes. Write to <Mail /> about anything on this page.
        </p>
      </Section>

      <Section title="What the app does">
        <p>
          The app automates my business&apos;s advertising on Facebook and
          Instagram. It creates, edits, pauses and reports on campaigns, ad
          sets, ads and creatives, and reads performance insights. I run it
          directly and through AI assistants that connect to it over the Model
          Context Protocol (MCP): the assistant asks for an action, the app
          calls Meta&apos;s API, and the result comes back to me.
        </p>
      </Section>

      <Section title="Data the app accesses">
        <p>
          Only data belonging to my own Meta accounts, and only what the
          app&apos;s permissions allow:
        </p>
        <ul>
          <li>
            <strong>Login data.</strong> My name, Meta user ID and an access
            token, from connecting the app through Facebook Login.
          </li>
          <li>
            <strong>Ad account data.</strong> My ad accounts and their
            campaigns, ad sets, ads, creatives, budgets, targeting settings,
            spend and performance insights.
          </li>
          <li>
            <strong>Business and Page data.</strong> My Business Manager, Pages
            and Instagram accounts, so ads can run from them.
          </li>
          <li>
            <strong>Audience data.</strong> Custom audience definitions and
            sizes. If I upload a customer list to build an audience, it is
            hashed before upload as Meta requires.
          </li>
        </ul>
        <p>
          The app doesn&apos;t access personal messages, friends lists, or the
          profiles of people who see or interact with my ads. Insights from Meta
          are aggregated and don&apos;t identify individuals.
        </p>
      </Section>

      <Section title="How the data is used">
        <p>
          Only to manage and report on my business&apos;s advertising, and to
          keep the app secure and working. It isn&apos;t used to build profiles
          of people, to train AI models, or for anything else. It isn&apos;t
          sold, licensed or rented.
        </p>
      </Section>

      <Section title="Who else processes it">
        <p>
          A few service providers process data on my behalf, under their own
          security and confidentiality commitments:
        </p>
        <ul>
          <li>
            <strong>Meta Platforms</strong>, where the ad data lives and the
            actions take place.
          </li>
          <li>
            <strong>Hosting providers</strong> (such as Railway) that run the
            app and store its tokens and logs.
          </li>
          <li>
            <strong>AI model providers</strong> (such as Anthropic) when an AI
            assistant operates the app. The assistant sees the request and the
            API response needed to complete it. These providers don&apos;t train
            models on API data under their commercial terms.
          </li>
        </ul>
        <p>Beyond that, data is only disclosed if the law requires it.</p>
      </Section>

      <Section title="Storage, security and retention">
        <p>
          Access tokens are stored encrypted and used only on the server. All
          traffic uses HTTPS, and only I have access.
        </p>
        <p>
          Ad data is read from Meta when a task needs it rather than copied into
          a permanent database. Short-lived caches and request logs are deleted
          within 30 days. Tokens are kept while the app is connected and removed
          when it is disconnected.
        </p>
      </Section>

      <Section id="your-rights" title="Your rights">
        <p>
          If you believe the app holds data about you, you can ask to see,
          correct or delete it. Email <Mail /> and I will respond within 30
          days. Depending on where you live (for example under the UAE PDPL or
          GDPR) you can also complain to a data protection authority.
        </p>
      </Section>

      <Section title="Data deletion">
        <p>
          Instructions are on the{" "}
          <Link href="/data-deletion">data deletion page</Link>.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          If this policy changes, I will update the date at the top of the page.
        </p>
      </Section>
    </LegalPage>
  );
}
