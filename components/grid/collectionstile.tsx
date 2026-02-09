import clsx from 'clsx';
import Image from 'next/image';

export function CollectionTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-3 @container/label">
          <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md">
            <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
              {label.title}
            </h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}
