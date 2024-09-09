import { getServerSession } from 'next-auth';
import { ProfileIcon } from './ProfileIcon';

export const TopBar = async () => {
  const userInfo = await getServerSession();
  const { user } = userInfo!;
  return (
    <div className=''>
      <nav className='sticky top-0 flex items-center justify-between p-6'>
        <h4 className='w-fit rounded-full bg-neutral-300 px-6 py-2 text-base sm:text-lg'>
          Greetings,{' '}
          <span className='font-semibold'>{user?.name?.split(' ')[0]}</span>
        </h4>
        <ProfileIcon name={user?.name} email={user?.email} />
      </nav>
    </div>
  );
};
