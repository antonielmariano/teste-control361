import type { FC } from 'react';

interface HeaderProps {
  name: string;
}

export const Header: FC<HeaderProps> = ({ name }) => (
  <header className="text-white text-lg mb-6">
    {name}
  </header>
); 