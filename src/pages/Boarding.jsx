import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Typography, Button, Card, Col, Row } from 'antd';
import SearchSpotifyArtist from '@/components/SearchSpotifyArtist';
const { Meta } = Card;

const { Title } = Typography;

// const nextButtonDesign = css`
//   &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
//     border-width: 0;

//     > span {
//       position: relative;
//     }

//     &::before {
//       content: '';
//       background: linear-gradient(135deg, #6253e1, #04befe);
//       position: absolute;
//       inset: 0;
//       opacity: 1;
//       transition: all 0.3s;
//       border-radius: inherit;
//     }

//     &:hover::before {
//       opacity: 0;
//     }
//   }
// `;

const Step1 = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Title>We Are ThePublishers</Title>
        <Title level={2}>We help you find your lost royalties!</Title>
        <Button type="primary" size="large" icon={<AntDesignOutlined />}>
          Lets Go
        </Button>
      </div>
    </>
  );
};
const Step2 = () => {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          width: '100%',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzguqJ-p09YixPXmB7FssNbO42IN18ALzreg&s"
            />
          }
        >
          <Meta title="I'm a Label Owner" />
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/make-music-2586346-2159023.png?f=webp&w=256"
            />
          }
        >
          <Meta title="I'm an Artist" />
        </Card>
      </div>
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <Row>
        <Col span={8}>col-4</Col>
        <Col span={8}>
          <SearchSpotifyArtist
            onChange={(valuee) => {
              console.log(valuee);
            }}
            displayLabels={['name']}
            searchFields={'name'}
          />
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};

const Boarding = () => {
  const [step, setStep] = useState(3);
  // const [step, setStep] = useSelector(0);
  return (
    <>
      {(() => {
        switch (step) {
          case 1:
            return <Step1 />;
          case 2:
            return <Step2 />;
          case 3:
            return <Step3 />;
          case 4:
            return '#0000FF';
          default:
            return <>error</>;
        }
      })()}
    </>
  );
};

export default Boarding;
