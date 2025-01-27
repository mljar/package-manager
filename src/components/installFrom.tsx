import React, { useState } from 'react'
import { useNotebookPanelContext } from '../contexts/notebookPanelContext'
import { checkIfPackageInstalled, installPackagePip } from '../pcode/utils'
import { KernelMessage } from '@jupyterlab/services'
import { usePackageContext } from '../contexts/packagesListContext'
// import { infoIcon } from '../icons/infoIcon'

const isSuccess = (message: string | null): boolean => {
  return message?.toLowerCase().includes('success') || message?.toLowerCase().includes('already') || false
}

export const InstallForm: React.FC = () => {
  const [packageName, setPackageName] = useState<string>('')
  const [installing, setInstalling] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const notebookPanel = useNotebookPanelContext()
  const { refreshPackages } = usePackageContext()

  const handleCheckAndInstall = () => {
    setInstalling(true)
    setMessage(null)

    const code = checkIfPackageInstalled(packageName)
    const future = notebookPanel?.sessionContext.session?.kernel?.requestExecute({
      code,
      store_history: false
    })

    if (!future) {
      setInstalling(false)
      setMessage('No kernel available.')
      return
    }
    future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
      const msgType = msg.header.msg_type
      if (msgType === 'stream' || msgType === 'execute_result' || msgType === 'display_data' || msgType === 'update_display_data') {
        interface ContentData {
          name: string
          text: string
        }
        const content = msg.content as ContentData

        if (content.text.includes('NOT_INSTALLED')) {
          proceedWithInstall()
        }
        else if (content.text.includes('INSTALLED')) {
          setInstalling(false)
          setMessage('Package is already installed.')
        }
      } else if (msgType === 'error') {
        setInstalling(false)
        setMessage('An error occurred while checking installation. Check the correctness of the package name.')
      }
    }
  }

  const proceedWithInstall = () => {
    const code = installPackagePip(packageName)
    const future = notebookPanel?.sessionContext.session?.kernel?.requestExecute({
      code,
      store_history: false
    })
    if (!future) {
      setMessage('No kernel available.')
      setInstalling(false)
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
          setMessage('Error installing the package.')
          setInstalling(false)
        } else if (content.text.includes('Successfully installed')) {
          setMessage('Package installed successfully.')
          setInstalling(false)
          refreshPackages()
        }
      } else if (msgType === 'error') {
        setMessage('An error occurred during installation. Check the correctness of the package name.')
        setInstalling(false)
      }
    }
  }

  return (
    <div className="mljar-install-form">
      <div className="mljar-install-form-header">
        <h4>Install New Package</h4>
         { /* <div className="mljar-info-icon-container">
            <span dangerouslySetInnerHTML={{ __html: infoIcon.svgstr }} />
            <span className="mljar-tooltip">
              Usage:
              Enter package name like:
              pandas
              or package name with version:
              pandas==2.2.2
          </span>
        </div> */} 
      </div>
      <span className='mljar-usage-span'>Usage: Enter package_name or package_name==version.</span>
      <input
        type="text"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        placeholder="Enter package name..."
        className="mljar-install-input"
      />
      <div className="mljar-install-form-buttons">
        <button
          className="mljar-install-submit-button"
          onClick={handleCheckAndInstall}
          disabled={installing || packageName.trim() === ''}
        >
          {installing ? 'Processing...' : 'Install'}
        </button>
      </div>
      {message && (
        <p className={`mljar-install-message ${isSuccess(message) ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

