import { useProfileContext } from '@/context/profileContext';
import ArtistInfo from './ArtistInfo';
import UpdateArtist from './UpdateArtist';
import PasswordModal from './PasswordModal';

const Visibility = ({ isOpen, children }) => {
  const show = isOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return <div style={show}>{children}</div>;
};

export default function Profile({ config }) {
  const { state } = useProfileContext();
  const { update, read } = state;

  return (
    <div>
      <Visibility isOpen={read.isOpen}>
        <ArtistInfo config={config} />
      </Visibility>
      <Visibility isOpen={update.isOpen}>
        <UpdateArtist config={config} />
      </Visibility>
      <PasswordModal />
    </div>
  );
}
