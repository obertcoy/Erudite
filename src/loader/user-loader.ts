import { ServiceContext } from '@/contexts/service-context';
import useServiceContext from '@/hooks/use-service-context';
import { convertRawUserEntityToUserEntity } from '@/lib/utils';
import { getUserQuery } from '@/services/user-service';
import { useContext } from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

export default async function getUserLoader(
  userId: string,
  strictOpt: boolean = false,
) {
  // strictOpt for optional fetching current user or other user
  // True means it will only get user from userId provided
  // False means it will also get the caller if userId is not provided / invalid

  console.log(useServiceContext);
  const { getUser, getUserLoading } = getUserQuery();

  const result = await getUser([[userId], [strictOpt]]);

  if (!result || 'err' in result) {
    
    return null;
  }

  return convertRawUserEntityToUserEntity(result.ok);
}
