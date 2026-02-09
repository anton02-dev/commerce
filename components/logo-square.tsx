import clsx from 'clsx';
import Image from 'next/image';
export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center',
        {
          'h-[69px] w-[76px] rounded-xl': !size,
          'h-[59px] w-[66px] rounded-lg': size === 'sm'
        }
      )}
    >
      {/* <LogoIcon
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[10px] w-[10px]': size === 'sm'
        })}
      /> */}
      <Image
        src={'/imgs/logog.png'}
        alt='Logo'
        width={76}
        height={69}
        className={clsx({
          'h-[69px] w-[76px] rounded-xl': !size,
          'h-[59px] w-[66px] rounded-lg': size === 'sm'
        })}      
      />
    </div>
  );
}
