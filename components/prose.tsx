import clsx from 'clsx';

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        'prose prose-lg mx-auto max-w-none',
        'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-neutral-900',
        'prose-h1:text-4xl prose-h1:mb-4',
        'prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-8',
        'prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-6',
        'prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4',
        'prose-p:text-neutral-700 prose-p:leading-relaxed',
        'prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium',
        'prose-a:transition-colors prose-a:duration-200',
        'hover:prose-a:text-blue-700 hover:prose-a:underline',
        'prose-strong:text-neutral-900 prose-strong:font-semibold',
        'prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2',
        'prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2',
        'prose-li:text-neutral-700 prose-li:leading-relaxed',
        'prose-code:text-neutral-900 prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
        'prose-pre:bg-neutral-900 prose-pre:text-neutral-100',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;