import { Navigate, Route, Routes } from 'react-router-dom';
import { AddSubscriberForm } from '../add-subscriber';
import { Campaigns } from '../campaigns';
import { Subscribers } from '../subscribers';
import { UpdateSubscriberForm } from '../update-subscriber-form';

export const PrivateRoutes = () => (
  <Routes>
    <Route path="subscribers" element={<Subscribers />} />
    <Route path="subscribers/add" element={<AddSubscriberForm />} />
    <Route path="subscribers/update/:subscriberId" element={<UpdateSubscriberForm />} />
    <Route path="campaigns" element={<Campaigns />} />
    <Route path="*" element={<Navigate to="subscribers" />} />
  </Routes>
);
