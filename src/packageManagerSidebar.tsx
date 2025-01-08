import React from 'react';
import { ReactWidget } from '@jupyterlab/ui-components';
import { myPluginIcon } from './icons/pluginIcon';

class PackageManagerSidebarWidget extends ReactWidget {
  constructor() {
    super();
    this.id = 'my-plugin::empty-sidebar';
    this.title.icon = myPluginIcon;
    this.title.caption = 'My Plugin';
    this.addClass('my-plugin-sidebar-widget');
  }

  render(): JSX.Element {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
      </div>
    );
  }
}

export function createPackageManagerSidebar(): PackageManagerSidebarWidget {
  return new PackageManagerSidebarWidget();
}

