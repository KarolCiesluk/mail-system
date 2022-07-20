import { Navigate, Route, Routes } from 'react-router-dom';
import { AddSubscriberForm } from '../add-subscriber';
import { Campaigns } from '../campaigns';
import { Subscribers } from '../subscribers';
import { UpdateSubscriber } from '../update-subscriber';

export const PrivateRoutes = () => (
  <Routes>
    <Route path="subscribers" element={<Subscribers />} />
    <Route path="subscribers/add" element={<AddSubscriberForm />} />
    <Route path="subscribers/update/:subscriberId" element={<UpdateSubscriber />} />
    <Route path="campaigns" element={<Campaigns />} />
    <Route path="*" element={<Navigate to="subscribers" />} />
  </Routes>
);
