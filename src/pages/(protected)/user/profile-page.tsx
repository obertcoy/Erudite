import { ContentLayout } from '@/components/custom/content-layout';
import ProfileBody from '@/components/custom/profile/profile-body';
import ProfileHeader from '@/components/custom/profile/profile-header';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    'Posts' | 'Comments'
  >('Posts');

  return (
    <>
      <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProfileBody activeTab={activeTab} />
    </>
  );
}
