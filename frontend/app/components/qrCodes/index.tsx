'use client'
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedQRCode = localStorage.getItem('qrCode');
    if (savedQRCode) {
      setText(savedQRCode);
      setQrCodeUrl(savedQRCode);
    }
  }, []);

  const generateQRCode = () => {
    setQrCodeUrl(text);
    localStorage.setItem('qrCode', text); 

   
    fetch('/api/saveQRCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qrCode: text }),
    });
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite o texto para o QR code"
      />
      <button onClick={generateQRCode}>Gerar/Atualizar QR Code</button>
      {qrCodeUrl && (
        <QRCodeSVG
          value={qrCodeUrl}
          size={2500} // Define o tamanho do QR code
          style={{ width: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default QRCodeGenerator;
