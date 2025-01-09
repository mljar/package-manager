// src/components/NotebookNameComponent.tsx
import React from 'react';
import { useNotebookPanelContext } from '../contexts/notebookPanelContext';
import { useNotebookKernelContext } from '../contexts/notebookKernelContext';

export const NotebookNameComponent: React.FC = () => {
  const notebookPanel = useNotebookPanelContext();
  const kernelInfo = useNotebookKernelContext();


  return (
    <div style={{ marginTop: '10px', textAlign: 'center' }}>
      {notebookPanel ? (
        <h2>Aktualny Notatnikk: {notebookPanel.title.label}</h2> 
      ) : (
        <h2>Brak otwartego notatnika</h2>
      )}
      { notebookPanel?.sessionContext.kernelDisplayName  ?(
        <h2>Aktualny kernell {kernelInfo?.id}</h2>
      ) : (
      <h2>Brak kernela</h2>
      )}
    </div>
  );
};

