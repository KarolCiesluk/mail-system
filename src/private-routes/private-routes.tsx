import { Navigate, Route, Routes } from 'react-router-dom';
import { SubscriberAddition } from '../subscriber-addition';
import { Campaigns } from '../campaigns';
import { Subscribers } from '../subscribers';
import { SubscriberUpdate } from '../subscriber-update';

export const PrivateRoutes = () => (
  <Routes>
    <Route path="subscribers" element={<Subscribers />} />
    <Route path="subscribers/add" element={<SubscriberAddition />} />
    <Route path="subscribers/update/:subscriberId" element={<SubscriberUpdate />} />
    <Route path="campaigns" element={<Campaigns />} />
    <Route path="*" element={<Navigate to="subscribers" />} />
  </Routes>
);
