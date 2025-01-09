import React from 'react';
import { ReactWidget } from '@jupyterlab/ui-components';
import { myPluginIcon } from './icons/pluginIcon';
import { HelloWorldComponent } from './components/testComponenet';
import { NotebookWatcher } from './watchers/notebookWatcher';
import { NotebookNameComponent } from './components/notebookNameComponent';
import { NotebookPanelContextProvider } from './contexts/notebookPanelContext';
import { NotebookKernelContextProvider } from './contexts/notebookKernelContext';

class PackageManagerSidebarWidget extends ReactWidget {
  private notebookWatcher: NotebookWatcher;
  constructor(notebookWatcher:NotebookWatcher) {
    super();
    this.notebookWatcher = notebookWatcher;
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
        <NotebookPanelContextProvider notebookWatcher={this.notebookWatcher}>
          <NotebookKernelContextProvider notebookWatcher={this.notebookWatcher}>
          <NotebookNameComponent />
          <HelloWorldComponent/>
          </NotebookKernelContextProvider>
        </NotebookPanelContextProvider>
      </div>
    );
  }
}

export function createPackageManagerSidebar(notebookWatcher:NotebookWatcher): PackageManagerSidebarWidget {
  return new PackageManagerSidebarWidget(notebookWatcher);
}

