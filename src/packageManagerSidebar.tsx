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
import { t } from './translator';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

class PackageManagerSidebarWidget extends ReactWidget {
  private notebookWatcher: NotebookWatcher;
  private stateDB: IStateDB;
  private commands: CommandRegistry;
  private settingRegistry: ISettingRegistry | null = null;
  constructor(
    notebookWatcher: NotebookWatcher,
    stateDB: IStateDB,
    commands: CommandRegistry,
    settingRegisty: ISettingRegistry | null
  ) {
    super();
    this.notebookWatcher = notebookWatcher;
    this.commands = commands;
    this.id = 'package-manager::empty-sidebar';
    this.title.icon = packageManagerIcon;
    this.title.caption = t('Package Manager');
    this.addClass('mljar-packages-manager-sidebar-widget');
    this.stateDB = stateDB;
    this.settingRegistry = settingRegisty;
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
              <PackageListComponent settingRegistry={this.settingRegistry}/>
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
  commands: CommandRegistry,
  settingRegistry: ISettingRegistry | null
): PackageManagerSidebarWidget {
  return new PackageManagerSidebarWidget(
    notebookWatcher,
    stateDB,
    commands,
    settingRegistry
  );
}
