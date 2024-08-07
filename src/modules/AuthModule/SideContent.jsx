import { Space, Layout, Divider, Typography } from 'antd';
import logo from '@/style/images/seven-harmonies-logo.png';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SideContent({ isForRegister }) {
  const translate = useLanguage();
  const langDirection = useSelector(selectLangDirection);

  console.log(isForRegister);

  return (
    <Content
      style={{
        // padding: '40px 30px 30px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%' }}>
        <img
          src={logo}
          alt="IDURAR ERP CRM"
          style={{ margin: '0 auto 40px', display: 'block' }}
          width={220}
        />
        {isForRegister ? (
          <Title level={3}>{translate('We will find your lost royalties!')}</Title>
        ) : null}
      </div>
    </Content>
  );
}
