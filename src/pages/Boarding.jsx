import '@/style/partials/boarding.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import {
  Typography,
  Button,
  Card,
  Col,
  Row,
  Steps,
  Flex,
  Form,
  Select,
  Input,
  Radio,
  Divider,
  Alert,
  Space,
} from 'antd';
import SearchSpotifyArtist from '@/components/SearchSpotifyArtist';
import { countryList } from '@/utils/countryList';
import { selectAuth, selectCurrentArtist } from '@/redux/auth/selectors';
import { current } from '@reduxjs/toolkit';

const { Meta } = Card;

const { Title } = Typography;

const Boarding = () => {
  const currentArtist = useSelector(selectCurrentArtist);
  const [proForm] = Form.useForm();
  const [spotifyForm] = Form.useForm();
  const [sptifyFormSubmittable, setSptifyFormSubmittable] = useState(false);
  const [proFormSubmittable, setProFormSubmittable] = useState(false);
  const [canEnterIpi, setCanEnterIpi] = useState(false);
  const [proMissingMessage, setProMissingMessage] = useState(false);

  const [step1Data, setStep1Data] = useState({
    spotifyArtistId: null,
  });
  const [step2Data, setStep2Data] = useState({
    country: null,
    hasPro: null,
    ipiNumber: null,
  });
  const [step, setStep] = useState(0);

  const goStep0 = () => {
    setStep(0);
  };
  const goStep1 = () => {
    spotifyForm.setFieldsValue(step1Data);
    setStep(1);
  };
  const goStep2 = () => {
    if (step != 1) {
      setStep(2);
    } else {
      spotifyForm
        .validateFields()
        .then(() => setStep(2))
        .catch(() => {
          //
        });
    }
  };
  const goStep3 = () => {
    setStep(3);
  };

  useEffect(() => {
    if (step == 2) {
      if (proForm.getFieldValue('country') === null) {
        proForm.setFieldValue('country', currentArtist.country);
      }
    }
  }, [step]);

  const handleSpotifyFormChange = (data) => {};
  const handleProFormChange = (data) => {
    if (typeof data.hasPro != 'undefined') {
      setProMissingMessage(data.hasPro === 'no');
      setCanEnterIpi(data.hasPro === 'yes');
    }
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Steps
            id="boarding_steps"
            direction="vertical"
            current={step}
            items={[
              {
                title: 'Welcome',
                description: ' ',
              },
              {
                title: "Let's Meet",
                description: ' ',
              },
              {
                title: "You're a PRO",
                description: ' ',
              },
              {
                title: 'Finish',
                description: ' ',
              },
            ]}
          />
        </Col>
        <Col span={8}>
          {(() => {
            switch (step) {
              case 0:
                return (
                  <>
                    <div style={{ textAlign: 'center' }}>
                      <Title>We Are ThePublishers</Title>
                      <Title level={2}>We help you find your lost royalties!</Title>
                      <Button onClick={goStep1} type="primary" size="large">
                        Lets Go
                      </Button>
                    </div>
                  </>
                );
              case 1:
                return (
                  <>
                    <Form
                      autoComplete="off"
                      key={'form_spotify'}
                      // initialValues={{ ...step1Data }}
                      form={spotifyForm}
                      layout={'vertical'}
                      style={{ width: '100%' }}
                      onValuesChange={handleSpotifyFormChange}
                    >
                      <Form.Item
                        label="Enter your Spotify artist page"
                        name="spotifyArtistId"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <SearchSpotifyArtist displayLabels={['name']} searchFields={'name'} />
                      </Form.Item>
                      <Divider />
                      <Flex gap="small" wrap>
                        <Button onClick={goStep0} type="text" size="large">
                          previous
                        </Button>
                        <Button
                          // disabled={!sptifyFormSubmittable}
                          onClick={goStep2}
                          type="primary"
                          size="large"
                        >
                          Next
                        </Button>
                      </Flex>
                    </Form>
                  </>
                );
              case 2:
                return (
                  <>
                    <Form
                      autoComplete="off"
                      key={'form_pro'}
                      initialValues={{ ...step2Data }}
                      form={proForm}
                      layout={'vertical'}
                      style={{ width: '100%' }}
                      onValuesChange={handleProFormChange}
                    >
                      <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          defaultOpen={false}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                              .toLowerCase()
                              .startsWith((optionB?.label ?? '').toLowerCase())
                          }
                          style={{
                            width: '100%',
                          }}
                        >
                          {countryList.map((language) => (
                            <Select.Option
                              key={language.value}
                              value={language.value}
                              label={language.label}
                            >
                              {language?.icon && language?.icon + ' '}
                              {language.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Did you register in you local PRO?">
                        <Space direction="vertical">
                          <Form.Item
                            name="hasPro"
                            noStyle
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Radio.Group buttonStyle="solid">
                              <Radio.Button value="yes">Yes</Radio.Button>
                              <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                          </Form.Item>
                          {proMissingMessage ? (
                            <Alert
                              description="A local PRO account is required to claim royalties. If you didn't created one, you can do it later."
                              type="info"
                              showIcon
                            />
                          ) : (
                            ''
                          )}
                        </Space>
                      </Form.Item>
                      <Form.Item label="Please enter your IPI number" name="ipiNumber">
                        <Input disabled={!canEnterIpi}></Input>
                      </Form.Item>
                      <Divider />
                      <Flex gap="small" wrap>
                        <Button onClick={goStep1} type="text" size="large">
                          previous
                        </Button>
                        <Button onClick={goStep3} type="primary" size="large">
                          Next
                        </Button>
                      </Flex>
                    </Form>
                  </>
                );
              case 3:
                return '#0000FF';
              default:
                return <>error</>;
            }
          })()}
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};

export default Boarding;
