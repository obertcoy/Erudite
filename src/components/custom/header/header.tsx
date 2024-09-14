import EruditeIcon from '../../../assets/erudite-icon.png';
import HeaderIcon from './header-icon';
import { MessageCircleMore } from 'lucide-react';

export default function Header() {
  return (
    <div className="absolute w-full h-fit py-2 px-6 items-center shadow-sm">
      <div className='flex '>
        <div className="flex flex-row w-fit h-full items-center space-x-2">
          <img src={EruditeIcon} alt="" className="w-full h-10" />
          <h3>Erudite</h3>
        </div>

        <div>

        </div>

        <div className='flex flex-row w-fit h-full ml-auto'>
            <HeaderIcon icon={<MessageCircleMore />} tooltip="Chat with others"/>
        </div>
      </div>
    </div>
  );
}
