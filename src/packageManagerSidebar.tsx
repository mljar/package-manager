import React from 'react';
import { ReactWidget } from '@jupyterlab/ui-components';
import { IStateDB } from '@jupyterlab/statedb';
import { CommandRegistry } from '@lumino/commands';
import { packageManagerIcon } from './icons/packageManagerIcon';
import { NotebookWatcher } from './watchers/notebookWatcher';
import { NotebookPanelContextProvider } from './contexts/notebookPanelContext';
import { NotebookKernelContextProvider } from './contexts/notebookKernelContext';
import { PackageListComponent } from './components/packageListComponent';
import { PackageContextProvider } from './contexts/packagesListContext';

class PackageManagerSidebarWidget extends ReactWidget {
  private notebookWatcher: NotebookWatcher;
  private stateDB: IStateDB;
  private commands: CommandRegistry;
  constructor(
    notebookWatcher: NotebookWatcher,
    stateDB: IStateDB,
    commands: CommandRegistry
  ) {
    super();
    this.notebookWatcher = notebookWatcher;
    this.stateDB = stateDB;
    this.commands = commands;
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
            <PackageContextProvider
              stateDB={this.stateDB}
              commands={this.commands}
            >
              <PackageListComponent />
            </PackageContextProvider>
          </NotebookKernelContextProvider>
        </NotebookPanelContextProvider>
      </div>
    );
  }
}

export function createPackageManagerSidebar(
  notebookWatcher: NotebookWatcher,
  stateDB: IStateDB,
  commands: CommandRegistry
): PackageManagerSidebarWidget {
  return new PackageManagerSidebarWidget(notebookWatcher, stateDB, commands);
}
