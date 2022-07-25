import { useMutation } from '@tanstack/react-query';
import { sendCampaign } from '../api/send-campaign';

export const useSendCampaign = ({
  onError,
  onSuccess
}: {
  onError: () => void;
  onSuccess: () => void;
}) => {
  return useMutation(sendCampaign, {
    onError,
    onSuccess
  });
};
