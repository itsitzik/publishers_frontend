import { useState, useEffect, useRef } from 'react';

import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import useDebounce from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

import { Select, Empty, Space } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function searchSpotifyArtist({
  displayLabels,
  outputValue = 'id',
  value, /// this is for update
  onChange, /// this is for update
}) {
  const translate = useLanguage();

  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);

  const isUpdating = useRef(true);
  const isSearching = useRef(false);

  const [searching, setSearching] = useState(false);

  const [valToSearch, setValToSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const navigate = useNavigate();

  const handleSelectChange = (newValue) => {
    isUpdating.current = false;
    if (onChange) {
      if (newValue) onChange(newValue[outputValue] || newValue);
    }
  };

  const handleOnSelect = (value) => {
    setCurrentValue(value[outputValue] || value); // set nested value or value
  };

  const [, cancel] = useDebounce(
    () => {
      //  setState("Typing stopped");
      setDebouncedValue(valToSearch);
    },
    500,
    [valToSearch]
  );

  const asyncSearch = async (options) => {
    return await request.searchSpotifyArtist({ options });
  };

  let { onFetch, result, isSuccess, isLoading } = useOnFetch();

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ');
  };

  useEffect(() => {
    const options = {
      q: debouncedValue,
    };
    if (options.q) {
      const callback = asyncSearch(options);
      onFetch(callback);
    }

    return () => {
      cancel();
    };
  }, [debouncedValue]);

  const onSearch = (searchText) => {
    isSearching.current = true;
    setSearching(true);
    // setOptions([]);
    // setCurrentValue(undefined);
    setValToSearch(searchText);
  };

  useEffect(() => {
    if (isSuccess) {
      setOptions(
        result.map((artist) => {
          return {
            label: artist.name,
            value: artist.id,
            image: artist.image,
          };
        })
      );
    } else {
      setSearching(false);
      // setCurrentValue(undefined);
      // setOptions([]);
    }
  }, [isSuccess, result]);
  useEffect(() => {
    // this for update Form , it's for setField
    if (value && isUpdating.current) {
      setOptions([value]);
      setCurrentValue(value[outputValue] || value); // set nested value or value
      onChange(value[outputValue] || value);
      isUpdating.current = false;
    }
  }, [value]);

  return (
    <Select
      loading={isLoading}
      showSearch
      allowClear
      placeholder={translate('Search')}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={searching ? '... Searching' : <Empty />}
      value={currentValue}
      onSearch={onSearch}
      onClear={() => {
        // setOptions([]);
        // setCurrentValue(undefined);
        setSearching(false);
      }}
      onChange={handleSelectChange}
      style={{ minWidth: '220px' }}
      // onSelect={handleOnSelect}
      options={selectOptions}
      optionRender={(option) => {
        return (
          <div style={{ display: 'flex', gap: '5px', width: '100%', minHeight: '42px' }}>
            <span
              style={{
                width: '42px',
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              role="img"
              aria-label={option.data.label}
            >
              <img style={{ width: '100%' }} src={option.data.image} />
            </span>
            <span
              style={{
                display: 'inline-flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {option.data.label}
            </span>
          </div>
        );
      }}
    ></Select>
  );
}
