import { Navigate, Route, Routes } from 'react-router-dom';
import { CampaignCreation, Campaigns } from '../campaigns/components';
import { SubscriberAddition, Subscribers, SubscriberUpdate } from '../subscribers/components';

export const PrivateRoutes = () => (
  <Routes>
    <Route path="subscribers" element={<Subscribers />} />
    <Route path="subscribers/add" element={<SubscriberAddition />} />
    <Route path="subscribers/update/:subscriberId" element={<SubscriberUpdate />} />
    <Route path="campaigns" element={<Campaigns />} />
    <Route path="campaigns/create" element={<CampaignCreation />} />
    <Route path="*" element={<Navigate to="subscribers" />} />
  </Routes>
);
