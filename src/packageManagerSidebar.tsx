import React from 'react';
import { ReactWidget } from '@jupyterlab/ui-components';
import { packageManagerIcon } from './icons/packageManagerIcon';
import { NotebookWatcher } from './watchers/notebookWatcher';
import { NotebookPanelContextProvider } from './contexts/notebookPanelContext';
import { NotebookKernelContextProvider } from './contexts/notebookKernelContext';
import { PackageListComponent } from './components/packageListComponent';

class PackageManagerSidebarWidget extends ReactWidget {
  private notebookWatcher: NotebookWatcher;
  constructor(notebookWatcher:NotebookWatcher) {
    super();
    this.notebookWatcher = notebookWatcher;
    this.id = 'package-manager::empty-sidebar';
    this.title.icon = packageManagerIcon;
    this.title.caption = 'Package Manager';
    this.addClass('mljar-packages-manager-sidebar-widget');
  }

  render(): JSX.Element {
    return (
      <div
        className='mljar-packages-manager-sidebar-container'
      >
        <NotebookPanelContextProvider notebookWatcher={this.notebookWatcher}>
          <NotebookKernelContextProvider notebookWatcher={this.notebookWatcher}>
            <PackageListComponent/>
          </NotebookKernelContextProvider>
        </NotebookPanelContextProvider>
      </div>
    );
  }
}

export function createPackageManagerSidebar(notebookWatcher:NotebookWatcher): PackageManagerSidebarWidget {
  return new PackageManagerSidebarWidget(notebookWatcher);
}

