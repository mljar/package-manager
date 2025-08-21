// src/components/PackageList.tsx
import React, { useEffect, useRef } from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { PackageItem } from './packageItem';
import { t } from '../translator';

export const PackageList: React.FC = () => {
  const { packages, searchTerm } = usePackageContext();

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const containerEl = listEl.closest<HTMLElement>('.mljar-packages-manager-list-container') || null;
    if (!containerEl) return;

    console.log('lolek: ', containerEl)

    // function to check if there is overflow
    const checkOverflow = () => {
          const hasOverflowY = listEl.scrollHeight > listEl.clientHeight;

      console.log('overflow', hasOverflowY)

      if (hasOverflowY) {
        listEl.classList.add('package-manager-has-overflow');
        containerEl.classList.add('package-manager-has-overflow');
      } else {
        listEl.classList.remove('package-manager-has-overflow');
        containerEl.classList.remove('package-manager-has-overflow');
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // hover handle
    const handleMouseEnter = () => {
      const elements = document.querySelectorAll<HTMLElement>('.package-manager-has-overflow');
      elements.forEach(el => {
        el.style.paddingRight = '5px';
      });
    };

    const handleMouseLeave = () => {
      const elements = document.querySelectorAll<HTMLElement>('.package-manager-has-overflow');
      elements.forEach(el => {
        el.style.paddingRight = '';
      });
    };

    listEl.addEventListener('mouseenter', handleMouseEnter);
    listEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkOverflow);
      listEl.removeEventListener('mouseenter', handleMouseEnter);
      listEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [filteredPackages]);

  if (filteredPackages.length === 0) {
    return <p>{t('Sorry, no packages found or notebook is closed.')}</p>;
  }

  return (
    <ul className="mljar-packages-manager-list" ref={listRef}>
      <li className="mljar-packages-manager-list-header">
        <span className="mljar-packages-manager-header-name">{t('Name')}</span>
        <span className="mljar-packages-manager-header-version">
          {t('Version')}
        </span>
        <span className="mljar-packages-manager-header-blank">&nbsp;</span>
      </li>
      {filteredPackages
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(pkg => (
          <PackageItem key={pkg.name} pkg={pkg} />
        ))}
    </ul>
  );
};
