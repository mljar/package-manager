import React from 'react';
import { ReactWidget } from '@jupyterlab/ui-components';
import { IStateDB } from '@jupyterlab/statedb';
import { packageManagerIcon } from './icons/packageManagerIcon';
import { NotebookWatcher } from './watchers/notebookWatcher';
import { NotebookPanelContextProvider } from './contexts/notebookPanelContext';
import { NotebookKernelContextProvider } from './contexts/notebookKernelContext';
import { PackageListComponent } from './components/packageListComponent';

class PackageManagerSidebarWidget extends ReactWidget {
  private notebookWatcher: NotebookWatcher;
  private stateDB: IStateDB;
  constructor(notebookWatcher: NotebookWatcher, stateDB: IStateDB) {
    super();
    this.notebookWatcher = notebookWatcher;
    this.stateDB = stateDB;
    this.id = 'package-manager::empty-sidebar';
    this.title.icon = packageManagerIcon;
    this.title.caption = 'Package Manager';
    this.addClass('mljar-packages-manager-sidebar-widget');
  }

  render(): JSX.Element {
    return (
      <div className="mljar-packages-manager-sidebar-container">
        <NotebookPanelContextProvider notebookWatcher={this.notebookWatcher}>
          <NotebookKernelContextProvider notebookWatcher={this.notebookWatcher}>
            <PackageListComponent stateDB={this.stateDB} />
          </NotebookKernelContextProvider>
        </NotebookPanelContextProvider>
      </div>
    );
  }
}

export function createPackageManagerSidebar(
  notebookWatcher: NotebookWatcher,
  stateDB: IStateDB
): PackageManagerSidebarWidget {
  return new PackageManagerSidebarWidget(notebookWatcher, stateDB);
}
