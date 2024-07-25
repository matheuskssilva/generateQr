'use client'
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = () => {
 

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
