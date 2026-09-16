"use client";

import { motion } from "framer-motion";
import {
  Quote,
  Mic,
  HelpCircle,
  ShieldCheck,
  Award,
  BadgeCheck,
} from "lucide-react";
import { getServiceContent } from "@/lib/service-content";
import { EAT_SIGNALS, type NavView } from "@/lib/site-data";
import { Reveal } from "@/components/site/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  slug: string;
  serviceName: string;
  categoryLabel: string;
  onNavigate: (v: NavView) => void;
};

/**
 * "What is {service}?" featured-snippet definition block.
 * Targets the answer box Google surfaces for definitional queries.
 */
export function SnippetDefinition({ slug, serviceName }: { slug: string; serviceName: string }) {
  const content = getServiceContent(slug);
  if (!content?.definition) return null;
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/8 via-card/40 to-pink-500/5 p-6 sm:p-8">
        <Quote className="absolute right-5 top-5 h-10 w-10 text-blue-500/15" />
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
            <BadgeCheck className="h-5 w-5" />
          </span>
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            What is {serviceName}?
          </h2>
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
          {content.definition}
        </p>
      </div>
    </Reveal>
  );
}

/**
 * "People Also Ask" accordion — voice-search optimised Q&A.
 * Each answer is self-contained and snippet-friendly (25-45 words).
 */
export function PeopleAlsoAsk({ slug }: { slug: string }) {
  const content = getServiceContent(slug);
  const items = content?.peopleAlsoAsk ?? [];
  if (items.length === 0) return null;
  return (
    <Reveal>
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/20">
            <HelpCircle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">People also ask</h2>
            <p className="text-xs text-muted-foreground">
              Common questions — answered the way you&apos;d ask them out loud.
            </p>
          </div>
        </div>
        <Accordion type="single" collapsible className="mt-5 space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`paa-${i}`}
              className="overflow-hidden rounded-2xl border border-border/50 bg-card/40 px-5"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Reveal>
  );
}

/**
 * Voice-search queries block — surfaces the conversational phrases people
 * speak to assistants, signalling topical depth to crawlers and giving
 * visitors confidence the page answers their spoken questions.
 */
export function VoiceSearchBlock({ slug }: { slug: string }) {
  const content = getServiceContent(slug);
  const queries = content?.voiceSearchQueries ?? [];
  if (queries.length === 0) return null;
  return (
    <Reveal>
      <div className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
            <Mic className="h-5 w-5" />
          </span>
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            Ask your voice assistant
          </h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          These are the spoken questions this page answers for Siri, Google Assistant and Alexa:
        </p>
        <ul className="mt-4 space-y-2">
          {queries.map((q) => (
            <li
              key={q}
              className="flex items-start gap-2.5 rounded-xl bg-background/40 px-4 py-2.5 text-sm text-foreground/90"
            >
              <Mic className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
              <span className="italic">&ldquo;{q}&rdquo;</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/**
 * E-A-T trust strip — surfaces quantifiable Expertise, Authoritativeness
 * and Trustworthiness signals aligned with Google's quality-rater guidelines.
 */
export function EatTrustStrip({
  serviceSignals,
}: {
  serviceSignals?: { label: string; value: string }[];
}) {
  const global = EAT_SIGNALS.slice(0, 4);
  const local = serviceSignals?.slice(0, 4) ?? [];
  const combined = [...local, ...global].slice(0, 8);
  return (
    <Reveal>
      <div className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Why trust ClickTake with this
            </h2>
            <p className="text-xs text-muted-foreground">
              Expertise · Authoritativeness · Trustworthiness
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {combined.map((s, i) => (
            <motion.div
              key={s.label + i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-border/50 bg-background/40 p-4 text-center"
            >
              <Award className="mx-auto h-5 w-5 text-blue-400" />
              <div className="mt-2 text-sm font-bold text-gradient-brand">{s.value}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
