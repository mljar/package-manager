import React from 'react';
import { ReactWidget } from '@jupyterlab/ui-components';
import { IKernelData } from '@mljar/kernel-data';
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
  private kernelData: IKernelData | null;
  private commands: CommandRegistry;
  private settingRegistry: ISettingRegistry | null = null;
  constructor(
    notebookWatcher: NotebookWatcher,
    kernelData: IKernelData | null,
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
    this.kernelData = kernelData;
    this.settingRegistry = settingRegisty;
  }

  render(): JSX.Element {
    return (
      <div className="mljar-packages-manager-sidebar-container">
        <NotebookPanelContextProvider notebookWatcher={this.notebookWatcher}>
          <NotebookKernelContextProvider notebookWatcher={this.notebookWatcher}>
            <PackageContextProvider
              kernelData={this.kernelData}
              commands={this.commands}
            >
              <PackageListComponent settingRegistry={this.settingRegistry} />
            </PackageContextProvider>
          </NotebookKernelContextProvider>
        </NotebookPanelContextProvider>
      </div>
    );
  }
}

export function createPackageManagerSidebar(
  notebookWatcher: NotebookWatcher,
  kernelData: IKernelData | null,
  commands: CommandRegistry,
  settingRegistry: ISettingRegistry | null
): PackageManagerSidebarWidget {
  return new PackageManagerSidebarWidget(
    notebookWatcher,
    kernelData,
    commands,
    settingRegistry
  );
}
