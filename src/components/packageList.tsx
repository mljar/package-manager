import React, { useEffect, useState } from 'react';
import { useNotebookPanelContext } from '../contexts/notebookPanelContext';
import { useNotebookKernelContext } from '../contexts/notebookKernelContext';
import { listPackagesCode } from '../pcode/utils';
import { KernelMessage } from '@jupyterlab/services';

interface PackageInfo {
  name: string;
  version: string;
}

export const PackageListComponent: React.FC = () => {
  const notebookPanel = useNotebookPanelContext();
  const kernel = useNotebookKernelContext();
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPackages([]);
    setLoading(false);
    setError(null);

    if (!notebookPanel || !kernel) {
      return;
    }

    const executeCode = async () => {
      setLoading(true);
      setError(null);

      try {
        const future = notebookPanel.sessionContext?.session?.kernel?.requestExecute({
          code: listPackagesCode,
          store_history: false,
        });

        if (future) {
          future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
            const msgType = msg.header.msg_type;

            if (
              msgType === 'execute_result' ||
              msgType === 'display_data' ||
              msgType === 'update_display_data'
            ) {
              const content = msg.content as any;

              const jsonData = content.data['application/json'];
              const textData = content.data['text/plain'];

              if (jsonData) {
                if (Array.isArray(jsonData)) {
                  setPackages(jsonData);
                }
                setLoading(false);
              } else if (textData) {
                try {
                  const cleanedData = textData.replace(/^['"]|['"]$/g, '');

                  const doubleQuotedData = cleanedData.replace(/'/g, '"');


                  const parsedData: PackageInfo[] = JSON.parse(doubleQuotedData);

                  if (Array.isArray(parsedData)) {
                    setPackages(parsedData);
                  } else {
                    throw new Error('Error during parsing.');
                  }
                  setLoading(false);
                } catch (err) {
                  setError('Error during parsing');
                  setLoading(false);
                }
              }
            }
          };

        }
      } catch (err) {
        setError('unexpected erro');
        setLoading(false);
      }
    };

    executeCode();
  }, [notebookPanel, kernel]);

  if (!notebookPanel) {
    return <div style={{ textAlign: 'center' }}>You need to open notebook to se packages</div>;
  }

  if (!kernel) {
    return <div style={{ textAlign: 'center' }}>Kernel is not avaliable.</div>;
  }

  return (
    <div style={{ padding: '10px' }}>
      <h3>Zainstalowane Pakiety</h3>
      {loading && <p>Ładowanie pakietów...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && packages.length === 0 && <p>Packages not found.</p>}
      {!loading && !error && packages.length > 0 && (
        <ul>
          {packages.map((pkg) => (
            <li key={pkg.name}>
              {pkg.name} - {pkg.version}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
