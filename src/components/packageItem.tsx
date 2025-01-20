// src/components/PackageItem.tsx
import React from 'react'
import { useState } from 'react'
import { myDeleteIcon } from '../icons/deletePackageIcon'
import { removePackagePip } from '../pcode/utils'
import { useNotebookPanelContext } from '../contexts/notebookPanelContext'
import { KernelMessage } from '@jupyterlab/services'
import { usePackageContext } from '../contexts/packagesListContext'
import { errorIcon } from '../icons/errorIcon'

interface PackageInfo {
  name: string
  version: string
}

interface PackageItemProps {
  pkg: PackageInfo
}

export const PackageItem: React.FC<PackageItemProps> = ({ pkg }) => {
  const notebookPanel = useNotebookPanelContext();
  const { refreshPackages } = usePackageContext();
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false);
  

  const handleDelete = () => {
     setLoading(true);
    setError(false);

    const code = removePackagePip(pkg.name);
    const future = notebookPanel?.sessionContext.session?.kernel?.requestExecute({
      code,
      store_history: false
    })
    if (!future) {
      setLoading(false);
      setError(true);
      return
    }
    future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
      const msgType = msg.header.msg_type
      if (
        msgType === 'stream' ||
        msgType === 'execute_result' ||
        msgType === 'display_data' ||
        msgType === 'update_display_data'
      ) {
        interface ContentData {
          name: string
          text: string
        }
        const content = msg.content as ContentData
        if (content.text.includes('ERROR')) {
          setError(true);
          setLoading(false)
        } 
        else if (content.text.includes('Successfully uninstalled')) {
          setError(false);
          setError(false);
          refreshPackages()
        }
      } else if (msgType === 'error') {
          setError(true);
          setLoading(false)
      }
    }
  }

  return (
    <li className='package-item'>
      <span className='package-name'> {pkg.name}</span>
      <span className='package-version'>{pkg.version}</span>
      <button
        className='delete-button'
        onClick={handleDelete}
        aria-label={error ? `Error during uninstalling ${pkg.name}` : `Uninstall ${pkg.name}`}
      >
        {loading ? (
          <span className='spinner' />
        ) : error ? (
          <errorIcon.react className='delete-icon error-icon' />
        ) : (
          <myDeleteIcon.react className='delete-icon' />
        )}

      </button>
    </li>
  )
}

