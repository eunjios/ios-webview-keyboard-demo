import { useRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  item: number;
}

export const Item = ({ item, ...props }: Props) => {
  const containerRef = useRef<HTMLLIElement>(null);

  const onFocus = () => {
    const scrollToCenter = () => {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    };

    scrollToCenter();
  };

  return (
    <li ref={containerRef} className="p-2 flex justify-between">
      <span>{item}</span>
      <input
        type="text"
        className="border"
        onFocus={onFocus}
        onBlur={() => console.log('Input blurred:', item)}
        {...props}
      />
    </li>
  );
};
