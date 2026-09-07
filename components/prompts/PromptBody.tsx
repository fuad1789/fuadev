import { Fragment } from 'react';
import type { InlineSpan, MarkdownBlock } from '@/lib/markdown';

const HEADING_CLASS: Record<1 | 2 | 3, string> = {
  1: 'mt-10 text-lg font-semibold tracking-tight first:mt-0',
  2: 'mt-8 text-base font-semibold tracking-tight',
  3: 'mt-8 text-sm font-semibold uppercase tracking-wide text-accent',
};

function Inline({ spans }: { spans: InlineSpan[] }) {
  return (
    <>
      {spans.map((span, index) => (
        <Fragment key={index}>
          {span.kind === 'strong' ? (
            <strong className="font-semibold text-fg">{span.text}</strong>
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
    return <hr className="my-8 border-t border-line" />;
  }

  if (block.type === 'heading') {
    const Tag = (['h2', 'h3', 'h4'] as const)[block.level - 1];
    return (
      <Tag className={HEADING_CLASS[block.level]}>
        <Inline spans={block.spans} />
      </Tag>
    );
  }

  if (block.type === 'code') {
    // Prompts are parsed without the rich option, so this is unreachable today —
    // it exists so the block union stays exhaustively handled.
    return (
      <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-muted px-4 py-3 font-mono text-xs leading-relaxed text-fg-2">
        {block.text}
      </pre>
    );
  }

  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag
        className={`mt-3 space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-fg-2 ${
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
    <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">
      <Inline spans={block.spans} />
    </p>
  );
}

/** Renders the parsed prompt as a readable document. */
export default function PromptBody({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
