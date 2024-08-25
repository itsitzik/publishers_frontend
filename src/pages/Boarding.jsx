import '@/style/partials/boarding.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { request } from '@/request';
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
  Result,
} from 'antd';
import SearchSpotifyArtist from '@/components/SearchSpotifyArtist';
import { countryList } from '@/utils/countryList';
import { selectAuth, selectCurrentArtist } from '@/redux/auth/selectors';
import { getUserInfo } from '@/redux/auth/actions';

const { Meta } = Card;

const { Title } = Typography;

const Boarding = () => {
  const dispatch = useDispatch();
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
    // spotifyForm.setFieldsValue(step1Data);
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
  const goStep3 = async () => {
    try {
      let isValid = await proForm.validateFields();
      if (isValid) {
        let res = await request.saveBoardingData({
          spotifyArtistId: spotifyForm.getFieldValue('spotifyArtistId'),
          country: proForm.getFieldValue('country'),
          hasPro: proForm.getFieldValue('hasPro'),
          ipiNumber: proForm.getFieldValue('ipiNumber'),
        });

        if (res.success && res.success === true) {
          dispatch(getUserInfo());
          setStep(3);
        } else {
        }
      }
    } catch {
      return;
    }
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
                status: step == 3 ? 'finish' : 'wait',
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <section style={{ display: step == 0 ? '' : 'none' }}>
            <div style={{ textAlign: 'center' }}>
              <Title>We Are ThePublishers</Title>
              <Title level={2}>We help you find your lost royalties!</Title>
              <Button onClick={goStep1} type="primary" size="large">
                Lets Go
              </Button>
            </div>
          </section>
          <section style={{ display: step == 1 ? '' : 'none' }}>
            <Form
              autoComplete="off"
              key={'form_spotify'}
              initialValues={{ ...step1Data }}
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
                <Button onClick={goStep2} type="primary" size="large">
                  Next
                </Button>
              </Flex>
            </Form>
          </section>
          <section style={{ display: step == 2 ? '' : 'none' }}>
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
                        message: 'This field is required',
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
                      description="A local PRO account and IPI Name Number is required to claim royalties. If you didn't created one already, we will guide you in the process."
                      type="info"
                      showIcon
                    />
                  ) : (
                    ''
                  )}
                </Space>
              </Form.Item>
              <Form.Item
                label="What is your IPI Name Number"
                name="ipiNumber"
                rules={[
                  {
                    validator: (_, value) => {
                      let hasPro = proForm.getFieldValue('hasPro');
                      if (hasPro === 'no' || hasPro === null) {
                        return Promise.resolve();
                      } else {
                        if (!value) {
                          return Promise.reject('Please enter your IPI Name Number');
                        } else {
                          return Promise.resolve();
                        }
                      }
                    },
                  },
                ]}
              >
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
          </section>
          <section style={{ display: step == 3 ? '' : 'none' }}>
            <Result
              status="success"
              title="Finito!"
              subTitle="finish sentence with a medium size description of finish and go to action button"
              extra={[
                <Button type="primary" key="console">
                  Go Console
                </Button>,
              ]}
            />
          </section>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};

export default Boarding;
