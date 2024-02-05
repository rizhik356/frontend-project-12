import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatMessagesHeader = ({ currentChannelName, count }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {`${t('services.channelSymbol')} ${currentChannelName.name}`}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.counter.count', { count })}
      </span>
    </div>
  );
};

export default ChatMessagesHeader;
