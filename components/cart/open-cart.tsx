import clsx from 'clsx';
import { ShoppingCart } from 'lucide-react';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex items-center justify-center text-black transition-colors cursor-pointer">
      <ShoppingCart
        className={clsx('h-10 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-2 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-amber-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
