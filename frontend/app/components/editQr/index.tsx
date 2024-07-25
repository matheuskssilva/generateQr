"use client"
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const SavedQRCodes = () => {
  const [savedCodes, setSavedCodes] = useState<string[]>([]);
  const [editCode, setEditCode] = useState<string | null>(null);
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    const fetchSavedCodes = async () => {
      const response = await fetch('/api/getSavedQRCodes');
      const data = await response.json();
      setSavedCodes(data.qrCodes || []);
    };

    fetchSavedCodes();
  }, []);

  const updateQRCode = async (oldCode: string) => {
    await fetch('/api/saveQRCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qrCode: newLink }),
    });

    // Atualiza o localStorage e a lista de códigos
    localStorage.setItem('qrCode', newLink);
    setSavedCodes(savedCodes.map(code => (code === oldCode ? newLink : code)));
    setEditCode(null);
  };

  return (
    <div>
      {savedCodes.map((code, index) => (
        <div key={index}>
          {editCode === code ? (
            <>
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Edite o link"
              />
              <button onClick={() => updateQRCode(code)}>Salvar Alterações</button>
            </>
          ) : (
            <>
              <QRCodeSVG
                value={code}
                size={2500} // Define o tamanho do QR code
                style={{ width: '100%', height: 'auto' }}
              />
              <button onClick={() => { setEditCode(code); setNewLink(code); }}>Editar</button>
            </>
          )}
        </div>
      ))}
     
    </div>
  );
};

export default SavedQRCodes;
