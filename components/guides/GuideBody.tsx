import { Fragment } from 'react';
import Link from 'next/link';
import { spansToText, toSlug, type InlineSpan, type MarkdownBlock } from '@/lib/markdown';

/**
 * Prose renderer for guides. It is deliberately separate from `PromptBody`:
 * a prompt is a spec read inside a scroll box, a guide is a document read top
 * to bottom, so the two want different heading scales and rhythm.
 */

const HEADING_CLASS: Record<1 | 2 | 3, string> = {
  1: 'mt-14 scroll-mt-24 text-[1.375rem] font-semibold tracking-tight first:mt-0 sm:text-[1.625rem]',
  2: 'mt-10 scroll-mt-24 text-lg font-semibold tracking-tight',
  3: 'mt-8 scroll-mt-24 text-sm font-semibold uppercase tracking-wide text-accent',
};

const CODE_CLASS =
  'rounded-[0.3rem] border border-line bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-fg';

function InlineLink({ href, text }: { href: string; text: string }) {
  const isExternal = /^https?:\/\//.test(href);
  const className =
    'font-medium text-fg underline decoration-line underline-offset-[3px] transition-colors hover:decoration-fg-3';

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}

function Inline({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((span, index) => (
        <Fragment key={index}>
          {span.kind === 'strong' ? (
            <strong className="font-semibold text-fg">{span.text}</strong>
          ) : span.kind === 'code' ? (
            <code className={CODE_CLASS}>{span.text}</code>
          ) : span.kind === 'link' ? (
            <InlineLink href={span.href} text={span.text} />
          ) : (
            span.text
          )}
        </Fragment>
      ))}
    </>
  );
}

function Block({ block }: { block: MarkdownBlock }) {
  if (block.type === 'divider') {
    return <hr className="my-12 border-t border-line" />;
  }

  if (block.type === 'heading') {
    const Tag = (['h2', 'h3', 'h4'] as const)[block.level - 1];
    return (
      <Tag id={toSlug(spansToText(block.spans))} className={HEADING_CLASS[block.level]}>
        <Inline spans={block.spans} />
      </Tag>
    );
  }

  if (block.type === 'code') {
    return (
      <pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-muted px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed text-fg-2">
        {block.text}
      </pre>
    );
  }

  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag
        className={`mt-4 space-y-2 pl-5 text-[1rem] leading-[1.75] text-fg-2 ${
          block.ordered ? 'list-decimal' : 'list-disc'
        } marker:text-fg-3`}
      >
        {block.items.map((item, index) => (
          <li key={index}>
            <Inline spans={item} />
          </li>
        ))}
      </ListTag>
    );
  }

  return (
    <p className="mt-4 text-[1rem] leading-[1.75] text-fg-2">
      <Inline spans={block.spans} />
    </p>
  );
}

export default function GuideBody({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
