'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { ShoppingCart } from 'lucide-react';
import { useActionState } from 'react';
import { useCart } from './cart-context';
function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-lg font-semibold bg-red-600 p-2 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed ';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Indisponibil
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
        <button
          aria-label="Please select an option"
          disabled
          className={clsx(buttonClasses, disabledClasses)}
        >
          Selecteaza o optiune
        </button>
    );
  }

  return (
  <button className="bg-amber-500 flex justify-center items-center gap-2 text-center cursor-pointer font-semibold text-white py-2 w-full rounded hover:bg-amber-600 transition-colors duration-200">
                    Adauga in cos <ShoppingCart size={20} />
                  </button>
  );
}

export function AddToCartDetails({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
