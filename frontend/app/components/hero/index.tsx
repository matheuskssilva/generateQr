import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import QRCodeGenerator from '../qrCodes'

export const Hero = () => {
  return (
    <div className='flex items-center justify-center max-w-[800px] w-full gap-4 mt-20'>
        <Input type='text' placeholder='Digite um Titulo (opcional)'/>
        <Input type='text' placeholder='Digite a Url Desejada' />
        <Button>Gerar</Button>
        <QRCodeGenerator />
     </div>
  )
}
